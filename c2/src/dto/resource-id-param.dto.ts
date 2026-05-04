import { IsString, Matches } from "class-validator";
import { IsResourceIdExists } from "../validators/resource-id-exists.validator";

export class ResourceIdParamDto {
  @IsString()
  @Matches(/^c[a-z0-9]{24}$/i, { message: "Field 'id' must be a valid cuid." })
  @IsResourceIdExists()
  id!: string;
}
