import { CronJob } from 'cron';
import { config } from './config';
import { InstancesService } from './instances/instances.service';

const cron = new CronJob(config.instanceExpirationCheckIntervalCron, async () => {
    await InstancesService.removeExpiredInstances(config.instanceExpirationTimeMs)
});

export { cron };
