import { IsString, IsIn, IsOptional } from 'class-validator';

export class FindAllParamsDTO {
  @IsOptional()
  @IsString()
  filter: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: string;
}
