import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DemoService } from './demo.service';
import type { ISingleValueHttpResponse } from '../../interfaces';

@ApiTags('demo')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  async getDemo(): Promise<ISingleValueHttpResponse<string>> {
    try {
      const result = await this.demoService.getDemo();
      return {
        success: true,
        data: result || undefined,
      };
    } catch (err: any) {
      throw new HttpException({
        success: false,
        message: err.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}

