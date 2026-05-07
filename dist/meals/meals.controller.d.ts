import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
export declare class MealsController {
    private readonly mealsService;
    constructor(mealsService: MealsService);
    findAll(): Promise<import("./meal.entity").Meal[]>;
    findOne(id: string): Promise<import("./meal.entity").Meal>;
    create(dto: CreateMealDto, file?: Express.Multer.File): Promise<import("./meal.entity").Meal>;
    update(id: string, dto: UpdateMealDto, file?: Express.Multer.File): Promise<import("./meal.entity").Meal>;
    remove(id: string): Promise<void>;
}
