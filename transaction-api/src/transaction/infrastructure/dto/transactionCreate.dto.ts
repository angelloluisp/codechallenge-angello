import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID('4', { message: 'Coloque el tipo UUID correcta' })
  @IsNotEmpty()
  accountExternalIdDebit: string;

  @IsUUID('4', { message: 'Coloque el tipo UUID correcta' })
  @IsNotEmpty()
  accountExternalIdCredit: string;

  @IsNumber()
  @IsNotEmpty()
  tranferTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
