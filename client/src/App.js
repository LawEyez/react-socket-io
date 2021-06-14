import { useState } from 'react';
import TimeWidget from './components/timeWidget/TimeWidget';

import './App.css'

function App() {
  const [loadClient, setLoadClient] = useState(true);
  
  return (
    <div className="App">
      <button onClick={e => setLoadClient(prevState => !prevState)}>{loadClient ? 'stop' : 'start'} client</button>
      
      {loadClient && <TimeWidget />}
    </div>
  );
}

export default App;
