/*
  Warnings:

  - You are about to drop the column `cost_amount` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `token_id` on the `transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoster` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_from_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_to_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_token_id_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "cost_amount",
DROP COLUMN "from",
DROP COLUMN "token_id",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "amount" TEXT,
ADD COLUMN     "hoster" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER,
ALTER COLUMN "token_amount" DROP NOT NULL,
ALTER COLUMN "token_amount" SET DATA TYPE TEXT,
ALTER COLUMN "to" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "token_address_key" ON "token"("address");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_address_fkey" FOREIGN KEY ("address") REFERENCES "token"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_hoster_fkey" FOREIGN KEY ("hoster") REFERENCES "user"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
