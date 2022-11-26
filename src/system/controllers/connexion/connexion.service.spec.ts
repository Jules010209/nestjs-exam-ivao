import { Test, TestingModule } from '@nestjs/testing';
import { ConnexionService } from './connexion.service';

describe('ConnexionService', () => {
  let service: ConnexionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnexionService],
    }).compile();

    service = module.get<ConnexionService>(ConnexionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
