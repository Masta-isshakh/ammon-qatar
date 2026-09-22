import { defineBackend } from '@aws-amplify/backend';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { StartingPosition } from 'aws-cdk-lib/aws-lambda';
import { DynamoEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { notifyLead } from './functions/notify-lead/resource';

const backend = defineBackend({
  auth,
  data,
  storage,
  notifyLead,
});

// No guest (unauthenticated) identity-pool access: the website talks to the
// API only from the server, and staff sign in through the user pool.
backend.auth.resources.cfnResources.cfnIdentityPool.allowUnauthenticatedIdentities = false;

// ---------------------------------------------------------------------------
// New lead → DynamoDB stream → notify-lead Lambda → SES email to operations
//
// The mapping MUST be attached to the function (its own scope), not created
// with `Stack.of(leadTable)`. The Lead table lives in its own nested stack;
// placing the mapping there makes that stack depend on the Lambda, while the
// Lambda's IAM policy already depends on the table's outputs — CloudFormation
// then fails with "Circular dependency between resources: [...ServiceRole
// DefaultPolicy, ...lambda, amplifyDataLeadNestedStack...]".
// `addEventSource` keeps every reference pointing one way (function → table).
// ---------------------------------------------------------------------------
const leadTable = backend.data.resources.tables['Lead'];
const notifyFn = backend.notifyLead.resources.lambda;

notifyFn.addEventSource(
  new DynamoEventSource(leadTable, {
    startingPosition: StartingPosition.LATEST,
    batchSize: 10,
    retryAttempts: 3,
    reportBatchItemFailures: true,
  }),
);

notifyFn.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['ses:SendEmail', 'ses:SendRawEmail'],
    resources: ['*'],
  }),
);

backend.addOutput({
  custom: {
    leadTableName: leadTable.tableName,
    notifyLeadFunctionName: notifyFn.functionName,
  },
});
