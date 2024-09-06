import { Button } from '@mui/material';
import React, {  useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import * as data from '../../apis/data';
import { LoginContext } from '../../contexts/LoginContextProvider';


const Channel = (prop) => {
    const { code, name, creator, channelList, setChannelList} = prop;   
    const [attendee, setAttendee] = useState([]);
    const navigate = useNavigate();
    const { userInfo, getMsg, stompClient, flag, setFlag} = useContext(LoginContext);
    
    useEffect(()=>{
        getAttendees();
    }, []);
    

   
    const getAttendees = async () => {
        const response = await data.attendeeList(code);
        setAttendee(response.data);
   }


   // 채팅방 삭제
   const deleteChatRoom = async () => {
        const result = await data.del({code: code, username: userInfo.username});

        if(result.status === 200){
            console.log(channelList);
            setChannelList(channelList.filter(x => x.code !== code));
            console.log("삭제가 완료됨");
        }else if(result.status === 204){
            console.log("권한이없음");
        }
        else{
            window.alert("에러발생");
        }

      
    }

    // 채팅방 나가기
    const exitChatRoom = async () => {
        const result =  await data.exit({username: userInfo.username, code: code});

        if(result.status === 200){
            setChannelList(channelList.filter(x => x.code !== code));
            console.log("나가기완료");
        }else{
            window.alert("에러발생");
        }
    }
    // 구독하기
    const subRoom = (x) => {
        const {id} = stompClient.current.subscribe(`/sub/${x.code}`, (m) => {
                const msg = JSON.parse(m.body);
                if(msg.type === "file")
                    setFlag(!flag);
                getMsg(x);
            });
        
        console.log(`subId : ${id}`);
      }

    const move = async () => {
        await getMsg({ code: code, username: userInfo.username });
        subRoom({ code: code, username: userInfo.username });
        navigate('/chat', {state:{name: name, code: code}});
    }
    
   
    return (
        <div className='channel'>
            <div className = 'chatting-index'>
                {`${name} 채팅방`}
                <div className='channel-info'>
                    <PersonIcon sx={{marginBottom: "5%"}}/>
                    <div>{attendee && attendee.length}</div>
                </div>
            </div>
                
            
            <div className='channel-btn'>
                {
                    creator === userInfo.username ? 
                    <Button variant="contained" size="small" sx={{backgroundColor: "red"}}
                        onClick={() => {
                            deleteChatRoom();
                        }}>
                        삭제
                    </Button>
                    :
                    <Button variant="contained" size="small" sx={{backgroundColor: "red"}}
                    onClick={() => {
                        exitChatRoom();
                    }}>
                    나가기
                    </Button>

                }

                <Button variant="contained" size="small" 
                     onClick={() => {
                            move();
                        }}>
                        입장
                </Button>
            </div>
        </div>
    );
};

export default Channel;