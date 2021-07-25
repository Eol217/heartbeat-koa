import { IdentifyInstanceDto } from './identify-instance.dto';


export interface CreateInstanceDto extends IdentifyInstanceDto {
  meta: unknown;
}
