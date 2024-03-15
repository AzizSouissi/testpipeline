import { CreateAllowanceDto } from '../../allowances/dto/create-allowance.dto';
import { CreateDeductionDto } from '../../deductions/dto/create-deduction.dto';

export class CreatePayrollDto {
  payrollId: string;
  employeeId: string;
  month: Date;
  basicSalary: number;
  allowances: CreateAllowanceDto;
  deductions: CreateDeductionDto;
  netSalary: number;
}
