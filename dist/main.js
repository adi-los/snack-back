"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const meals_service_1 = require("./meals/meals.service");
const fs_1 = require("fs");
const path_1 = require("path");
async function bootstrap() {
    (0, fs_1.mkdirSync)((0, path_1.join)(process.cwd(), 'uploads'), { recursive: true });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
    }));
    const mealsService = app.get(meals_service_1.MealsService);
    await mealsService.seed();
    const port = process.env.PORT ?? 8000;
    await app.listen(port);
    console.log(`🚀 Restaurant API running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map