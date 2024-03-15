import { Injectable } from '@nestjs/common';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { Payroll, Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PayrollService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    employeeId: string,
    createPayrollDto: CreatePayrollDto,
  ): Promise<Payroll> {
    try {
      const createdPayroll = await this.prisma.payroll.create({
        data: {
          employee: { connect: { id: employeeId } },
          month: createPayrollDto.month,
          basicSalary: createPayrollDto.basicSalary,
          allowances: { create: { ...createPayrollDto.allowances } },
          deductions: { create: { ...createPayrollDto.deductions } },
          netSalary: createPayrollDto.netSalary,
        },
      });
      return createdPayroll;
    } catch (error) {
      console.error('Error creating payroll record:', error);
      throw new Error('Failed to create payroll record');
    }
  }

  async findAll(): Promise<Payroll[]> {
    return this.prisma.payroll.findMany();
  }

  async findOne(id: string): Promise<Payroll | string> {
    try {
      const payroll = await this.prisma.payroll.findUnique({
        where: { id },
        include: {
          employee: true,
        },
      });
      if (!payroll) {
        return `Payroll record with ID ${id} not found`;
      }
      return payroll;
    } catch (error) {
      console.error('Error fetching payroll record:', error);
      throw new Error('Failed to fetch payroll record');
    }
  }

  async update(
    id: string,
    updatePayrollDto: UpdatePayrollDto,
  ): Promise<Payroll> {
    try {
      // Transform CreateAllowanceDto to the expected type AllowancesUpdateWithWhereUniqueWithoutPayrollInput
      const allowancesUpdateData = {
        where: { id: updatePayrollDto.allowances.allowanceId }, // Use the ID to identify the allowance to update
        data: {
          bonus: updatePayrollDto.allowances.bonus,
          overtime: updatePayrollDto.allowances.overtime,
          // Add other fields as needed
        },
      };

      // Similarly, transform CreateDeductionDto to the expected type DeductionsUpdateWithWhereUniqueWithoutPayrollInput
      const deductionsUpdateData = {
        where: { id: updatePayrollDto.deductions.deductionId }, // Use the ID to identify the deduction to update
        data: {
          tax: updatePayrollDto.deductions.tax,
          insurance: updatePayrollDto.deductions.insurance,
          // Add other fields as needed
        },
      };

      const updatedPayroll = await this.prisma.payroll.update({
        where: { id },
        data: {
          month: updatePayrollDto.month,
          basicSalary: updatePayrollDto.basicSalary,
          allowances: { update: allowancesUpdateData }, // Use the transformed data
          deductions: { update: deductionsUpdateData }, // Use the transformed data
          netSalary: updatePayrollDto.netSalary,
        },
      });
      return updatedPayroll;
    } catch (error) {
      console.error('Error updating payroll record:', error);
      throw new Error('Failed to update payroll record');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.payroll.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting payroll record:', error);
      throw new Error('Failed to delete payroll record');
    }
  }

  async findEmployeeById(employeeId: string): Promise<Employee> {
    return this.prisma.employee.findUnique({
      where: { id: employeeId },
    });
  }
}
