/*
  Warnings:

  - You are about to drop the column `contract_address` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `fixedFee` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `total_supply` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `variableFee` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `fixedFee` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `from_address` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `to_address` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `variableFee` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `from` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_from_address_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_to_address_fkey";

-- AlterTable
ALTER TABLE "token" DROP COLUMN "contract_address",
DROP COLUMN "fixedFee",
DROP COLUMN "total_supply",
DROP COLUMN "variableFee",
ADD COLUMN     "decimals" TEXT,
ADD COLUMN     "fee" TEXT,
ADD COLUMN     "from" TEXT,
ADD COLUMN     "gas_price" TEXT,
ADD COLUMN     "gas_used" TEXT,
ADD COLUMN     "to" TEXT;

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "fixedFee",
DROP COLUMN "from_address",
DROP COLUMN "to_address",
DROP COLUMN "variableFee",
ADD COLUMN     "fee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "from" TEXT NOT NULL,
ADD COLUMN     "gas_price" TEXT,
ADD COLUMN     "gas_used" TEXT,
ADD COLUMN     "to" TEXT NOT NULL,
ALTER COLUMN "current_price" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_from_fkey" FOREIGN KEY ("from") REFERENCES "user"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_to_fkey" FOREIGN KEY ("to") REFERENCES "user"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
