import { Repository } from 'typeorm';
import { Meal } from './meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
export declare class MealsService {
    private readonly mealsRepository;
    constructor(mealsRepository: Repository<Meal>);
    findAll(): Promise<Meal[]>;
    findOne(id: string): Promise<Meal>;
    create(createMealDto: CreateMealDto, imageUrl?: string): Promise<Meal>;
    update(id: string, updateMealDto: UpdateMealDto, imageUrl?: string): Promise<Meal>;
    remove(id: string): Promise<void>;
    seed(): Promise<void>;
}
