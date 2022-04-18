-- CreateEnum
CREATE TYPE "launchesType" AS ENUM ('id', 'provider');

-- CreateEnum
CREATE TYPE "eventsType" AS ENUM ('id', 'provider');

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL,
    "newsSite" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "launches" "launchesType"[],
    "events" "eventsType"[],

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);
