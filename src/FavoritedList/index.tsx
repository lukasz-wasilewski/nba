import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import { PlayerItem } from '../PlayerItem';
import { Player } from '../api';

import './style.css';

interface FavoritedListProps {
  players: Player[];
  onClickHandler: (player: Player) => void;
}

export const FavoritedList: FC<FavoritedListProps> = ({
  onClickHandler,
  players,
}) => {
  const [color, setColor] = useState('#ffffff');
  return (
    <div className='favorite-container' style={{ backgroundColor: color }}>
      <div className='background-input'>
        <span>Change background: </span>
				<input
        value={color}
        type='color'
        onChange={(e) => setColor(e.target.value)}
      />
      </div>
      <h1 className='favorite-title'>Favorite Players</h1>
      <div>
        {players.map((player) => (
          <PlayerItem
            key={player.id}
            player={player}
            onClickHandler={onClickHandler}
            render={(isHovered) => (
              <FontAwesomeIcon icon={faMinus} color={isHovered ? 'red' : 'black'} />
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritedList;
