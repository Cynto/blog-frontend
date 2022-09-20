require('jest-fetch-mock').enableMocks();
import { loadEnvConfig } from '@next/env';

export default async () => {
  loadEnvConfig(process.cwd());
};
