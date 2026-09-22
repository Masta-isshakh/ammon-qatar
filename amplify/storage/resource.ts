import { defineStorage } from '@aws-amplify/backend';

/**
 * Private storage for case files. Nothing is writable or readable by the
 * public; the website does not upload documents at the enquiry stage.
 * If client uploads are introduced later they must go through an
 * authenticated flow with file-type and size validation.
 */
export const storage = defineStorage({
  name: 'ammonQatarCaseFiles',
  access: (allow) => ({
    'case-documents/*': [allow.authenticated.to(['read', 'write', 'delete'])],
    'exports/*': [allow.authenticated.to(['read', 'write', 'delete'])],
  }),
});
