-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_group_map" (
    "user_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_teacher_map" (
    "subject_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "grades" (
    "grade" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "student_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "student_group_map_user_id_group_id_key" ON "student_group_map"("user_id", "group_id");

-- CreateIndex
CREATE UNIQUE INDEX "subject_teacher_map_subject_id_teacher_id_group_id_key" ON "subject_teacher_map"("subject_id", "teacher_id", "group_id");

-- CreateIndex
CREATE UNIQUE INDEX "grades_student_id_subject_id_key" ON "grades"("student_id", "subject_id");

-- AddForeignKey
ALTER TABLE "student_group_map" ADD CONSTRAINT "student_group_map_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_group_map" ADD CONSTRAINT "student_group_map_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_teacher_map" ADD CONSTRAINT "subject_teacher_map_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_teacher_map" ADD CONSTRAINT "subject_teacher_map_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_teacher_map" ADD CONSTRAINT "subject_teacher_map_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
