/*
  Warnings:

  - A unique constraint covering the columns `[ticker]` on the table `token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "token_ticker_key" ON "token"("ticker");
