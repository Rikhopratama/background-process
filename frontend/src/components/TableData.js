import { Button, Colors, Progress } from 'react-foundation';

const TableData = (props) => {
  return (
    <>
    <table>
      <thead>
        <tr>
          <th width="50">Number</th>
          <th>Content</th>
          <th width="150">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Send email to all clients (430 users)</td>
          <td>
            <Button color={Colors.PRIMARY} onClick={() => props.handleButtonClick('email')} isDisabled={props.btnEmailDisabled}>Send Email</Button>
            <Progress tabIndex="0" value={props.pbEmail} />
            {
              props.msgEmail.message &&
              <p style={{ fontWeight: 'bolder', color: props.msgEmail.success ? "green" : "red" }}>{props.msgEmail.message}</p>
            }
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Delete all inactive data (12500 datas)</td>
          <td>
            <Button color={Colors.ALERT} onClick={() => props.handleButtonClick('remove')} isDisabled={props.btnRemoveDisabled}>Remove</Button>
            <Progress tabIndex="0" value={props.pbDelete} />
            {
              props.msgRemove.message &&
              <p style={{ fontWeight: 'bolder', color: props.msgRemove.success ? "green" : "red" }}>{props.msgRemove.message}</p>
            }
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Flushing All Redis Cache (1410 rows)</td>
          <td>
            <Button color={Colors.WARNING} onClick={() => props.handleButtonClick('flush')} isDisabled={props.btnFlushDisabled}>Redis Flush</Button>
            <Progress tabIndex="0" value={props.pbFlush} />
            {
              props.msgFlush.message &&
              <p style={{ fontWeight: 'bolder', color: props.msgFlush.success ? "green" : "red" }}>{props.msgFlush.message}</p>
            }
          </td>
        </tr>
      </tbody>
    </table>
    </>
  );
}

export default TableData;