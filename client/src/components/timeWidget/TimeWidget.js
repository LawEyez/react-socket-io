import { useEffect, useState } from "react";
import io from 'socket.io-client';

import './TimeWidget.css';

const ENDPOINT = 'http://localhost:5000';

const TimeWidget = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    // Create connection.
    const socket = io(ENDPOINT);

    // Listen for 'fromApi' event and set state.
    socket.on('fromApi', data => {
      setResponse(data);
    })

    // Disconnect when component unmounts.
    return () => socket.disconnect();
    
  }, [])

  return (
    <div className="time">
      <p>
        <time dateTime={response}>{response ? response : 'Loading...'}</time>
      </p>
    </div>
  )
}

export default TimeWidget