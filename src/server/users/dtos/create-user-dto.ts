import { BLOOD_TYPE_ENUM } from "@/common/enums/blood-type-enum";
import { GENDER_ENUM } from "@/common/enums/gender-enum";
import { MIRRAGE_STATUS_ENUM } from "@/common/enums/mirrage-status-enum";
import { RELIGION_ENUM } from "@/common/enums/religion-enum";

export interface CreateUserDto {
  roleId: bigint;
  officeLocationId: bigint;
  departmentId: bigint;
  positionId: bigint;
  typeId: bigint;
  headId: bigint;
  levelId?: bigint;
  email: string;
  password?: string;
  name: string;
  birthLocation: string;
  birthDate: Date;
  gender: GENDER_ENUM;
  waNumber: string;
  nik: string;
  livingAddress?: string;
  religion?: RELIGION_ENUM;
  marriageStatus?: MIRRAGE_STATUS_ENUM;
  bloodType?: BLOOD_TYPE_ENUM;
  city?: string;
  province?: string;
  postalCode?: string;
  joinedDate: Date;
  assessmentDate?: Date;
  resignedDate?: Date;
}
