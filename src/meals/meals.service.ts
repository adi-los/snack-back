import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealsRepository: Repository<Meal>,
  ) {}

  async findAll(): Promise<Meal[]> {
    return this.mealsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Meal> {
    const meal = await this.mealsRepository.findOne({ where: { id } });
    if (!meal) {
      throw new NotFoundException(`Meal with id "${id}" not found`);
    }
    return meal;
  }

  async create(createMealDto: CreateMealDto, imageUrl?: string): Promise<Meal> {
    const meal = this.mealsRepository.create({
      ...createMealDto,
      ...(imageUrl !== undefined ? { imageUrl } : {}),
    });
    return this.mealsRepository.save(meal);
  }

  async update(
    id: string,
    updateMealDto: UpdateMealDto,
    imageUrl?: string,
  ): Promise<Meal> {
    const meal = await this.findOne(id);
    const updated = Object.assign(meal, {
      ...updateMealDto,
      ...(imageUrl ? { imageUrl } : {}),
    });
    return this.mealsRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const meal = await this.findOne(id);
    await this.mealsRepository.remove(meal);
  }

  async seed(): Promise<void> {
    const count = await this.mealsRepository.count();
    if (count > 0) return;

    const meals = [
      {
        name: 'Truffle Burger Deluxe',
        description:
          'Angus beef patty with black truffle aioli, caramelised onions, aged cheddar and brioche bun',
        price: 18.9,
        category: 'Burgers',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
        available: true,
      },
      {
        name: 'Grilled Salmon Bowl',
        description:
          'Atlantic salmon over jasmine rice with mango salsa, avocado cream and sesame glaze',
        price: 22.5,
        category: 'Bowls',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
        available: true,
      },
      {
        name: 'Margherita Classica Pizza',
        description:
          'Wood-fired pizza with San Marzano tomato, fresh burrata, basil oil and sea salt flakes',
        price: 16.0,
        category: 'Pizza',
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
        available: true,
      },
      {
        name: 'Spicy Thai Noodles',
        description:
          'Rice noodles wok-tossed with tiger prawns, bird-eye chili, Thai basil and tamarind broth',
        price: 19.0,
        category: 'Noodles',
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
        available: true,
      },
      {
        name: 'Chocolate Lava Cake',
        description:
          'Warm Valrhona chocolate fondant with molten centre, vanilla bean ice cream and raspberry coulis',
        price: 11.5,
        category: 'Desserts',
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
        available: true,
      },
      {
        name: 'Caesar Royale Salad',
        description:
          'Romaine hearts, house-made anchovy Caesar dressing, parmesan crisp, croutons and soft-boiled egg',
        price: 14.0,
        category: 'Salads',
        imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80',
        available: true,
      },
    ];

    await this.mealsRepository.save(meals as Meal[]);
  }
}
