import { Schema, model } from 'mongoose'


export interface Instance {
  id: string;
  group: string;
  createdAt: number;
  updatedAt: number;
  meta: unknown;
}


const instanceSchema = new Schema({
  id: String,
  group: String,
  createdAt: Number,
  updatedAt: Number,
  meta: Object,
})


export default model<Instance>('Instance', instanceSchema)
