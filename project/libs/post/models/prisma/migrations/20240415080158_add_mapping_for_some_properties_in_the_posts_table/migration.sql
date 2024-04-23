/*
  Warnings:

  - You are about to drop the column `postLinkId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `postPhotoId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `postQuoteId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `postTextId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `postVideoId` on the `posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_postLinkId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_postPhotoId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_postQuoteId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_postTextId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_postVideoId_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "postLinkId",
DROP COLUMN "postPhotoId",
DROP COLUMN "postQuoteId",
DROP COLUMN "postTextId",
DROP COLUMN "postVideoId",
ADD COLUMN     "post_link_id" TEXT,
ADD COLUMN     "post_photo_id" TEXT,
ADD COLUMN     "post_quote_id" TEXT,
ADD COLUMN     "post_text_id" TEXT,
ADD COLUMN     "post_video_id" TEXT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_video_id_fkey" FOREIGN KEY ("post_video_id") REFERENCES "posts_video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_link_id_fkey" FOREIGN KEY ("post_link_id") REFERENCES "posts_link"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_quote_id_fkey" FOREIGN KEY ("post_quote_id") REFERENCES "posts_quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_photo_id_fkey" FOREIGN KEY ("post_photo_id") REFERENCES "posts_photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_text_id_fkey" FOREIGN KEY ("post_text_id") REFERENCES "posts_text"("id") ON DELETE SET NULL ON UPDATE CASCADE;
