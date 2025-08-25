import react from 'react';
import BlockPanel from './components/BlockPanel';
import CanvasArea from './components/CanvasArea';

import './App.css';

function App() {
  return (
    <div className="App" style={{ display: 'flex' }}>
      <CanvasArea/>
      <BlockPanel/>
    </div>
  );
}

export default App;
