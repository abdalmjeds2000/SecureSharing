import * as React from 'react';
import Auth from '../../API/Auth.js';
import GetStatistics from '../../API/GetStatistics.js';

type props = {
  Id: number,
  statistics: [],
  InvitationLink: string,
  FirstEmail: string,
  RowsEmail: [],
  InvitationDate: string
}

const InvitationsRow: React.FC<props> = (props) => {

  const [statistics, setStatistics] = React.useState([]);

  const GETSharedBy = async function () {
    const response = await Auth();
    if(response.data) {
      const responseSharedBy = await GetStatistics(response?.data?.access_token, props.Id);
      if(responseSharedBy.data) {
        setStatistics(responseSharedBy.data.Data)
        console.log(responseSharedBy)
      }
    } else {
      console.log("AUTH ERROR ::: ", response);
    }
  }





  return (
        <div className='invitations-row_container'>
          <div className='invitations-row_info'>
            <img src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=S&username=${props.FirstEmail}`} title={props.FirstEmail} alt='' />
            <div>
              <div>
                <input type="text" value={props.InvitationLink} disabled />
              </div>
              <div>
                <div>
                  {
                    props.RowsEmail.map((row: any, i: number) => {
                      return (
                        <img key={i} src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=S&username=${row.Email}`} title={row.Email} alt='' />
                      )
                    })
                  }
                  | <a onClick={GETSharedBy}>Statistics</a>
                </div>
                <div><b>Invited at : </b>{props.InvitationDate}</div>
              </div>
            </div>
          </div>

          <div className='invitations-row_statistics'>
            {
              statistics.length > 0
              ? <table>
                  <tr>
                    <th>Recipient Email</th>
                    <th>View</th>
                    <th>Download</th>
                    <th>Print</th>
                  </tr>
                  {
                    statistics.map((row, i) => {
                      return (
                        <tr key={i}>
                          <td>{row.Email}</td>
                          <td>{row.View}</td>
                          <td>{row.Download}</td>
                          <td>{row.Print}</td>
                        </tr>
                      )
                    })
                  }
                </table>
              : null
            }
          </div>
        </div>
    ) 
}

export default InvitationsRow