import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesService } from './expenses/expenses.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from './expenses/entities/expense.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local', ".env"] }), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        synchronize: true,
        entities: [ExpenseEntity],
        autoLoadEntities: true,
      })
    })],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class AppModule {}
