import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './modules/countries/countries.module';
import { StringsModule } from './modules/strings/strings.module';

@Module({
  imports: [CountriesModule, StringsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
