import { titles } from '@/constants';
import { customFetch } from './api/custom.fetch';
import { userManager } from './api/user.manager';
import { tokenManager } from './api/token.manager';

export const logout = async () => {
  try {
    const response = await customFetch.post(`/auth/logout`);
    if (response.status === 200) {
      const STORAGE_KEY = titles.accessToken;
      localStorage.removeItem(STORAGE_KEY);
      tokenManager.clear();
      userManager.clear();
      return true;
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const serialNo = (page: number, limit: number = 10): number => {
  const srno = !page || page <= 1 ? 1 : (page - 1) * limit + 1;
  return srno;
};

// Pagination starts ------
export const constructUrl = ({
  pageNumber,
  search,
  pathname,
}: {
  pageNumber: number;
  search: string;
  pathname: string;
}): string => {
  const searchParams = new URLSearchParams(search);
  searchParams.set('page', pageNumber.toString());
  return `${pathname}?${searchParams.toString()}`;
};

export const constructPrevOrNext = ({
  curretPage,
  pageCount,
  search,
  pathname,
}: {
  curretPage: number;
  pageCount: number;
  search: string;
  pathname: string;
}) => {
  let prevPage = curretPage - 1;
  if (prevPage < 1) prevPage = 1;
  const prevUrl = constructUrl({ pageNumber: prevPage, search, pathname });

  let nextPage = curretPage + 1;
  if (nextPage > pageCount) nextPage = pageCount;
  const nextUrl = constructUrl({ pageNumber: nextPage, search, pathname });

  return { prevUrl, nextUrl };
};
// Pagination ends ------
