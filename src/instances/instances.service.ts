import InstanceModel from '../database/models/instance.model';
import { groupsSummaryReducer } from './helpers/groups-summary-reducer';
import { CreateInstanceDto, IdentifyInstanceDto, UpdateInstanceDto, GroupDto } from './dto'



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
  }

  // // it's impossible to use an enviroment variable inside a decorator with '@nestjs/config'
  // // so, if we want to do it, we have to use the native dotenv config
  // @Interval(InstanceExpirationCheckIntervalMs)
  // async removeExpiredInstances() {
  //   this.logger.log('removeExpiredInstances -- periodic job started');
  //   const instanceExpirationTimeInMs =
  //     Number(this.configService.get<string>('INSTANCE_EXPIRATION_TIME_MS')) ||
  //     InstanceExpirationTimeMsDefault;
  //   const dateNow = Date.now();
  //   const theEdge = dateNow - instanceExpirationTimeInMs;
  //   const query = { updatedAt: { $lte: theEdge } };
  //   const { deletedCount } = await InstanceModel.deleteMany(query);
  //   this.logger.log(
  //     `removeExpiredInstances -- amount of deleted instances: ${deletedCount}`,
  //   );
  //   this.logger.log('removeExpiredInstances -- periodic job finished');
  // }
}

export {
  InstancesService,
}
