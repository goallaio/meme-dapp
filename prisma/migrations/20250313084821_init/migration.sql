-- CreateTable
CREATE TABLE "price_history" (
    "price_history_id" TEXT NOT NULL,
    "token_address" TEXT NOT NULL,
    "origin_price" TEXT NOT NULL,
    "formatted_price" TEXT NOT NULL,
    "okb_to_usd" TEXT NOT NULL,
    "token_to_usd" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "price_history_pkey" PRIMARY KEY ("price_history_id")
);
