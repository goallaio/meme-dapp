/*
  Warnings:

  - You are about to drop the column `okb_to_usd` on the `price_history` table. All the data in the column will be lost.
  - You are about to drop the column `token_to_usd` on the `price_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "price_history" DROP COLUMN "okb_to_usd",
DROP COLUMN "token_to_usd";

-- CreateTable
CREATE TABLE "price_statistics" (
    "price_statistics_id" TEXT NOT NULL,
    "token_address" TEXT NOT NULL,
    "min_price" BIGINT NOT NULL,
    "max_price" BIGINT NOT NULL,
    "start_price" BIGINT NOT NULL,
    "end_price" BIGINT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_statistics_pkey" PRIMARY KEY ("price_statistics_id")
);
