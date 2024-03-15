import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayrollModule } from './payroll/payroll.module';
import { AllowancesModule } from './allowances/allowances.module';
import { DeductionsModule } from './deductions/deductions.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AttendanceTrackingModule } from './attendance-tracking/attendance-tracking.module';

@Module({
  imports: [
    PayrollModule,
    AllowancesModule,
    DeductionsModule,
    AttendanceTrackingModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
