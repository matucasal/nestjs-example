import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { FindAllParamsDTO } from './dtos/findallparams.request.dto';

describe('CountriesController', () => {
  let controller: CountriesController;
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return countries data successfully', async () => {
    const mockCountries = [{ country: 'Germany', code: 'DE', vat: 19 }];
    jest.spyOn(service, 'findAll').mockResolvedValue(mockCountries);

    const params: FindAllParamsDTO = { filter: 'ger', order: 'asc' };
    const result = await controller.findAll(params);

    expect(result).toEqual(mockCountries);
    expect(service.findAll).toHaveBeenCalledWith(params);
  });

  it('should handle errors and return a 500 status code', async () => {
    const errorMessage = 'Service error';
    jest.spyOn(service, 'findAll').mockRejectedValue(new Error(errorMessage));

    const params: FindAllParamsDTO = { filter: '', order: 'asc' };
    const result = await controller.findAll(params);

    expect(result).toEqual({
      statusCode: 500,
      message: 'An error occurred while fetching countries',
      error: errorMessage,
    });
    expect(service.findAll).toHaveBeenCalledWith(params);
  });
});
