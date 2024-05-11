-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "original_author_id" TEXT,
ADD COLUMN     "original_post_id" TEXT,
ADD COLUMN     "reposted_by" TEXT[];
