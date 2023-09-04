import { useQuery, UseQueryResult } from 'react-query';
import { Review, User } from '@prisma/client';
export interface ReviewWithUser extends Review {
  user: User;
}
export interface ReviewWithUserAndPagination {
  hasMore: boolean;
  reviews: ReviewWithUser[];
  total: number;
  avgRating: number;
}
export const useGetReviews = (filters?: { page: number }) => {
  let filtersString = 'review';
  if (filters?.page) filtersString += `?page=${filters.page}`;
  const resp = useQuery(filtersString, {
    enabled: true,
    keepPreviousData: true,
  }) as UseQueryResult<ReviewWithUserAndPagination>;
  return resp;
};
