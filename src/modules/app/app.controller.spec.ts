import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppendDTO } from './dtos/append.request.dto';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            reverse: jest.fn(),
            append: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return reversed string successfully', async () => {
    const mockReversedString = 'dlroW olleH';
    jest.spyOn(service, 'reverse').mockResolvedValue(mockReversedString);

    const result = await controller.reverse('Hello World');

    expect(result).toBe(mockReversedString);
    expect(service.reverse).toHaveBeenCalledWith('Hello World');
  });

  it('should handle errors and return a 500 status code', async () => {
    const errorMessage = 'Service error';
    jest.spyOn(service, 'reverse').mockRejectedValue(new Error(errorMessage));

    const result = await controller.reverse('Hello World');

    expect(result).toEqual({
      statusCode: 500,
      message: 'An error occurred while reversing string',
      error: errorMessage,
    });
    expect(service.reverse).toHaveBeenCalledWith('Hello World');
  });

  it('should append string successfully', () => {
    const mockAppendedArray = ['0', '1', '2', '3', '4', '5', '6'];
    //jest.spyOn(service, 'append').mockResolvedValue(mockAppendedArray);
    service.append = jest.fn().mockReturnValue(mockAppendedArray);

    const params: AppendDTO = { start: '0', end: '6' };
    const result = controller.append(params);

    expect(result).toBe(mockAppendedArray);
    expect(service.append).toHaveBeenCalledWith(params);
  });
});
