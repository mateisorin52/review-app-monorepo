import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserId } from '../decorators/UserId.decorator';
import { JwtAuthGuard } from '../auth/guards/JwtGuard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @UserId() userId: string) {
    return this.reviewService.create(createReviewDto, userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('page') page) {
    return this.reviewService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateReviewDto: UpdateReviewDto, @UserId() userId: string) {
    return this.reviewService.update(updateReviewDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
