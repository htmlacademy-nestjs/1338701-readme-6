/*
  Warnings:

  - A unique constraint covering the columns `[post_video_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_link_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_quote_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_photo_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_text_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "posts_post_video_id_key" ON "posts"("post_video_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_link_id_key" ON "posts"("post_link_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_quote_id_key" ON "posts"("post_quote_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_photo_id_key" ON "posts"("post_photo_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_text_id_key" ON "posts"("post_text_id");
