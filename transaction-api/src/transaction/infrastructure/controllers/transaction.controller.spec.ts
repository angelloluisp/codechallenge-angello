import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionServiceInterface } from '../../domain/interfaces/transaction.service.interface';
import { CreateTransactionDto } from '../dto/transactionCreate.dto';
import { TransactionDto } from 'src/transaction/infrastructure/dto/transaction.dto';
import { TransactionUpdateDto } from 'src/transaction/infrastructure/dto/transactionUpdate.dto';
import { Transaction } from 'src/transaction/domain/entities/transaction.type';

describe('TransactionController', () => {
  let controller: TransactionController;
  let transactionService: TransactionServiceInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: 'TransactionService',
          useValue: {
            create: jest.fn(),
            reject: jest.fn(),
            approve: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    transactionService =
      module.get<TransactionServiceInterface>('TransactionService');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Creando una nueva transacción', async () => {
      const createTransactionDto: CreateTransactionDto = {
        accountExternalIdDebit: 'UID',
        accountExternalIdCredit: 'UID',
        tranferTypeId: 1,
        value: 200,
      };

      const mockTransaction: Transaction = {
        id: 1,
        accountExternalIdDebit: 'UID',
        accountExternalIdCredit: 'UID',
        tranferTypeId: 1,
        value: 200,
        createdAt: new Date(),
        status: 'pending',
      };
      const mockTransactionResult: TransactionDto = {
        id: 1,
        transactionExternalId: 'UID',
        transactionType: {
          name: '1',
        },
        transactionStatus: {
          name: 'pending',
        },
        value: 200,
        createdAt: new Date(),
      };

      transactionService.create = jest.fn().mockResolvedValue(mockTransaction);

      const result = await controller.create(createTransactionDto);
      expect(result).toEqual(mockTransactionResult);
    });
  });

  describe('reject', () => {
    it('Realizando una transación rechazada', async () => {
      const transactionUpdateDto: TransactionUpdateDto = {
        id: 1,
      };

      const mockTransaction: Transaction = {
        id: 1,
        accountExternalIdDebit: 'UID',
        accountExternalIdCredit: 'UID',
        tranferTypeId: 1,
        value: 200,
        createdAt: new Date(),
        status: 'rejected',
      };
      const mockTransactionResult: TransactionDto = {
        id: 1,
        transactionExternalId: 'UID',
        transactionType: {
          name: '1',
        },
        transactionStatus: {
          name: 'rejected',
        },
        value: 200,
        createdAt: new Date(),
      };

      transactionService.reject = jest.fn().mockResolvedValue(mockTransaction);

      const result = await controller.reject(transactionUpdateDto);
      expect(result).toEqual(mockTransactionResult);
    });
  });

  describe('approve', () => {
    it('Realizando una transaccion aprobada', async () => {
      const transactionUpdateDto: TransactionUpdateDto = {
        id: 1,
      };

      const mockTransaction: Transaction = {
        id: 1,
        accountExternalIdDebit: 'UID',
        accountExternalIdCredit: 'UID',
        tranferTypeId: 1,
        value: 200,
        createdAt: new Date(),
        status: 'approved',
      };
      const mockTransactionResult: TransactionDto = {
        id: 1,
        transactionExternalId: 'UID',
        transactionType: {
          name: '1',
        },
        transactionStatus: {
          name: 'approved',
        },
        value: 200,
        createdAt: new Date(),
      };

      transactionService.approve = jest.fn().mockResolvedValue(mockTransaction);

      const result = await controller.approve(transactionUpdateDto);
      expect(result).toEqual(mockTransactionResult);
    });
  });
});
