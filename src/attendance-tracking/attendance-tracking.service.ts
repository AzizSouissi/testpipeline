import { Injectable } from '@nestjs/common';
import { CreateAttendanceTrackingDto } from './dto/create-attendance-tracking.dto';
import { UpdateAttendanceTrackingDto } from './dto/update-attendance-tracking.dto';
import { AttendanceRecord, Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AttendanceTrackingService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    employeeId: string,
    createAttendanceTrackingDto: CreateAttendanceTrackingDto,
  ): Promise<AttendanceRecord | any> {
    try {
      const currentDate = new Date().toISOString().split('T')[0];

      const existingRecord = await this.prisma.attendanceRecord.findFirst({
        where: {
          date: currentDate,
          employeeId: employeeId,
        },
      });

      if (existingRecord) {
        return {
          message: 'You already created an attendance for today.',
        };
      }

      const createdRecord = await this.prisma.attendanceRecord.create({
        data: {
          date: currentDate,
          shiftType: createAttendanceTrackingDto.shiftType,
          status: createAttendanceTrackingDto.status,
          absentReason: createAttendanceTrackingDto.absentReason,
          employee: {
            connect: { id: employeeId },
          },
        },
        select: {
          id: true,
          date: true,
          shiftType: true,
          status: true,
          absentReason: true,
        },
      });
      return createdRecord;
    } catch (error) {
      console.error('Error creating attendance record:', error);
      throw new Error('Failed to create attendance record');
    }
  }

  find(id: string): Promise<Employee> {
    return this.prisma.employee.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAll(): Promise<AttendanceRecord[]> {
    return this.prisma.attendanceRecord.findMany();
  }

  async findOne(id: string): Promise<AttendanceRecord | string> {
    try {
      const record = await this.prisma.attendanceRecord.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          date: true,
          shiftType: true,
          status: true,
          absentReason: true,
          employeeId: true,
          attendanceId: true,
        },
      });

      if (!record) {
        return 'this id : ' + id + ' Not found';
      }

      return record;
    } catch (error) {
      console.error('Error fetching attendance record:', error);
      throw new Error('Failed to fetch attendance record');
    }
  }

  async update(
    id: string,
    updateAttendanceTrackingDto: UpdateAttendanceTrackingDto,
  ): Promise<AttendanceRecord | any> {
    try {
      const updatedRecord = await this.prisma.attendanceRecord.update({
        where: { id: id }, // Specify which attendance record to update based on the id
        data: {
          date: updateAttendanceTrackingDto.date,
          shiftType: updateAttendanceTrackingDto.shiftType,
          status: updateAttendanceTrackingDto.status,
          absentReason: updateAttendanceTrackingDto.absentReason,
        },
        select: {
          id: true,
          date: true,
          shiftType: true,
          status: true,
          absentReason: true,
          employee: true,
        },
      });
      return updatedRecord;
    } catch (error) {
      console.error('Error updating attendance record:', error);
      throw new Error('Failed to update attendance record');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.attendanceRecord.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting attendance record:', error);
      throw new Error('Failed to delete attendance record');
    }
  }
}
