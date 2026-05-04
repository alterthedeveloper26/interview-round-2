import { IsIn, IsOptional, IsString } from "class-validator";

export class ListResourcesQueryDto {
  @IsOptional()
  @IsIn(["active", "inactive"])
  status?: "active" | "inactive";

  @IsOptional()
  @IsString()
  searchTerm?: string;
}
