import * as React from 'react';
import Empty from '../Empty/Empty';
import InvitationsRow from './InvitationsRow';

const Invitations: React.FC = () => {
    const [sharedByData, setSharedByData] = React.useState(JSON.parse(localStorage.getItem("SharedByData")));
    React.useEffect(() => {
        setSharedByData(JSON.parse(localStorage.getItem("SharedByData")));
        console.log('Invitations Shared By Data', sharedByData);
    }, [])
    return (
        <div>
            {
                sharedByData.length > 0
                ? sharedByData.map((row: any, i: number) => {
                    return (
                        <InvitationsRow
                            key={i}
                            Id={row.Id}
                            statistics={[]}
                            InvitationLink={`https://salicapi.com/sharing/file/${row.Link}`}
                            FirstEmail={row.Email}
                            RowsEmail={row.Rows}
                            InvitationDate={row.Rows[0].CreatedAt}
                        />
                    )
                })
                : <Empty />
            }
        </div>
    ) 
}

export default Invitations