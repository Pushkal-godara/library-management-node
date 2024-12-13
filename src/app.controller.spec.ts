import { Test, TestingModule } from '@nestjs/testing';
import { AppServiceModule } from './app.service.controller';

describe('AppController', () => {
  let appController: AppServiceModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppServiceModule],
    }).compile();

    appController = app.get<AppServiceModule>(AppServiceModule);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
