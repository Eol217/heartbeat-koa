import { Schema, model, Document } from 'mongoose'


export interface Instance extends Document {
  id: string;
  group: string;
  createdAt: number;
  updatedAt: number;
  meta: unknown;
}


const instanceSchema = new Schema(
  {
    id: { type: String, required: true },
    group: { type: String, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number },
    meta: Object,
  },
  {
    timestamps: { currentTime: Date.now }
  }
)
  .index({ group: 1, id: 1 }, { unique: true })

export default model<Instance>('Instance', instanceSchema)
