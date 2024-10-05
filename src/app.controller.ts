import { Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOkResponse, ApiParam } from '@nestjs/swagger';

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
  }) // Documenting the parameter
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
}
