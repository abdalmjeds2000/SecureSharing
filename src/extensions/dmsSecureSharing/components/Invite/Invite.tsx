import * as React from 'react';
import Select from 'react-select'
import NewShare from '../../API/NewShare.js'

const deleteModal = () => {
    const element = document.getElementById('custom-modal-container');
    element.parentElement.remove();
}




const Invite: React.FC = () => {
    const [options, setOptions] = React.useState([
        { label: 'Akmal', value: 'akmal@123.com' },
        { label: 'User', value: 'user@123.com' },
        { label: 'Admin', value: 'admin@123.com' }
    ]);

    const [selectedOptions, setSelectedOptions] = React.useState([])
    const [message, setMessage] = React.useState('')

    const [canDownload, setCanDownload] = React.useState(false)
    const [canPrint, setCanPrint] = React.useState(false)


    const ItemDetails = JSON.parse(localStorage.getItem("SelectedRowDetails"));
    React.useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("SelectedRowDetails")))
    }, [])



    const PostNewShare = async function () {
        const data = {
            accessDetails: {
                can_print: canPrint,
                can_download: canDownload
            },
            access_mode: 1,
            dataSourceName: "SharePoint",
            emails: selectedOptions.map(e => e.value),
            files: [
                {
                    AccessDetails: {
                        can_print: canPrint,
                        can_download: canDownload
                    },
                    AccessMode: 1,
                    dataSourceName: "SharePoint",
                    ItemName: ItemDetails.Item,
                    ItemType: ItemDetails.Type,
                    Other: ItemDetails.Directory,
                    Path: `{${ItemDetails.UniqueId}}`,
                    Type: "Item"
                }
            ],
            itemtype: ItemDetails.Type,
            name: ItemDetails.Item,
            path: ItemDetails.Directory,
            share_message: message,
            user: {email: ItemDetails.UserEmail, id: ItemDetails.UserGraphId, principalId: ItemDetails.PrincipalId},
            uuid: `{${ItemDetails.UniqueId}}`,
        };
        console.log(data);
        // const response = await NewShare(data);
        // if(response.data) {
        // } else {
        //     console.log("AUTH ERROR ::: ", response);
        // }
    }




    return (
        <div className='invite-container'>
            <div className='form'>
                <form action="">
                    <div className='form-item'>
                        <label htmlFor='email'>Email Address (es)</label>
                        <Select 
                            onChange={(val: any) => setSelectedOptions(val)}
                            isMulti
                            options={options} 
                            
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='message'>Message</label>
                        <textarea rows={8} id="message" placeholder='write your message' onChange={(e) => setMessage(e.target.value)} />
                    </div>
                </form>
            </div>
            <div className='info'>
                <div className='list'>
                    <span><p>Item : </p>{ItemDetails.Item}</span>
                    <span><p>Type : </p>{ItemDetails.Type}</span>
                    <span><p>Size : </p>{ItemDetails.Size}</span>
                    <span><p>Directory : </p>{ItemDetails.Directory}</span>
                    <span><p>Created At : </p>{ItemDetails.CreatedAt}</span>
                    <span><p>Last Modified : </p>{ItemDetails.LastModified}</span>
                    <div className='options'>
                        <span><p>Options : </p></span>
                        <div className='option'>
                            <div className='checkbox-container'>
                                <input type="checkbox" id="Allow Print" name="Allow Print" checked={canPrint} onChange={e => setCanPrint(e.target.checked)} />
                                <span className="checkmark"></span>
                                <label htmlFor='Allow Print'>Allow Print</label>
                            </div>
                        </div>
                        <div className='option'>
                            <div className='checkbox-container'>
                                <input type="checkbox" id="Allow Download" name="Allow Print" checked={canDownload} onChange={e => setCanDownload(e.target.checked)} />
                                <span className="checkmark"></span>
                                <label htmlFor='Allow Download'>Allow Download</label>
                            </div>
                        </div>
                    </div>
                    <div className='btns'>
                        <button onClick={PostNewShare}>Invite</button>
                        <button onClick={deleteModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Invite