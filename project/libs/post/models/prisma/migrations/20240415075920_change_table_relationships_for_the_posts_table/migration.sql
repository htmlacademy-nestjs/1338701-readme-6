/*
  Warnings:

  - You are about to drop the column `post_id` on the `posts_link` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `posts_photo` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `posts_text` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `posts_video` table. All the data in the column will be lost.
  - You are about to drop the `posts_qoute` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts_link" DROP CONSTRAINT "posts_link_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_photo" DROP CONSTRAINT "posts_photo_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_qoute" DROP CONSTRAINT "posts_qoute_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_text" DROP CONSTRAINT "posts_text_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_video" DROP CONSTRAINT "posts_video_post_id_fkey";

-- DropIndex
DROP INDEX "posts_link_post_id_key";

-- DropIndex
DROP INDEX "posts_photo_post_id_key";

-- DropIndex
DROP INDEX "posts_text_post_id_key";

-- DropIndex
DROP INDEX "posts_video_post_id_key";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "postLinkId" TEXT,
ADD COLUMN     "postPhotoId" TEXT,
ADD COLUMN     "postQuoteId" TEXT,
ADD COLUMN     "postTextId" TEXT,
ADD COLUMN     "postVideoId" TEXT;

-- AlterTable
ALTER TABLE "posts_link" DROP COLUMN "post_id";

-- AlterTable
ALTER TABLE "posts_photo" DROP COLUMN "post_id";

-- AlterTable
ALTER TABLE "posts_text" DROP COLUMN "post_id";

-- AlterTable
ALTER TABLE "posts_video" DROP COLUMN "post_id";

-- DropTable
DROP TABLE "posts_qoute";

-- CreateTable
CREATE TABLE "posts_quote" (
    "id" TEXT NOT NULL,
    "quote_content" TEXT NOT NULL,

    CONSTRAINT "posts_quote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_postVideoId_fkey" FOREIGN KEY ("postVideoId") REFERENCES "posts_video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_postLinkId_fkey" FOREIGN KEY ("postLinkId") REFERENCES "posts_link"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_postQuoteId_fkey" FOREIGN KEY ("postQuoteId") REFERENCES "posts_quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_postPhotoId_fkey" FOREIGN KEY ("postPhotoId") REFERENCES "posts_photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_postTextId_fkey" FOREIGN KEY ("postTextId") REFERENCES "posts_text"("id") ON DELETE SET NULL ON UPDATE CASCADE;
