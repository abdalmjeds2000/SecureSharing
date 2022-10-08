import * as React from 'react';
import { UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
import Modal from './Modal/Modal';
import Invite from './Invite/Invite';
import Invitations from './Invitations/Invitations';
import './style.css';
import { createContext } from "react";


interface AppContextInterface {shared_by_data: object, setSharedByData: any}
export const AppCtx = createContext<AppContextInterface | null>(null);


const SecureSharingModal: React.FC = () => {
    const [tabId, setTabId] = React.useState(1);

    const [sharedByData, setSharedByData] = React.useState([]);
    const sampleAppContext: AppContextInterface = {
        shared_by_data: sharedByData,
        setSharedByData
    };


    return (
        <AppCtx.Provider value={sampleAppContext}>
            <Modal
                header='Secure Sharing Item'
                description='To assign new permissions, enter user name and click on "Add User" button. And from DropDown menu, choose the proper permission scope.'
            >
                <div className='tabs'>
                    <button onClick={() => setTabId(1)} className={`btn ${tabId === 1 ? 'active' : ''}`}><UserAddOutlined /> Invite</button>
                    <button onClick={() => setTabId(2)} className={`btn ${tabId === 2 ? 'active' : ''}`}><UserSwitchOutlined /> Invitations</button>
                </div>
                <div className='selected-tab'>
                    <div style={{display: tabId === 1 ? "block" : "none"}}>
                        <Invite /> 
                    </div>
                    <div style={{display: tabId === 2 ? "block" : "none"}}>
                        <Invitations />
                    </div>
                </div>
            </Modal>
        </AppCtx.Provider>
    ) 
}

export default SecureSharingModal