import { ShiftType } from '@prisma/client';

export enum Status {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

export class CreateAttendanceTrackingDto {
  date: string;
  shiftType: ShiftType;
  status: Status;
  absentReason?: string | null;
  employeeId: string;
}
