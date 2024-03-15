import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendanceTrackingService } from './attendance-tracking.service';
import { UpdateAttendanceTrackingDto } from './dto/update-attendance-tracking.dto';
import { AttendanceRecord, Employee } from '@prisma/client';
import { CreateAttendanceTrackingDto } from './dto/create-attendance-tracking.dto';

@Controller('attendance-tracking')
export class AttendanceTrackingController {
  constructor(private readonly attendanceTrackingService: AttendanceTrackingService) {}

  @Post(':id')
  create(@Param('id') id:string,@Body() createAttendanceTrackingDto: CreateAttendanceTrackingDto): Promise<AttendanceRecord> {
    return this.attendanceTrackingService.create(id,createAttendanceTrackingDto);
  }

  @Get()
  findAll() {
    return this.attendanceTrackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<AttendanceRecord | String> {
    return this.attendanceTrackingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceTrackingDto: UpdateAttendanceTrackingDto) {
    return this.attendanceTrackingService.update(id, updateAttendanceTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<boolean> {
    return this.attendanceTrackingService.remove(id);
  }
  @Get('/getEmploye/:id')
  find(@Param('id') id: string):Promise<Employee>{
    return this.attendanceTrackingService.find(id);
  }
}
