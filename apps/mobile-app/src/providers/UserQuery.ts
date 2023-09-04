import { useQuery, UseQueryResult } from 'react-query';
import { User } from '@prisma/client';
export const useGetSelf = (filters?: any) => {
  let filtersString = 'user/self';
  const resp = useQuery(filtersString, {
    enabled: true,
  }) as UseQueryResult<User>;

  return resp;
};
