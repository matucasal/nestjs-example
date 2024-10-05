import { IsString, IsOptional } from 'class-validator';

export class AppendDTO {
  @IsOptional()
  @IsString()
  start?: string;

  @IsOptional()
  @IsString()
  end?: string;
}
