import { config } from 'dotenv';
import IConfig from './IConfig';

config();
const envVars: NodeJS.ProcessEnv = process.env;

const configuration: IConfig = Object.freeze({
    PORT: envVars.PORT || '9000',
    MONGO_URL: envVars.MONGO_URL || '',
    CLOUD_NAME: envVars.CLOUD_NAME || '',
    API_KEY: envVars.API_KEY || '',
    API_SECRET: envVars.API_SECRET || '',
});

export default configuration;
