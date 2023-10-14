import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
  getDemo(): string {
    return 'Response from demo api';
  }
}
