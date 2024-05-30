import { IsNotEmpty, IsNumber } from 'class-validator';

export class TransactionUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
