-- CreateTable
CREATE TABLE "token_transaction" (
    "id" TEXT NOT NULL,
    "type" INTEGER,
    "address" TEXT,
    "hash" TEXT,
    "user_id" TEXT,
    "amount" BIGINT,
    "token_amount" BIGINT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_transaction_hash_key" ON "token_transaction"("hash");
