-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_hoster_fkey";

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "hoster" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_hoster_fkey" FOREIGN KEY ("hoster") REFERENCES "user"("address") ON DELETE SET NULL ON UPDATE CASCADE;
