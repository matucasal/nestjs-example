import { Controller, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AppendDTO } from './dtos/append.request.dto';

@Controller()
@ApiTags('strings')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('reverse/:string')
  @ApiOkResponse({ description: 'Revert string' })
  @ApiParam({
    name: 'string',
    description: 'The string to be reversed',
    type: String,
  })
  async reverse(@Param('string') string: string) {
    try {
      return await this.appService.reverse(string);
    } catch (err) {
      return {
        statusCode: 500,
        message: 'An error occurred while reversing string',
        error: err.message,
      };
    }
  }

  @Post('append')
  @ApiOkResponse({
    description: 'Append string into start or end of the array',
  })
  @ApiQuery({
    name: 'start',
    required: false,
    type: String,
    description: 'Append to start',
  })
  @ApiQuery({
    name: 'end',
    required: false,
    type: String,
    description: 'Append to end',
  })
  append(@Query(new ValidationPipe()) params: AppendDTO) {
    try {
      return this.appService.append(params);
    } catch (err) {
      return {
        statusCode: 500,
        message: 'An error occurred while appending string',
        error: err.message,
      };
    }
  }
}
