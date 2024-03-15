import { Module } from '@nestjs/common';
import { AttendanceTrackingService } from './attendance-tracking.service';
import { AttendanceTrackingController } from './attendance-tracking.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AttendanceTrackingController],
  providers: [AttendanceTrackingService,PrismaService],
})
export class AttendanceTrackingModule {}
