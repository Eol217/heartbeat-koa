import * as mongoose from 'mongoose';
import { config } from '../config';


const MongoDB = {
  init (): void {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }

    mongoose.connect(config.mongoUrl, options)
  },
};


export default MongoDB;
