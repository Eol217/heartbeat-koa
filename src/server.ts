import app from './app'
import { config } from './config';
import { cron } from './cron';
import MongoDB from './database';

MongoDB.init();
cron.start();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

