import React, { FC, Reducer, useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PlayerItem } from '../PlayerItem';
import { getPlayers, Player } from '../api';
import {
  PlayerListState,
  PlayerListAction,
  reducer,
  initialState,
  init,
  ACTIONS,
} from './reducer';

import './style.css';

interface PlayerListProps {
  favoritePlayers: Player[];
  onClickHandler: (player: Player) => void;
}

export const PlayerList: FC<PlayerListProps> = ({
  favoritePlayers,
  onClickHandler,
}) => {
  const [state, dispatch] = useReducer<
    Reducer<PlayerListState, PlayerListAction>,
    PlayerListState
  >(reducer, initialState, init);

  const fetchData = async (pageNumber: number = 0, query?: string) => {
    const {
      meta: { current_page, total_count },
      data,
    } = await getPlayers({ page: pageNumber, search: query });
    dispatch({
      type: ACTIONS.ACTION_FETCH_SUCCESSFUL,
      payload: {
        players: data as Player[],
        page: current_page,
        totalItems: total_count,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    dispatch({
      type: ACTIONS.ACTION_CHANGE_SEARCH_QUERY,
      payload: { searchQuery: text },
    });
    fetchData(0, text);
  };

  return (
    <div className='players-container'>
      <div className='search-container'>
        <span>Search player: </span>
        <input
          className='search-input'
          value={state.searchQuery}
          onChange={handleChange}
        />
        {state.searchQuery && (
          <span
            className='clear-search'
            onClick={() => {
              dispatch({
                type: ACTIONS.ACTION_CHANGE_SEARCH_QUERY,
                payload: { searchQuery: '' },
              });
              fetchData();
            }}
          >
            x
          </span>
        )}
      </div>

      <InfiniteScroll
        dataLength={state.players.length}
        next={() => {
          fetchData(state.page + 1, state.searchQuery);
        }}
        height={'calc(100vh - 110px)'}
        hasMore={state.totalItems > state.players.length}
        loader={<h4>Loading...</h4>}
      >
        {state.players.map((player) => {
          const isFavorite = favoritePlayers.some((p) => p.id === player.id);
          return (
            <PlayerItem
              key={player.id}
              player={player}
              onClickHandler={onClickHandler}
              render={(hover) => (
                <FontAwesomeIcon
                  icon={hover || isFavorite ? faHeartSolid : faHeart}
                  color={isFavorite ? 'red' : 'black'}
                />
              )}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default PlayerList;
