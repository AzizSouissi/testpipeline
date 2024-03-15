import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { Payroll } from '@prisma/client';
import { CreatePayrollDto } from './dto/create-payroll.dto';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() createPayrollDto: CreatePayrollDto,
  ): Promise<Payroll> {
    return this.payrollService.create(id, createPayrollDto);
  }

  @Get()
  findAll() {
    return this.payrollService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Payroll | string> {
    return this.payrollService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
    return this.payrollService.update(id, updatePayrollDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.payrollService.remove(id);
  }
}
