import React, { FC, ReactElement, useState } from 'react';
import { Player } from '../api';

import './style.css';

interface PlayerItemProps {
  player: Player;
  onClickHandler: (player: Player) => void;
  render: (isHovered: boolean) => ReactElement;
}

export const PlayerItem: FC<PlayerItemProps> = ({
  onClickHandler,
  player,
  render,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`item-container ${isHovered ? 'hover' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        onClickHandler(player);
      }}
    >
      <div className='item-name'>
        <span className='player-name'>{player.first_name}</span>
        <span>{player.last_name}</span>
      </div>

      <div className='item-icon'>{render(isHovered)}</div>
    </div>
  );
};

export default PlayerItem;
