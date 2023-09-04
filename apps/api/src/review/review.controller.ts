import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
