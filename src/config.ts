import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });


export interface Config {
  port: number;
  mongoUrl: string;
  instanceExpirationTimeSec: number;
}


const config: Config = {
  port: Number(process.env.PORT || 3000),
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
  instanceExpirationTimeSec: Number(process.env.INSTANCE_EXPIRATION_TIME_SEC || 60),
};

export { config };
