import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should reverse the string and convert vowels to uppercase', async () => {
    const input = 'Hello World';
    const expectedOutput = 'dlrOW OllEH';
    const result = await service.reverse(input);
    expect(result).toBe(expectedOutput);
  });

  it('should handle an empty string', async () => {
    const input = '';
    const expectedOutput = '';
    const result = await service.reverse(input);
    expect(result).toBe(expectedOutput);
  });

  it('should convert vowels to uppercase and reverse the string', async () => {
    const input = 'NestJS';
    const expectedOutput = 'SJtsEN';
    const result = await service.reverse(input);
    expect(result).toBe(expectedOutput);
  });
});
