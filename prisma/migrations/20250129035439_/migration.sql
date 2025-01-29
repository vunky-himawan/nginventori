-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'CHRISTIAN', 'HINDU', 'BUDDHIST', 'OTHER');

-- CreateEnum
CREATE TYPE "MarriageStatus" AS ENUM ('MARRIED', 'SINGLE', 'WIDOW', 'WIDOWER');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A', 'B', 'AB', 'O', 'OTHER');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('REQUEST', 'APPROVED', 'REJECTED', 'CANCELLED', 'RETURNED');

-- CreateEnum
CREATE TYPE "MaintenanceStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InventoryItemUnitStatus" AS ENUM ('AVAILABLE', 'LOANED', 'DAMAGED', 'LOST');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('DAMAGE', 'LOSS', 'OTHER');

-- CreateEnum
CREATE TYPE "MonthlyReportStatus" AS ENUM ('PENDING', 'AUDITED');

-- CreateEnum
CREATE TYPE "AuditStatus" AS ENUM ('APPROVED', 'REJECTED', 'REVIEW_REQUIRED');

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "clerk_id" VARCHAR(255) NOT NULL,
    "role_id" BIGINT NOT NULL,
    "location_id" BIGINT NOT NULL,
    "department_id" BIGINT NOT NULL,
    "position_id" BIGINT NOT NULL,
    "type_id" BIGINT NOT NULL,
    "head_id" BIGINT,
    "level_id" BIGINT,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "birth_location" VARCHAR(255) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "wa_number" VARCHAR(255) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "living_address" VARCHAR(255),
    "religion" "Religion",
    "marriage_status" "MarriageStatus",
    "blood_type" "BloodType",
    "city" VARCHAR(255),
    "province" VARCHAR(255),
    "postal_code" VARCHAR(255),
    "joined_date" TIMESTAMP(3) NOT NULL,
    "assessment_date" TIMESTAMP(3),
    "resigned_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" BIGSERIAL NOT NULL,
    "actor_id" BIGINT NOT NULL,
    "log_name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "subject_type" VARCHAR(255) NOT NULL,
    "action" "Action" NOT NULL,
    "properties" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_has_permissions" (
    "role_id" BIGINT NOT NULL,
    "permission_id" BIGINT NOT NULL,

    CONSTRAINT "role_has_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "employee_positions" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "employee_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_types" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "employee_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levels" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "min_period" INTEGER NOT NULL,
    "max_period" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "office_locations" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "office_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_items" (
    "id" BIGSERIAL NOT NULL,
    "location_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(8,2) NOT NULL,
    "total_quantity" INTEGER NOT NULL,
    "available_quantity" INTEGER NOT NULL,
    "loaned_quantity" INTEGER NOT NULL,
    "damaged_quantity" INTEGER NOT NULL,
    "lost_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "inventory_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_categories" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "inventory_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_items_has_inventory_categories" (
    "inventory_item_id" BIGINT NOT NULL,
    "inventory_category_id" BIGINT NOT NULL,

    CONSTRAINT "inventory_items_has_inventory_categories_pkey" PRIMARY KEY ("inventory_item_id","inventory_category_id")
);

-- CreateTable
CREATE TABLE "inventory_responsibilities" (
    "inventory_item_id" BIGINT NOT NULL,
    "responsible_user_id" BIGINT NOT NULL,

    CONSTRAINT "inventory_responsibilities_pkey" PRIMARY KEY ("inventory_item_id","responsible_user_id")
);

-- CreateTable
CREATE TABLE "inventory_maintenances" (
    "id" BIGSERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "status" "MaintenanceStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "inventory_maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_item_units" (
    "id" BIGSERIAL NOT NULL,
    "inventory_item_id" BIGINT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "status" "InventoryItemUnitStatus" NOT NULL,
    "barcode" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "inventory_item_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_maintenance_details" (
    "inventory_maintenance_id" BIGINT NOT NULL,
    "inventory_item_unit_id" BIGINT NOT NULL,
    "maintenance_person_id" BIGINT NOT NULL,

    CONSTRAINT "inventory_maintenance_details_pkey" PRIMARY KEY ("inventory_maintenance_id","inventory_item_unit_id","maintenance_person_id")
);

-- CreateTable
CREATE TABLE "inventory_locations" (
    "id" BIGSERIAL NOT NULL,
    "office_location_id" BIGINT NOT NULL,
    "department_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "inventory_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_loans" (
    "id" BIGSERIAL NOT NULL,
    "loan_person_id" BIGINT NOT NULL,
    "loan_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "status" "LoanStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "inventory_loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_loan_details" (
    "inventory_loan_id" BIGINT NOT NULL,
    "inventory_item_unit_id" BIGINT NOT NULL,

    CONSTRAINT "inventory_loan_details_pkey" PRIMARY KEY ("inventory_loan_id","inventory_item_unit_id")
);

-- CreateTable
CREATE TABLE "inventory_reports" (
    "id" BIGSERIAL NOT NULL,
    "inventory_item_unit_id" BIGINT NOT NULL,
    "reported_by" BIGINT NOT NULL,
    "report_type" "ReportType" NOT NULL,
    "report" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "inventory_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_monthly_reports" (
    "id" BIGSERIAL NOT NULL,
    "submitted_by" BIGINT NOT NULL,
    "audited_by" BIGINT NOT NULL,
    "inventory_locations_id" BIGINT NOT NULL,
    "report_date" TIMESTAMP(3) NOT NULL,
    "total_items" INTEGER NOT NULL,
    "available_items" INTEGER NOT NULL,
    "loaned_items" INTEGER NOT NULL,
    "damaged_items" INTEGER NOT NULL,
    "maintained_items" INTEGER NOT NULL,
    "lost_items" INTEGER NOT NULL,
    "status" "MonthlyReportStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "inventory_monthly_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_audits" (
    "id" BIGSERIAL NOT NULL,
    "monthly_report_id" BIGINT NOT NULL,
    "audited_by" BIGINT NOT NULL,
    "audit_date" TIMESTAMP(3) NOT NULL,
    "findings" TEXT,
    "status" "AuditStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_submissions" (
    "id" BIGSERIAL NOT NULL,
    "inventory_audit_id" BIGINT NOT NULL,
    "submitted_to" BIGINT NOT NULL,
    "submission_date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audit_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerk_id_key" ON "users"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_nik_key" ON "users"("nik");

-- CreateIndex
CREATE INDEX "roles_name_deleted_at_idx" ON "roles"("name", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE INDEX "employee_positions_name_deleted_at_idx" ON "employee_positions"("name", "deleted_at");

-- CreateIndex
CREATE INDEX "employee_types_name_deleted_at_idx" ON "employee_types"("name", "deleted_at");

-- CreateIndex
CREATE INDEX "departments_name_deleted_at_idx" ON "departments"("name", "deleted_at");

-- CreateIndex
CREATE INDEX "levels_name_deleted_at_idx" ON "levels"("name", "deleted_at");

-- CreateIndex
CREATE INDEX "office_locations_name_deleted_at_idx" ON "office_locations"("name", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_items_location_id_name_key" ON "inventory_items"("location_id", "name");

-- CreateIndex
CREATE INDEX "inventory_categories_name_deleted_at_idx" ON "inventory_categories"("name", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_item_units_serial_number_key" ON "inventory_item_units"("serial_number");

-- CreateIndex
CREATE INDEX "inventory_locations_name_deleted_at_idx" ON "inventory_locations"("name", "deleted_at");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "office_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "employee_positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "employee_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_head_id_fkey" FOREIGN KEY ("head_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_has_permissions" ADD CONSTRAINT "role_has_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_has_permissions" ADD CONSTRAINT "role_has_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "inventory_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_items_has_inventory_categories" ADD CONSTRAINT "inventory_items_has_inventory_categories_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_items_has_inventory_categories" ADD CONSTRAINT "inventory_items_has_inventory_categories_inventory_categor_fkey" FOREIGN KEY ("inventory_category_id") REFERENCES "inventory_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_responsibilities" ADD CONSTRAINT "inventory_responsibilities_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_responsibilities" ADD CONSTRAINT "inventory_responsibilities_responsible_user_id_fkey" FOREIGN KEY ("responsible_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_item_units" ADD CONSTRAINT "inventory_item_units_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_maintenance_details" ADD CONSTRAINT "inventory_maintenance_details_inventory_maintenance_id_fkey" FOREIGN KEY ("inventory_maintenance_id") REFERENCES "inventory_maintenances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_maintenance_details" ADD CONSTRAINT "inventory_maintenance_details_inventory_item_unit_id_fkey" FOREIGN KEY ("inventory_item_unit_id") REFERENCES "inventory_item_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_maintenance_details" ADD CONSTRAINT "inventory_maintenance_details_maintenance_person_id_fkey" FOREIGN KEY ("maintenance_person_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_locations" ADD CONSTRAINT "inventory_locations_office_location_id_fkey" FOREIGN KEY ("office_location_id") REFERENCES "office_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_locations" ADD CONSTRAINT "inventory_locations_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_loan_details" ADD CONSTRAINT "inventory_loan_details_inventory_loan_id_fkey" FOREIGN KEY ("inventory_loan_id") REFERENCES "inventory_loans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_loan_details" ADD CONSTRAINT "inventory_loan_details_inventory_item_unit_id_fkey" FOREIGN KEY ("inventory_item_unit_id") REFERENCES "inventory_item_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_reports" ADD CONSTRAINT "inventory_reports_reported_by_fkey" FOREIGN KEY ("reported_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_monthly_reports" ADD CONSTRAINT "inventory_monthly_reports_submitted_by_fkey" FOREIGN KEY ("submitted_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_monthly_reports" ADD CONSTRAINT "inventory_monthly_reports_audited_by_fkey" FOREIGN KEY ("audited_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_monthly_reports" ADD CONSTRAINT "inventory_monthly_reports_inventory_locations_id_fkey" FOREIGN KEY ("inventory_locations_id") REFERENCES "inventory_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_audits" ADD CONSTRAINT "inventory_audits_monthly_report_id_fkey" FOREIGN KEY ("monthly_report_id") REFERENCES "inventory_monthly_reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_audits" ADD CONSTRAINT "inventory_audits_audited_by_fkey" FOREIGN KEY ("audited_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_submissions" ADD CONSTRAINT "audit_submissions_inventory_audit_id_fkey" FOREIGN KEY ("inventory_audit_id") REFERENCES "inventory_audits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_submissions" ADD CONSTRAINT "audit_submissions_submitted_to_fkey" FOREIGN KEY ("submitted_to") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
