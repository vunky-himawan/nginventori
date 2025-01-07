import { BloodType } from "@/common/enums/blood-type-enum";
import { Gender } from "@/common/enums/gender-enum";
import { MarriageStatus } from "@/common/enums/mirrage-status-enum";
import { Religion } from "@/common/enums/religion-enum";

export interface CreateUserDto {
  role_id: bigint;
  office_location_id: bigint;
  department_id: bigint;
  position_id: bigint;
  type_id: bigint;
  head_id: bigint;
  level_id?: bigint;
  email: string;
  password?: string;
  name: string;
  birth_location: string;
  birth_date: Date;
  gender: Gender;
  wa_number: string;
  nik: string;
  living_address?: string;
  religion?: Religion;
  marriage_status?: MarriageStatus;
  blood_type?: BloodType;
  city?: string;
  province?: string;
  postal_code?: string;
  joined_date: Date;
  assessment_date?: Date;
  resigned_date?: Date;
}
