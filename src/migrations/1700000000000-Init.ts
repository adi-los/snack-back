import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1700000000000 implements MigrationInterface {
    name = 'Init1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the extension for UUID generation if it doesn't exist
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        
        // Create the meals table safely if it doesn't already exist
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "meals" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "name" character varying(150) NOT NULL, 
                "description" text NOT NULL, 
                "price" numeric(8,2) NOT NULL, 
                "category" character varying(80) NOT NULL, 
                "image_url" character varying, 
                "available" boolean NOT NULL DEFAULT true, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "PK_meals_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "meals"`);
    }
}
