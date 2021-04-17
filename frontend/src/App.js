import TableData from './components/TableData';
import ListConnectedUsers from './components/ListConnectedUsers';
import { useState, useEffect } from 'react';

import socket from './utils/socketio'

function App(props) {
  const [socketId, setSocketId] = useState(null);
  const [pbEmail, setPbEmail] = useState(0);
  const [pbDelete, setPbDelete] = useState(0);
  const [pbFlush, setPbFlush] = useState(0);
  const [btnEmailDisabled, setBtnEmailDisabled] = useState(false);
  const [btnRemoveDisabled, setBtnRemoveDisabled] = useState(false);
  const [btnFlushDisabled, setBtnFlushDisabled] = useState(false);
  const [msgEmail, setMsgEmail] = useState({ success: true, message: null });
  const [msgRemove, setMsgRemove] = useState({ success: true, message: null });
  const [msgFlush, setMsgFlush] = useState({ success: true, message: null });
  const [connectedUsers, setConnectedUsers] = useState(null);

  useEffect(() => {
    
    setSocketId(socket.id)
    socket.emit('user-name', props.name)

    socket.on('progress-bar-email', (data) => {
      setPbEmail(data);

      if(data === 100) {
        setBtnEmailDisabled(false);
        setMsgEmail({
          success: true,
          message: 'Success send email!'
        })
      }
    })

    socket.on('progress-bar-remove', (data) => {
      setPbDelete(data);

      if(data === 100) {
        setBtnRemoveDisabled(false);
        setMsgRemove({
          success: true,
          message: 'Success remove all inactive data!'
        })
      }
    })

    socket.on('progress-bar-flush', (data) => {
      setPbFlush(data);

      if(data === 100) {
        setBtnFlushDisabled(false);
        setMsgFlush({
          success: true,
          message: 'Success flush all redis data!'
        })
      }
    })

    socket.on('connected-users', (data) => {
      setConnectedUsers(data);
    });
   
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, [props.name])

  const handleButtonClick = (buttonName) => {
    let endpoint;

    switch (buttonName) {
      case 'email':
        if(btnEmailDisabled) return;
        setBtnEmailDisabled(true);
        setMsgEmail({ success: true, message: null })
        endpoint = 'send_email';
        break;
      case 'remove':
        if(btnRemoveDisabled) return;
        setBtnRemoveDisabled(true);
        setMsgRemove({ success: true, message: null })
        endpoint = 'remove';
        break;
      case 'flush':
        if(btnFlushDisabled) return;
        setBtnFlushDisabled(true);
        setMsgFlush({ success: true, message: null })
        endpoint = 'flush';
        break;
    
      default:
        break;
    }

    fetch(`http://localhost:4000/${endpoint}?socketId=${socketId}`)
    .then(res => res.json())
    .then(res => {
      console.log('res', res, socketId)
    })
  }

  const propsTableData = {
    handleButtonClick,
    pbEmail,
    pbDelete,
    pbFlush,
    btnEmailDisabled,
    btnRemoveDisabled,
    btnFlushDisabled,
    msgEmail,
    msgRemove,
    msgFlush,
    setPbEmail,
    setPbDelete,
    setPbFlush
    
  }
  
  return (
    <>
    <div style={styles.container}>
      <hr />
      <h1>List Of Data:</h1>
      <TableData {...propsTableData} />
    </div>
    <div style={styles.box}>
      <ListConnectedUsers connectedUsers={connectedUsers} />
    </div>
    </>
  );
}

let styles = {
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 50,
    marginRight: 50,
    marginLeft: 50,
  },
  box: {
    marginLeft: 50,
    marginTop: 50,
    fontSize: 12
  }
}


export default App;
