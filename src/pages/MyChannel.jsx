import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Channel from '../components/Channel/Channel';
import '../components/Channel/Channel.css';
import * as data from '../apis/data';
import { LoginContext } from '../contexts/LoginContextProvider';
const MyChannel = () => {
    const [ channelList, setChannelList ] = useState([]);
    const { userInfo, isLogin, inviteCard} = useContext(LoginContext);
    useEffect(  ()=>{
        getChannelList();
        console.log("초대장 변경");
        console.log(inviteCard);
    }, [inviteCard]);

    const getChannelList = async () => {
        console.log(inviteCard);
        const response = await data.channelList(userInfo.username);
        setChannelList([...(response.data)]);
    }
    return (
        <>
            {
                isLogin &&
                <div className="container">
                    <Sidebar/>
                
                    <div className=' content jua-regular'>
                        <div className='head'>My Channel</div>
                        <div className='channel-list'>
                            {channelList && channelList.map(e => (<Channel key={e.id} code={e.code} name={e.name}
                            creator={e.creator.username} channelList={channelList} setChannelList={setChannelList}/>)) }
                        </div>
                    </div>
                
                </div>
            }
        </>
        
    );
};

export default MyChannel;