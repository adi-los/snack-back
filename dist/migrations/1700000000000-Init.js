"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1700000000000 = void 0;
class Init1700000000000 {
    name = 'Init1700000000000';
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
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
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "meals"`);
    }
}
exports.Init1700000000000 = Init1700000000000;
//# sourceMappingURL=1700000000000-Init.js.map