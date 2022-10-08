import * as React from 'react';
import * as emptyIcon from '../../../../../sharepoint/assets/empty.jpg';

const Empty: React.FC = () => {
    
    return (
        <div className='empty-container'>
            <img src={emptyIcon} alt='' />
            <h1 style={{margin: '0'}}>NOTHING!</h1>
            <p style={{margin: '0 0 25px 0'}}>This item is not shared with any one</p>
        </div>
    ) 
}

export default Empty