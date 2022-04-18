-- CreateTable
CREATE TABLE "launches" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "articlesId" INTEGER,

    CONSTRAINT "launches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "articlesId" INTEGER,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL,
    "newsSite" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "updatedAt" TEXT,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "launches" ADD CONSTRAINT "launches_articlesId_fkey" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_articlesId_fkey" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
