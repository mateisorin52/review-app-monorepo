import {
  QueryClient,
  useMutation,
  useQuery,
  UseQueryResult,
} from 'react-query';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
//10.0.2.2 - gateway to the host machine (mac)
const DEV_BASE_URL = 'http://10.0.2.2:3000';
const DOMAIN_PROD_URL = 'https://review-app.evoware-software.ro';
const BASE_URL = /*  process.env.NODE_ENV === 'production' ? DOMAIN_PROD_URL : */ DOMAIN_PROD_URL;
export const mainQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError(err) {
        console.log(err);
      },
      retry: false,
      queryFn: async ({ queryKey: [url] }) => {
        const { getItem } = useAsyncStorage('access_token');
        const token = await getItem();

        if (typeof url === 'string') {
          const res = await fetch(`${BASE_URL}/${url.toLowerCase()}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok && res.status === 401) {
            return null;
          }

          if (!res.ok && res.status === 500) {
            return undefined;
          }

          return await res.json();
        }
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  },
});
interface RequestOptions<Data, Error> {
  endpoint: string;
  body?: Data;
  onError?: (error: Error) => void;
  onSuccess?: (data: any) => void;
}

export function usePost<Data, Error = unknown>(errorHandle?: Function) {
  const { getItem } = useAsyncStorage('access_token');
  const [token, setToken] = useState('');
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await getItem();
        setToken(storedToken);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getToken();
  }, [getItem]);

  return useMutation(
    async ({ endpoint, body, onError }: RequestOptions<Data, Error>) => {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData: Error = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      return data;
    },
    {
      onError: (error: Error) => {
        errorHandle(error);
      },
      onSuccess: (data) => {
        // console.log(data);
      },
    }
  );
}

export function usePatch<Data, Error = unknown>(errorHandle: Function) {
  const { getItem } = useAsyncStorage('access_token');
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await getItem();
        setToken(storedToken);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getToken();
  }, [getItem]);

  return useMutation(
    async ({ endpoint, body, onError }: RequestOptions<Data, Error>) => {
      console.log(`${BASE_URL}/${endpoint}`);
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData: Error = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      return data;
    },
    {
      onError: (error: Error) => {
        errorHandle(error);
      },
      onSuccess: (data) => {
        // console.log(data);
      },
    }
  );
}
