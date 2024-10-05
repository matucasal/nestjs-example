import { Injectable } from '@nestjs/common';
import { AppendDTO } from './dtos/append.request.dto';
import { SIMPLE_ARRAY as simpleArrayValues } from '../../config';

@Injectable()
export class AppService {
  async reverse(string: string): Promise<string> {
    string = string.replace(/[aeiou]/g, (match) => match.toUpperCase());
    return string.split('').reverse().join('');
  }

  append(params: AppendDTO): string[] {
    if (!simpleArrayValues) {
      throw new Error('Simple array values not found');
    }

    const arrayValues = simpleArrayValues.split(',');

    if (params.start) {
      arrayValues.unshift(params.start);
    }
    if (params.end) {
      arrayValues.push(params.end);
    }

    return arrayValues;
  }
}
