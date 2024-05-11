/*
  Warnings:

  - You are about to drop the column `reposted_by` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "reposted_by",
ADD COLUMN     "is_repost" BOOLEAN NOT NULL DEFAULT false;
