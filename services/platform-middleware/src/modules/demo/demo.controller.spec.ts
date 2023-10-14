import { Test, TestingModule } from '@nestjs/testing';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

describe('DemoController', () => {
  let demoController: DemoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DemoController],
      providers: [DemoService],
    }).compile();

    demoController = app.get<DemoController>(DemoController);
  });

  describe('demo', () => {
    it('should return "Response from demo api"', async () => {
        const result = await demoController.getDemo();
      expect(result.success).toBe(true);
      expect(result.data).toBe("Response from demo api");
    });
  });
});
