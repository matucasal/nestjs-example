import { Query, Controller, Get, ValidationPipe } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { FindAllParamsDTO } from './dtos/findallparams.request.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('countries')
@ApiTags('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('')
  @ApiOkResponse({ description: 'Application created successfully' })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description: 'Filter by country name',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Order by VAT',
  })
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
