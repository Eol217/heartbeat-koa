import { GroupDto } from '../dto';


interface CurrentInstanceDto {
  group: string;
  createdAt: number;
  updatedAt: number;
}


interface GroupsDictionaryDto {
  [key: string]: GroupDto;
}


function groupsSummaryReducer (result: GroupsDictionaryDto, current: CurrentInstanceDto): GroupsDictionaryDto {
  const { group, createdAt, updatedAt } = current;
  const groupInfo = result[group];

  if (!groupInfo) {
    result[group] = {
      group,
      instances: '1',
      createdAt,
      updatedAt,
    };

    return result;
  }

  result[group].instances = String(Number(groupInfo.instances) + 1);
  result[group].createdAt = Math.min(groupInfo.createdAt, createdAt);
  result[group].updatedAt = Math.max(groupInfo.updatedAt, updatedAt);

  return result;
}

export { groupsSummaryReducer };
