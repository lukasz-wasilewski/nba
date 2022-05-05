import React, { useState } from 'react';
import { PlayerList } from './PlayerList';
import { FavoritedList } from './FavoritedList';
import { Player } from './api';

import './App.css';

function App() {
  const [favoritedPlayers, setFavoritedPlayers] = useState<Player[]>([]);

  const selectFavoritedPlayers = (player: Player) => {
    if (favoritedPlayers.some((p) => p.id === player.id)) {
      setFavoritedPlayers(favoritedPlayers.filter((p) => p.id !== player.id));
    } else {
      setFavoritedPlayers([...favoritedPlayers, player]);
    }
  };

  return (
    <div className='App'>
      <PlayerList
        favoritePlayers={favoritedPlayers}
        onClickHandler={selectFavoritedPlayers}
      />

      <FavoritedList
        players={favoritedPlayers}
        onClickHandler={selectFavoritedPlayers}
      />
    </div>
  );
}

export default App;
