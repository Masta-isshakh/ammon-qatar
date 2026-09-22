// Creates a stub amplify_outputs.json when no backend has been deployed yet
// (fresh clone, CI without sandbox). In Amplify Hosting, `ampx pipeline-deploy`
// writes the real file before `next build`, so this is a no-op there.
import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const target = resolve(process.cwd(), 'amplify_outputs.json');

if (!existsSync(target)) {
  writeFileSync(target, JSON.stringify({ version: '1' }, null, 2) + '\n');
  console.log(
    '[ammon] amplify_outputs.json not found — wrote stub. Run `npx ampx sandbox` to connect a live backend.',
  );
}
