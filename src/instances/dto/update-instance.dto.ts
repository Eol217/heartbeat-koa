import { IdentifyInstanceDto } from './identify-instance.dto';


export interface UpdateInstanceDto extends IdentifyInstanceDto {
  updatedAt: number;
  meta: unknown;
}
