const API_PATH = 'https://www.balldontlie.io/api/v1/players';
const DEFAULT_PAGE_SIZE = 100;

type Options = {
  per_page?: number;
  page?: number;
  search?: string;
};

export type Player = {
  id: number;
  first_name: string;
	last_name: string;
};

const getQueryParameters = (options: Options = {}) => {
  let queryParams = options.per_page
    ? `per_page=${options.per_page}`
    : `per_page=${DEFAULT_PAGE_SIZE}`;
  if (options.page) {
    queryParams = `${queryParams}&page=${options.page}`;
  }
  if (options.search && options.search !== '') {
    queryParams = `${queryParams}&search=${options.search}`;
  }
  return queryParams;
};

export const getPlayers = (options?: Options) => {
  const queryParams = getQueryParameters(options);
  return fetch(`${API_PATH}?${queryParams}`).then((response) =>
    response.json()
  );
};
