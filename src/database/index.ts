import * as mongoose from 'mongoose';
import { config } from "../config";




const MongoDB = {
  init() {
    return mongoose.connect(config.mongoUrl)
  },
};


export default MongoDB;
