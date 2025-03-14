-- CreateTable
CREATE TABLE "comment" (
    "comment_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reply_to_id" TEXT,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_token_id_fkey" FOREIGN KEY ("token_id") REFERENCES "token"("token_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_reply_to_id_fkey" FOREIGN KEY ("reply_to_id") REFERENCES "comment"("comment_id") ON DELETE CASCADE ON UPDATE CASCADE;
