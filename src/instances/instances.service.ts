import InstanceModel from '../database/models/instance.model';
import { groupsSummaryReducer } from './helpers/groups-summary-reducer';
import { CreateInstanceDto, IdentifyInstanceDto, UpdateInstanceDto } from './dto'



const fieldsToHideSelector =  { _id: 0, __v: 0 }

const InstancesService = {
  create: async (createInstanceDto: CreateInstanceDto) => {
    await InstanceModel.create(createInstanceDto)
  },

  getGroups: async () => {
    const select = {
      ...fieldsToHideSelector,
      id: 0,
      meta: 0,
    };
    const instances = await InstanceModel.find({}, select);
    const preparedInstances = instances.reduce(groupsSummaryReducer, {});

    return Object.values(preparedInstances);
  },

  doesExist: async (query: IdentifyInstanceDto) => {
    return Boolean(await InstanceModel.countDocuments(query));
  },

  findOne: async (query: IdentifyInstanceDto) => {
    return InstanceModel.findOne(query, fieldsToHideSelector);
  },

  getGroupInstances: async (group: string) => {
    const query = { group };

    return InstanceModel.find(query, fieldsToHideSelector);
  },

  // it isn't specified, should meta be updated or not
  // I decided that we shouldn't lose a possible new meta
  updateTimestampAndMeta: async (UpdateInstanceDto: UpdateInstanceDto) => {
    const { updatedAt, meta, ...query } = UpdateInstanceDto;
    const updater = { $set: { updatedAt, meta } };
    await InstanceModel.updateOne(query, updater);
  },

  remove: async (query: IdentifyInstanceDto) => {
    await InstanceModel.deleteOne(query);
  },

  removeExpiredInstances: async (instanceExpirationTimeInMs: number) => {
    console.log('InstancesService::removeExpiredInstances -- periodic job started');
    const dateNow = Date.now();
    const theEdge = dateNow - instanceExpirationTimeInMs;
    const query = { updatedAt: { $lte: theEdge } };
    const { deletedCount } = await InstanceModel.deleteMany(query);
    console.log(`InstancesService::removeExpiredInstances -- amount of deleted instances: ${deletedCount}`);
    console.log('InstancesService::removeExpiredInstances -- periodic job finished');
  }
}

export {
  InstancesService,
}
