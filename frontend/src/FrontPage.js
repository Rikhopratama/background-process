import { useState } from 'react';
import App from './App';

const FrontPage = () => {
  const [name, setName] = useState(null);
  const [done, setDone] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault();
    if(!name) return
    setDone(true);
  }
  
  const showInputName = () => {
    if(!done) {
      return (
        <div style={styles.container}>
        <form onSubmit={submitHandler}>
        Input Your Name:
        <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
        <input type="submit" value="Submit"/>
        </form>
        </div>
      )
    }
  };

  const showApp = () => {
    if(done) return <App name={name} />
  }

  return (
    <>
      {showInputName()}
      {showApp()}
    </>
  )
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
  }
}

export default FrontPage
