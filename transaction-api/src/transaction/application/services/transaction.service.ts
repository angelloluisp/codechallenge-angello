import { Inject, Injectable } from '@nestjs/common';
import { DomainCreateTransactionDto } from 'src/transaction/domain/dto/transaction.create.dto';
import { Transaction } from 'src/transaction/domain/entities/transaction.type';
import { TransactionRepositoryInterface } from 'src/transaction/domain/interfaces/transaction.repository.interface';
import { TransactionServiceInterface } from 'src/transaction/domain/interfaces/transaction.service.interface';

@Injectable()
export class TransactionServiceImpl implements TransactionServiceInterface {
  constructor(
    @Inject('TransactionRepository')
    private readonly repository: TransactionRepositoryInterface,
  ) {}

  async create(transaction: DomainCreateTransactionDto): Promise<Transaction> {
    console.log('create service', transaction)
    const created = await this.repository.create(transaction);
    console.log('created -- service', created)
    await this.repository.sendCreated(created);
    return created;
  }

  async reject(id: number): Promise<Transaction> {
    const updated = await this.repository.reject(id);
    return updated;
  }
  async approve(id: number): Promise<Transaction> {
    const updated = await this.repository.approve(id);
    return updated;
  }

  async getById(id: number): Promise<Transaction> {
    return await this.repository.getById(id);
  }
}
