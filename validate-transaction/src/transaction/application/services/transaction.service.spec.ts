import { Test, TestingModule } from '@nestjs/testing';
import { TransactionServiceImpl } from './transaction.service';
import { Transaction } from 'src/transaction/domain/entities/transaction.type';
import { TransactionRepositoryInterface } from 'src/transaction/domain/interfaces/transaction.repository.interface';

describe('TransactionServiceImpl', () => {
  let service: TransactionServiceImpl;
  let mockTransactionRepository: Partial<TransactionRepositoryInterface>;

  beforeEach(async () => {
    mockTransactionRepository = {
      sendRejected: jest.fn(),
      sendApproved: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionServiceImpl,
        {
          provide: 'TransactionRepository',
          useValue: mockTransactionRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionServiceImpl>(TransactionServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send rejected message for invalid transaction', async () => {
    const invalidTransaction: Transaction = {
      id: 1,
      value: 1001,
      accountExternalIdDebit: '5b766fd7-fd28-4e6d-9661-cdb07992c6e1',
      accountExternalIdCredit: '5b766fd7-fd28-4e6d-9661-cdb07992c6e1',
      tranferTypeId: 1,
    };
    jest
      .spyOn(mockTransactionRepository, 'sendRejected')
      .mockReturnValueOnce(Promise.resolve(true));

    const result = await service.check(invalidTransaction);

    expect(mockTransactionRepository.sendRejected).toHaveBeenCalledWith(
      invalidTransaction.id,
      expect.any(String),
    );
    expect(result).toBe(true);
  });

  it('should send approved message for valid transaction', async () => {

    const invalidTransaction: Transaction = {
      id: 1,
      value: 650,
      accountExternalIdDebit: '5b766fd7-fd28-4e6d-9661-cdb07992c6e0',
      accountExternalIdCredit: '5b766fd7-fd28-4e6d-9661-cdb07992c6e0',
      tranferTypeId: 1,
    };
    jest
      .spyOn(mockTransactionRepository, 'sendApproved')
      .mockReturnValueOnce(Promise.resolve(true));

    const result = await service.check(invalidTransaction);

    expect(mockTransactionRepository.sendApproved).toHaveBeenCalledWith(
      invalidTransaction.id,
      expect.any(String),
    );
    expect(result).toBe(true);
  });
});
