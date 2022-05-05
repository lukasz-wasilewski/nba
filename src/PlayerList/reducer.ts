import { Player } from '../api';

export type PlayerListState = {
  searchQuery: string;
  totalItems: number;
  page: number;
  players: Player[];
};

export enum ACTIONS {
  ACTION_FETCH_SUCCESSFUL = 'FETCH_SUCCESSFUL',
  ACTION_CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY',
}

export type PlayerListAction =
  | {
      type: ACTIONS.ACTION_FETCH_SUCCESSFUL;
      payload: { totalItems: number; page: number; players: Player[] };
    }
  | {
      type: ACTIONS.ACTION_CHANGE_SEARCH_QUERY;
      payload: { searchQuery: string };
    };

export const initialState = {
  searchQuery: '',
  totalItems: 0,
  page: 0,
  players: [],
};

export function init(initialState: PlayerListState) {
  return initialState;
}

export function reducer(state: PlayerListState, action: PlayerListAction) {
  switch (action.type) {
    case ACTIONS.ACTION_FETCH_SUCCESSFUL:
      return {
        ...state,
        players: [...state.players, ...action.payload.players],
        totalItems: action.payload.totalItems,
        page: action.payload.page,
      };
    case ACTIONS.ACTION_CHANGE_SEARCH_QUERY:
      return {
        ...initialState,
        searchQuery: action.payload.searchQuery,
      };
    default:
      throw new Error();
  }
}
