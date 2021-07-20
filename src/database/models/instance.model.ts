import { Schema, Document, model } from 'mongoose'


export interface Instance {
  id: string;
  group: string;
  createdAt: number;
  updatedAt: number;
  meta: object;
}


// export interface InstanceModel extends Instance, Document {}
export interface InstanceModel extends Instance {}


const instanceSchema = new Schema({
  id: String,
  group: String,
  createdAt: Number,
  updatedAt: Number,
  meta: Object,
})


export default model<InstanceModel>('Instance', instanceSchema)
