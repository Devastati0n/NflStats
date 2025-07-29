/*
  Warnings:

  - You are about to drop the column `city` on the `Team` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "conference" TEXT NOT NULL,
    "division" TEXT NOT NULL
);
INSERT INTO "new_Team" ("conference", "division", "id", "logoUrl", "name") SELECT "conference", "division", "id", "logoUrl", "name" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
