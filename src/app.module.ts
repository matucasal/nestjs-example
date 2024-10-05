import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CountriesModule } from './modules/countries/countries.module';
import { StringsModule } from './modules/strings/strings.module';

@Module({
  imports: [CountriesModule, StringsModule],
  providers: [AppService],
})
export class AppModule {}
