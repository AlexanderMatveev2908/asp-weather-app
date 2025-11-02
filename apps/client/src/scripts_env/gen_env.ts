import fs from 'fs';
import dotenv from 'dotenv';
import { exit } from 'process';
dotenv.config();

const mode = process.argv[2];

if (!mode) {
  console.error('❌ MODE not provided (use: dev | test | prod)');
  exit(1);
}

if (!['dev', 'test', 'prod'].includes(mode)) {
  console.error("❌ Invalid MODE provided • choices => ['dev', 'test', 'prod']");
  exit(1);
}

const envSuffix: string = mode === 'prod' ? '' : `_${mode.toUpperCase()}`;
const fullName: string = mode === 'prod' ? 'production' : mode === 'dev' ? 'development' : 'test';

const content = `
export type EnvModeT = 'development' | 'production' | 'test';

export interface EnvVarsT {
  expectedMode:EnvModeT;
  mode: EnvModeT;
  backURL: string;
  frontURL: string;
}

export const envVars: EnvVarsT = {
  expectedMode: '${fullName}',
  mode: '${process.env['ENV_MODE']}',
  backURL: '${process.env[`BACK_URL${envSuffix}`]}',
  frontURL: '${process.env[`FRONT_URL${envSuffix}`]}'
};

for (const pair of Object.entries(envVars)) {
  if (!pair[1].trim()) {
    console.log(\`❌ ENV key \${pair[0]} missing or empty\`);
  }
}

if (envVars.mode !== envVars.expectedMode)
  console.log(\`❌ expected ENV mode '\${envVars.expectedMode}' => received '\${envVars.mode}'\`);

export class EnvMng {
  public static isDev(): boolean {
    return envVars.mode === 'development';
  }
  public static isTest(): boolean {
    return envVars.mode === 'test';
  }
  public static isProd(): boolean {
    return envVars.mode === 'production';
  }
}

`;

const filePath: string = 'src/environments/environment.ts';

fs.mkdirSync('src/environments', { recursive: true });
fs.writeFileSync(filePath, content);

console.log(`🟦 Generated ${fullName.toUpperCase()} envVars file 🔐`);
