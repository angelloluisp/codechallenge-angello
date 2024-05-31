import { Global, Module, Provider } from '@nestjs/common';
import { TransactionServiceImpl } from '../application/services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionRepositoryImpl } from './repositories/kafka/transaction.repository';

export const transactionProviders: Provider[] = [
  {
    provide: 'TransactionRepository',
    useClass: TransactionRepositoryImpl,
  },
  {
    provide: 'TransactionService',
    useClass: TransactionServiceImpl,
  },
];
@Global()
@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [...transactionProviders],
  exports: [...transactionProviders],
})
export class TransactionModule {}
