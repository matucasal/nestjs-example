import { Injectable } from '@nestjs/common';
import { CountryPayloadDTO } from './dtos/countries.payload';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { COUNTRIES_API_URL } from '../../config';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(params: {
    filter: string;
    order: string;
  }): Promise<CountryPayloadDTO[] | []> {
    if (!COUNTRIES_API_URL || COUNTRIES_API_URL === '') {
      throw new Error('COUNTRIES_API_URL is not defined');
    }

    const { filter, order } = params;

    try {
      // https://docs.nestjs.com/techniques/http-module#full-example
      const countries = await lastValueFrom(
        this.httpService
          .get<{ record: CountryPayloadDTO[] }>(COUNTRIES_API_URL)
          .pipe(
            map((response: AxiosResponse<{ record: CountryPayloadDTO[] }>) => {
              let countriesList = response.data?.record || [];

              // Apply filtering logic
              if (filter) {
                countriesList = countriesList.filter((country) =>
                  country.country.toLowerCase().includes(filter.toLowerCase()),
                );
              }

              // Apply ordering logic (sort by vat)
              if (order === 'asc') {
                countriesList = countriesList.sort((a, b) => a.vat - b.vat);
              } else if (order === 'desc') {
                countriesList = countriesList.sort((a, b) => b.vat - a.vat);
              }

              return countriesList;
            }),
          ),
      );

      return countries;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  }
}
