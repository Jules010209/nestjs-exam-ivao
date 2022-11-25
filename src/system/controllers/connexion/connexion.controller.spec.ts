import { Test, TestingModule } from '@nestjs/testing';
import { ConnexionController } from './connexion.controller';

describe('ConnexionController', () => {
  let controller: ConnexionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnexionController],
    }).compile();

    controller = module.get<ConnexionController>(ConnexionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
