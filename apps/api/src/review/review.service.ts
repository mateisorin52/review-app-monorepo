import { UseGuards, Injectable } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/JwtGuard';
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
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  async update(updateReviewDto: UpdateReviewDto, userId: string) {
    // CASL to be implemented in case of multiple requests with the same acl check
    const { id, ...updateReviewData } = updateReviewDto;
    const user = await this.prisma.user.findFirst({ where: { reviews: { some: { id: id } } } });
    if (user.id !== userId) throw new Error('You are not authorized to update this review');
    return this.prisma.review.update({ data: updateReviewData, where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
