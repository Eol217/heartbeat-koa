import { CronJob } from 'cron';
import { config } from './config';
import { instancesService } from './instances/instances.service';

const cron = new CronJob(config.instanceExpirationCheckIntervalCron, async () => {
    await instancesService.removeExpiredInstances(config.instanceExpirationTimeMs)
});

export { cron };
