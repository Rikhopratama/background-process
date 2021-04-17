import { Callout, Colors } from 'react-foundation';

const ListConnectedUsers = ({ connectedUsers }) => {
  return (
    <Callout color={Colors.WARNING}>
      <p>List of connected users:</p>
      <ul>
        {
          connectedUsers && Object.keys(connectedUsers).map(key => (
            <li key={key}>[{key}] - [{connectedUsers[key]}] </li>
          ))
        }
      </ul>
    </Callout>
  )
}

export default ListConnectedUsers;
