import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CountriesModule } from '../countries/countries.module';
import { AppController } from './app.controller';

@Module({
  imports: [CountriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
