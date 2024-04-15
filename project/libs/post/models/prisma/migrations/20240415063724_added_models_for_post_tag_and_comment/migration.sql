-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('VIDEO', 'TEXT', 'QUOTE', 'LINK', 'PHOTO');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "title" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "likes" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_video" (
    "id" TEXT NOT NULL,
    "url_youtube" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "posts_video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_link" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "posts_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_qoute" (
    "id" TEXT NOT NULL,
    "quote_content" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "posts_qoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_photo" (
    "id" TEXT NOT NULL,
    "photo_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "posts_photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_text" (
    "id" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "posts_text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_video_post_id_key" ON "posts_video"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_link_post_id_key" ON "posts_link"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_qoute_post_id_key" ON "posts_qoute"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_photo_post_id_key" ON "posts_photo"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_text_post_id_key" ON "posts_text"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "posts_video" ADD CONSTRAINT "posts_video_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_link" ADD CONSTRAINT "posts_link_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_qoute" ADD CONSTRAINT "posts_qoute_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_photo" ADD CONSTRAINT "posts_photo_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_text" ADD CONSTRAINT "posts_text_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
