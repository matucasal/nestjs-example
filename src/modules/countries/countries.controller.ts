import { Query, Controller, Get, ValidationPipe } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { FindAllParamsDTO } from './dtos/findallparams.request.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('')
  async findAll(@Query(new ValidationPipe()) params: FindAllParamsDTO) {
    try {
      return await this.countriesService.findAll(params);
    } catch (err) {
      return {
        statusCode: 500,
        message: 'An error occurred while fetching countries',
        error: err.message,
      };
    }
  }
}
