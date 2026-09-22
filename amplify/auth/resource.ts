import { defineAuth } from '@aws-amplify/backend';

/**
 * Staff sign in with email (operations dashboard / CRM access).
 * Website visitors never sign in — the site talks to the Data API from the
 * server, and guest access is disabled in amplify/backend.ts.
 *
 * Do not add `userAttributes` here: the user pool already exists, and Cognito
 * rejects attribute changes on an existing pool ("User pool attributes cannot
 * be changed after a user pool has been created"). Adding attributes requires
 * removing defineAuth, deploying, then adding it back — which deletes all users.
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
