import { DomainCreateTransactionDto } from '../dto/transaction.create.dto';
import { Transaction } from '../entities/transaction.type';
import { StatusesEnum } from '../enum/transaction.statuses';

export interface TransactionRepositoryInterface {
  create(transaction: DomainCreateTransactionDto): Promise<Transaction>;

  updateStatus(id: number, status: StatusesEnum): Promise<Transaction>;

  getById(id: number): Promise<Transaction>;
}
