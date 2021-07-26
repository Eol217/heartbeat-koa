import app from './app'
import { config } from './config';
import MongoDB from './database';


MongoDB.init();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

