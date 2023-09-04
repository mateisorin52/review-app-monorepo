import { makeAutoObservable, action } from 'mobx';
import ConfirmDialog from '../components/ConfirmDialog';

export class ReviewStore {
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
}

export const reviewStore = new ReviewStore();
