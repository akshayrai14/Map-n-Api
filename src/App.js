import { useEffect, useState } from 'react';
import './App.css';
import Finder from './Finder';
import Map from './Map';
import AppContext from './AppContext';

function App() {
  const [coordinates, setCoordinates] = useState([25.3176, 82.9739]);
  return (
    <AppContext.Provider value={{ coordinates, setCoordinates }}>
    <div className='App'>
      <div className='upper-part'>
        <div className='text'>Click the button to Search a Random Place on Map...</div>
        <Finder></Finder>
      </div>
      <Map></Map>
    </div>
    </AppContext.Provider>
  );
}

export default App;
