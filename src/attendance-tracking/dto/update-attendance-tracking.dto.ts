import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceTrackingDto } from './create-attendance-tracking.dto';

export class UpdateAttendanceTrackingDto extends PartialType(
  CreateAttendanceTrackingDto,
) {}
