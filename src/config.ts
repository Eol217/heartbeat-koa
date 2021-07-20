import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export interface Config {
    port: number;
    instanceExpirationTimeMs: number;
    instanceExpirationCheckIntervalCron: string;
}

const config: Config = {
    port: Number(process.env.PORT || 3000),
    instanceExpirationTimeMs: Number(process.env.INSTANCE_EXPIRATION_TIME_MS || 60000),
    instanceExpirationCheckIntervalCron: process.env.INSTANCE_EXPIRATION_CHECK_INTERVAL_CRON || "30 * * * * *"
};

export { config };
