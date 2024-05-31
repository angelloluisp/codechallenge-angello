import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionServiceInterface } from '../../domain/interfaces/transaction.service.interface';
import { Transaction } from 'src/transaction/domain/entities/transaction.type';

describe('TransactionController', () => {
  let controller: TransactionController;
  let mockTransactionService: Partial<TransactionServiceInterface>;

  beforeEach(async () => {
    mockTransactionService = {
      check: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: 'TransactionService',
          useValue: mockTransactionService,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.check and return true', async () => {
    const transactionData: Transaction = {
      accountExternalIdDebit: '5b766fd7-fd28-4e6d-9661-cdb07992c6e2',
      accountExternalIdCredit: '5b766fd7-fd28-4e6d-9661-cdb07992c6e2',
      tranferTypeId: 1,
      value: 650,
    };
    jest
      .spyOn(mockTransactionService, 'check')
      .mockReturnValueOnce(Promise.resolve(true));

    const result = await controller.created(transactionData);

    expect(mockTransactionService.check).toHaveBeenCalledWith(transactionData);
    expect(result).toBe(true);
  });
});
