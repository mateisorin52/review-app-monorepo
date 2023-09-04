import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/PrismaService';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}
  create(createReviewDto: CreateReviewDto, userId: string) {
    return this.prisma.review.create({ data: { ...createReviewDto, user: { connect: { id: userId } } } });
  }
  async findAll(page: number) {
    const prisma = this.prisma;

    try {
      const reviews = await prisma.$transaction(async (prismaClient) => {
        const total = await prismaClient.review.count();

        const itemsPerPage = 10;
        const skip = itemsPerPage * (page - 1);
        const take = itemsPerPage;
        const totalRating = await prisma.review.aggregate({
          _avg: {
            stars: true,
          },
        });
        const avgRating = Math.ceil(totalRating._avg.stars * 10) / 10 || 0;
        const reviews = await prismaClient.review.findMany({
          include: { user: true },
          take,
          skip,
          orderBy: { createdAt: 'desc' },
        });
        const hasMore = page * itemsPerPage < total;
        return { reviews, total, hasMore, avgRating };
      });

      return reviews;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
