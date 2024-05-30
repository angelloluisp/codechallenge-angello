import { DomainCreateTransactionDto } from '../dto/transaction.create.dto';
import { Transaction } from '../entities/transaction.type';

export interface TransactionRepositoryInterface {
  create(transaction: DomainCreateTransactionDto): Promise<Transaction>;
  sendCreated(transaction: Transaction);

  reject(id: number): Promise<Transaction>;
  approve(id: number): Promise<Transaction>;

  getById(id: number): Promise<Transaction>;
}
