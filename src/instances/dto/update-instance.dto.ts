import { IdentifyInstanceDto } from './identify-instance.dto';


export interface UpdateInstanceDto extends IdentifyInstanceDto {
  meta: unknown;
}
