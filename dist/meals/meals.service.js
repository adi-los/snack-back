"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const meal_entity_1 = require("./meal.entity");
let MealsService = class MealsService {
    mealsRepository;
    constructor(mealsRepository) {
        this.mealsRepository = mealsRepository;
    }
    async findAll() {
        return this.mealsRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const meal = await this.mealsRepository.findOne({ where: { id } });
        if (!meal) {
            throw new common_1.NotFoundException(`Meal with id "${id}" not found`);
        }
        return meal;
    }
    async create(createMealDto, imageUrl) {
        const meal = this.mealsRepository.create({
            ...createMealDto,
            ...(imageUrl !== undefined ? { imageUrl } : {}),
        });
        return this.mealsRepository.save(meal);
    }
    async update(id, updateMealDto, imageUrl) {
        const meal = await this.findOne(id);
        const updated = Object.assign(meal, {
            ...updateMealDto,
            ...(imageUrl ? { imageUrl } : {}),
        });
        return this.mealsRepository.save(updated);
    }
    async remove(id) {
        const meal = await this.findOne(id);
        await this.mealsRepository.remove(meal);
    }
    async seed() {
        const count = await this.mealsRepository.count();
        if (count > 0)
            return;
        const meals = [
            {
                name: 'Truffle Burger Deluxe',
                description: 'Angus beef patty with black truffle aioli, caramelised onions, aged cheddar and brioche bun',
                price: 18.9,
                category: 'Burgers',
                imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
                available: true,
            },
            {
                name: 'Grilled Salmon Bowl',
                description: 'Atlantic salmon over jasmine rice with mango salsa, avocado cream and sesame glaze',
                price: 22.5,
                category: 'Bowls',
                imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
                available: true,
            },
            {
                name: 'Margherita Classica Pizza',
                description: 'Wood-fired pizza with San Marzano tomato, fresh burrata, basil oil and sea salt flakes',
                price: 16.0,
                category: 'Pizza',
                imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
                available: true,
            },
            {
                name: 'Spicy Thai Noodles',
                description: 'Rice noodles wok-tossed with tiger prawns, bird-eye chili, Thai basil and tamarind broth',
                price: 19.0,
                category: 'Noodles',
                imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
                available: true,
            },
            {
                name: 'Chocolate Lava Cake',
                description: 'Warm Valrhona chocolate fondant with molten centre, vanilla bean ice cream and raspberry coulis',
                price: 11.5,
                category: 'Desserts',
                imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
                available: true,
            },
            {
                name: 'Caesar Royale Salad',
                description: 'Romaine hearts, house-made anchovy Caesar dressing, parmesan crisp, croutons and soft-boiled egg',
                price: 14.0,
                category: 'Salads',
                imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80',
                available: true,
            },
        ];
        await this.mealsRepository.save(meals);
    }
};
exports.MealsService = MealsService;
exports.MealsService = MealsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(meal_entity_1.Meal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MealsService);
//# sourceMappingURL=meals.service.js.map