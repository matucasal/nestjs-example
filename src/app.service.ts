import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async reverse(string: string): Promise<string> {
    string = string.replace(/[aeiou]/g, (match) => match.toUpperCase());
    return string.split('').reverse().join('');
  }
}
