/*
  Warnings:

  - You are about to drop the column `price` on the `price_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "price_history" DROP COLUMN "price",
ALTER COLUMN "okb_to_usd" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "token_to_usd" SET DATA TYPE DOUBLE PRECISION;
