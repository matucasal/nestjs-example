import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppendDTO } from './dtos/append.request.dto';

jest.mock('../../config', () => ({
  SIMPLE_ARRAY: 'apple,banana,orange',
}));

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  describe('reverse', () => {
    it('should reverse the string and capitalize vowels', async () => {
      const result = await service.reverse('hello');
      expect(result).toBe('OllEh');
    });

    it('should return the same string if no vowels', async () => {
      const result = await service.reverse('bcdfg');
      expect(result).toBe('gfdcb');
    });
  });

  describe('append', () => {
    it('should return the original array when no start or end params are provided', () => {
      const params: AppendDTO = {};
      const result = service.append(params);
      expect(result).toEqual(['apple', 'banana', 'orange']);
    });

    it('should append to the start if start param is provided', () => {
      const params: AppendDTO = { start: 'grape' };
      const result = service.append(params);
      expect(result).toEqual(['grape', 'apple', 'banana', 'orange']);
    });

    it('should append to the end if end param is provided', () => {
      const params: AppendDTO = { end: 'kiwi' };
      const result = service.append(params);
      expect(result).toEqual(['apple', 'banana', 'orange', 'kiwi']);
    });
  });
});
