import { Schema, model, Document } from 'mongoose'
import { config } from '../../config';


export interface Instance extends Document {
  id: string;
  group: string;
  createdAt: number;
  updatedAt: number;
  lastHeartBeat: Date;
  meta: unknown;
}


const instanceSchema = new Schema(
  {
    id: { type: String, required: true },
    group: { type: String, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number },
    lastHeartBeat: { type: Date, default: Date.now },
    meta: Object,
  },
  {
    timestamps: { currentTime: Date.now }
  }
)
  .index({ group: 1, id: 1 }, { unique: true })
  .index({ lastHeartBeat: 1 }, { expireAfterSeconds: config.instanceExpirationTimeSec })

export default model<Instance>('Instance', instanceSchema)
