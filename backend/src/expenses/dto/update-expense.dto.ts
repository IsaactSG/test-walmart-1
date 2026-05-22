import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { IsEnum } from 'class-validator';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {

    @IsEnum(['pending', 'reviewed', 'avoided'])
    status?: 'pending' | 'reviewed' | 'avoided';
}
