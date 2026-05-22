import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ExpenseEntity } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(@InjectRepository(ExpenseEntity) private repo: Repository<ExpenseEntity>) {}  
  
  async create(createExpenseDto: CreateExpenseDto): Promise<ExpenseEntity> {
    const expense =  this.findOne(createExpenseDto.id.toString());

    if (!expense) {
      throw new NotFoundException('Expense already exists');
    }
    return this.repo.create(this.repo.create(createExpenseDto));
  }

  async findAll(category: string): Promise<ExpenseEntity[]> {
    if (category) {
      return this.repo.find({
        where: { category },
        order: {
          createdAt: 'DESC',
        },
      });
    }    
    return this.repo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<ExpenseEntity | null> {
    return this.repo.findOne({
      where: { id },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<ExpenseEntity | null> {
    const expense = await this.repo.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    Object.assign(expense, updateExpenseDto);
    return this.repo.save(expense);
  }
}