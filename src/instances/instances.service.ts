import InstanceModel, { Instance } from '../database/models/instance.model';
import { groupsSummaryReducer } from './helpers/groups-summary-reducer';
import { CreateInstanceDto, IdentifyInstanceDto, UpdateInstanceDto, GroupDto } from './dto'


class InstancesService {
  private readonly fieldsToHideSelector = { _id: 0, __v: 0 };

  async create (createInstanceDto: CreateInstanceDto) {
    await InstanceModel.create(createInstanceDto)
  }

  async getGroups (): Promise<GroupDto[]> {
    const select = {
      ...this.fieldsToHideSelector,
      id: 0,
      meta: 0,
    };
    const instances = await InstanceModel.find({}, select);
    const preparedInstances = instances.reduce(groupsSummaryReducer, {});

    return Object.values(preparedInstances);
  }

  async doesExist (query: IdentifyInstanceDto): Promise<boolean> {
    return Boolean(await InstanceModel.countDocuments(query));
  }

  async findOne (query: IdentifyInstanceDto): Promise<Instance | null> {
    return InstanceModel.findOne(query, this.fieldsToHideSelector);
  }

  async getGroupInstances (group: string): Promise<Instance[]> {
    const query = { group };

    return InstanceModel.find(query, this.fieldsToHideSelector);
  }

  // it isn't specified, should meta be updated or not
  // I decided that we shouldn't lose a possible new meta
  async updateTimestampAndMeta (UpdateInstanceDto: UpdateInstanceDto) {
    const { updatedAt, meta, ...query } = UpdateInstanceDto;
    const updater = { $set: { updatedAt, meta } };
    await InstanceModel.updateOne(query, updater);
  }

  async remove (query: IdentifyInstanceDto): Promise<boolean> {
    const result = await InstanceModel.deleteOne(query);

    return Boolean(result.deletedCount)
  }

  async removeExpiredInstances (instanceExpirationTimeInMs: number) {
    console.log('InstancesService::removeExpiredInstances -- periodic job started');
    const dateNow = Date.now();
    const theEdge = dateNow - instanceExpirationTimeInMs;
    const query = { updatedAt: { $lte: theEdge } };
    const { deletedCount } = await InstanceModel.deleteMany(query);
    console.log(`InstancesService::removeExpiredInstances -- amount of deleted instances: ${deletedCount}`);
    console.log('InstancesService::removeExpiredInstances -- periodic job finished');
  }
}


const instancesService: InstancesService = new InstancesService()

export {
  instancesService,
}
