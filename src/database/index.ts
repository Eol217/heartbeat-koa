import * as mongoose from 'mongoose';
import { config } from '../config';




const MongoDB = {
  init() {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    return mongoose.connect(config.mongoUrl, options)
  },
};


export default MongoDB;
