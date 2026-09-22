import { defineAuth } from '@aws-amplify/backend';

/**
 * Staff sign in with email (operations dashboard / CRM access).
 * Website visitors never sign in — they use the identity pool's guest role,
 * which is enabled in amplify/backend.ts.
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: { mutable: true, required: false },
  },
});
