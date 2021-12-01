import {MigrationInterface, QueryRunner} from "typeorm";

export class laureates1638374807279 implements MigrationInterface {
    name = 'laureates1638374807279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "affiliation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "city" varchar, "country" varchar)`);
        await queryRunner.query(`CREATE TABLE "prize" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "motivation" text NOT NULL, "share" integer NOT NULL, "year" integer NOT NULL, "laureateId" integer)`);
        await queryRunner.query(`CREATE TABLE "laureate" ("id" integer PRIMARY KEY NOT NULL, "firstname" varchar NOT NULL, "surname" varchar, "born" varchar, "bornCity" varchar, "bornCountry" varchar, "bornCountryCode" varchar, "died" varchar, "diedCity" varchar, "diedCountry" varchar, "diedCountryCode" varchar, "gender" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "prize_affiliations_affiliation" ("prizeId" integer NOT NULL, "affiliationId" integer NOT NULL, PRIMARY KEY ("prizeId", "affiliationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c783a12c6d45e98655054bb1e3" ON "prize_affiliations_affiliation" ("prizeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_27b3fde5b278011b4522748b6e" ON "prize_affiliations_affiliation" ("affiliationId") `);
        await queryRunner.query(`CREATE TABLE "temporary_prize" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "motivation" text NOT NULL, "share" integer NOT NULL, "year" integer NOT NULL, "laureateId" integer, CONSTRAINT "FK_3e9bfd5a4d89606c3df7c6f7e3d" FOREIGN KEY ("laureateId") REFERENCES "laureate" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_prize"("id", "category", "motivation", "share", "year", "laureateId") SELECT "id", "category", "motivation", "share", "year", "laureateId" FROM "prize"`);
        await queryRunner.query(`DROP TABLE "prize"`);
        await queryRunner.query(`ALTER TABLE "temporary_prize" RENAME TO "prize"`);
        await queryRunner.query(`DROP INDEX "IDX_c783a12c6d45e98655054bb1e3"`);
        await queryRunner.query(`DROP INDEX "IDX_27b3fde5b278011b4522748b6e"`);
        await queryRunner.query(`CREATE TABLE "temporary_prize_affiliations_affiliation" ("prizeId" integer NOT NULL, "affiliationId" integer NOT NULL, CONSTRAINT "FK_c783a12c6d45e98655054bb1e30" FOREIGN KEY ("prizeId") REFERENCES "prize" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_27b3fde5b278011b4522748b6e8" FOREIGN KEY ("affiliationId") REFERENCES "affiliation" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("prizeId", "affiliationId"))`);
        await queryRunner.query(`INSERT INTO "temporary_prize_affiliations_affiliation"("prizeId", "affiliationId") SELECT "prizeId", "affiliationId" FROM "prize_affiliations_affiliation"`);
        await queryRunner.query(`DROP TABLE "prize_affiliations_affiliation"`);
        await queryRunner.query(`ALTER TABLE "temporary_prize_affiliations_affiliation" RENAME TO "prize_affiliations_affiliation"`);
        await queryRunner.query(`CREATE INDEX "IDX_c783a12c6d45e98655054bb1e3" ON "prize_affiliations_affiliation" ("prizeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_27b3fde5b278011b4522748b6e" ON "prize_affiliations_affiliation" ("affiliationId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_27b3fde5b278011b4522748b6e"`);
        await queryRunner.query(`DROP INDEX "IDX_c783a12c6d45e98655054bb1e3"`);
        await queryRunner.query(`ALTER TABLE "prize_affiliations_affiliation" RENAME TO "temporary_prize_affiliations_affiliation"`);
        await queryRunner.query(`CREATE TABLE "prize_affiliations_affiliation" ("prizeId" integer NOT NULL, "affiliationId" integer NOT NULL, PRIMARY KEY ("prizeId", "affiliationId"))`);
        await queryRunner.query(`INSERT INTO "prize_affiliations_affiliation"("prizeId", "affiliationId") SELECT "prizeId", "affiliationId" FROM "temporary_prize_affiliations_affiliation"`);
        await queryRunner.query(`DROP TABLE "temporary_prize_affiliations_affiliation"`);
        await queryRunner.query(`CREATE INDEX "IDX_27b3fde5b278011b4522748b6e" ON "prize_affiliations_affiliation" ("affiliationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c783a12c6d45e98655054bb1e3" ON "prize_affiliations_affiliation" ("prizeId") `);
        await queryRunner.query(`ALTER TABLE "prize" RENAME TO "temporary_prize"`);
        await queryRunner.query(`CREATE TABLE "prize" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "motivation" text NOT NULL, "share" integer NOT NULL, "year" integer NOT NULL, "laureateId" integer)`);
        await queryRunner.query(`INSERT INTO "prize"("id", "category", "motivation", "share", "year", "laureateId") SELECT "id", "category", "motivation", "share", "year", "laureateId" FROM "temporary_prize"`);
        await queryRunner.query(`DROP TABLE "temporary_prize"`);
        await queryRunner.query(`DROP INDEX "IDX_27b3fde5b278011b4522748b6e"`);
        await queryRunner.query(`DROP INDEX "IDX_c783a12c6d45e98655054bb1e3"`);
        await queryRunner.query(`DROP TABLE "prize_affiliations_affiliation"`);
        await queryRunner.query(`DROP TABLE "laureate"`);
        await queryRunner.query(`DROP TABLE "prize"`);
        await queryRunner.query(`DROP TABLE "affiliation"`);
    }

}
