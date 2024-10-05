import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

jest.mock('../../config', () => ({
  COUNTRIES_API_URL: 'https://api.jsonbin.io/v3/b/5f69afbe65b18913fc510ce8',
}));

const mockHttpService = {
  get: jest.fn(),
};

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch and return filtered and sorted countries', async () => {
    jest.mock('../../config', () => ({
      COUNTRIES_API_URL: 'https://api.jsonbin.io/v3/b/5f69afbe65b18913fc510ce8',
    }));

    const mockCountriesResponse: AxiosResponse<{ record: any[] }> = {
      data: {
        record: [
          { country: 'Austria', vat: 20 },
          { country: 'Belgium', vat: 21 },
          { country: 'Argentina', vat: 19 },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {},
      } as InternalAxiosRequestConfig,
    };

    mockHttpService.get.mockReturnValue(of(mockCountriesResponse));

    const result = await service.findAll({ filter: 'aus', order: 'asc' });

    expect(result).toEqual([{ country: 'Austria', vat: 20 }]); // Filtered by 'aus'
  });

  it('should return countries sorted by VAT in ascending order', async () => {
    jest.mock('../../config', () => ({
      COUNTRIES_API_URL: 'https://api.jsonbin.io/v3/b/5f69afbe65b18913fc510ce8',
    }));

    const mockCountriesResponse: AxiosResponse<{ record: any[] }> = {
      data: {
        record: [
          { country: 'Austria', vat: 20 },
          { country: 'Belgium', vat: 21 },
          { country: 'Argentina', vat: 19 },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {},
      } as InternalAxiosRequestConfig,
    };

    mockHttpService.get.mockReturnValue(of(mockCountriesResponse));

    const result = await service.findAll({ filter: '', order: 'asc' });

    expect(result).toEqual([
      { country: 'Argentina', vat: 19 },
      { country: 'Austria', vat: 20 },
      { country: 'Belgium', vat: 21 },
    ]);
  });

  it('should return countries sorted by VAT in descending order', async () => {
    jest.mock('../../config', () => ({
      COUNTRIES_API_URL: 'https://api.jsonbin.io/v3/b/5f69afbe65b18913fc510ce8',
    }));

    const mockCountriesResponse: AxiosResponse<{ record: any[] }> = {
      data: {
        record: [
          { country: 'Austria', vat: 20 },
          { country: 'Belgium', vat: 21 },
          { country: 'Argentina', vat: 19 },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {},
      } as InternalAxiosRequestConfig,
    };

    mockHttpService.get.mockReturnValue(of(mockCountriesResponse));

    const result = await service.findAll({ filter: '', order: 'desc' });

    expect(result).toEqual([
      { country: 'Belgium', vat: 21 },
      { country: 'Austria', vat: 20 },
      { country: 'Argentina', vat: 19 },
    ]);
  });
});
