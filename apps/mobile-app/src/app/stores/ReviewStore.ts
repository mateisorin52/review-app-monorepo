import { Review } from '@prisma/client';
import { makeAutoObservable, action } from 'mobx';
import ConfirmDialog from '../components/ConfirmDialog';

export class ReviewStore {
  selectedReview: Review;
  selectedRating: number = 1;
  page: number = 1;
  constructor() {
    makeAutoObservable(this, {
      setSelectedRating: action,
    });
  }
  setPage = (value: number) => {
    this.page = value;
  };
  setSelectedRating = (value: number) => {
    this.selectedRating = value;
  };
  setSelectedReview = (review: Review) => {
    this.selectedReview = review;
  };
}

export const reviewStore = new ReviewStore();
