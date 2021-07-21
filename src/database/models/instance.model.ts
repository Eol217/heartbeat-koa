import { Schema, model, Document } from 'mongoose'


export interface Instance extends Document {
  id: string;
  group: string;
  createdAt: number;
  updatedAt: number;
  meta: unknown;
}


const instanceSchema = new Schema({
  id: { type: String, required: true },
  group: { type: String, required: true },
  createdAt: { type: Number, required: true },
  updatedAt: { type: Number, required: true },
  meta: Object,
})


export default model<Instance>('Instance', instanceSchema)
