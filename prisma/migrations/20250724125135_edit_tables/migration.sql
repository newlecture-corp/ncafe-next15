/*
  Warnings:

  - You are about to drop the column `image` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `menus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `member_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `members` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `members` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "member_id" TEXT NOT NULL,
ALTER COLUMN "is_public" SET DEFAULT false,
ALTER COLUMN "order" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "members" DROP COLUMN "image",
DROP COLUMN "is_active",
ADD COLUMN     "profile_image" TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "menu_images" ALTER COLUMN "is_default" SET DEFAULT false;

-- AlterTable
ALTER TABLE "menus" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "has_hot" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "has_ice" SET DEFAULT true,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "is_public" SET DEFAULT false;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "menu_likes" (
    "member_id" TEXT NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_likes_pkey" PRIMARY KEY ("member_id","menu_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "members_username_key" ON "members"("username");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_likes" ADD CONSTRAINT "menu_likes_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_likes" ADD CONSTRAINT "menu_likes_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
