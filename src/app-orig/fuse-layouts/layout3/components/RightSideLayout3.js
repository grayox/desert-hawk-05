import React from 'react';
import ChatPanel from '../../shared-components/chatPanel/ChatPanel';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';

function RightSideLayout3()
{
    return (
        <React.Fragment>

            <ChatPanel/>

            <QuickPanel/>
        </React.Fragment>
    );
}

export default RightSideLayout3;
