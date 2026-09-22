import { defineBackend } from '@aws-amplify/backend';
import { Stack } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { EventSourceMapping, StartingPosition } from 'aws-cdk-lib/aws-lambda';
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
// ---------------------------------------------------------------------------
const leadTable = backend.data.resources.tables['Lead'];
const notifyFn = backend.notifyLead.resources.lambda;

notifyFn.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['dynamodb:DescribeStream', 'dynamodb:GetRecords', 'dynamodb:GetShardIterator', 'dynamodb:ListStreams'],
    resources: [`${leadTable.tableArn}/stream/*`],
  }),
);

notifyFn.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['ses:SendEmail', 'ses:SendRawEmail'],
    resources: ['*'],
  }),
);

new EventSourceMapping(Stack.of(leadTable), 'NotifyLeadStream', {
  target: notifyFn,
  eventSourceArn: leadTable.tableStreamArn,
  startingPosition: StartingPosition.LATEST,
  batchSize: 10,
  retryAttempts: 3,
  reportBatchItemFailures: true,
});

backend.addOutput({
  custom: {
    leadTableName: leadTable.tableName,
    notifyLeadFunctionName: notifyFn.functionName,
  },
});
