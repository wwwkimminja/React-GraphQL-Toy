
import { useState,useEffect } from 'react';
import {useRouter} from 'next/router';
import MsgItem from "./MsgItem";
import styled from 'styled-components';
import MsgInput from "./MsgInput";
import fetcher from '../fetcher';


const Container=styled.div`
width: 100vw;
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;


`

const Messages = styled.ul`
box-sizing: border-box;
width: 100%;
padding-right: 20px;
list-style: none;
margin: 0;
`;

// Mock data
// const UserIds = ['roy', 'jay'];
// const getRandomUserId = () => UserIds[Math.round(Math.random())]
// const testMsgs = Array(30).fill(0).map((_, i) => ({
//     id:`${30 -i}`,
//     userId: getRandomUserId(),
//     timestamp: 1234567890123 + (30 - i) * 1000 * 60,
//     text: `${30 - i} mock text`
// }))


function MsgList() {
    const{query} = useRouter()
    const userId= query.userId || query.userid ||''
    const [msgs, setMsgs] = useState([]);
    const [editingId,setEditingId] = useState(null);

    const onCreate = async text => {
        const newMsg= await fetcher('post','/messages',{text,userId})

        setMsgs(msgs => [newMsg, ...msgs])

    };
    
    const onUpdate = async (text,id)=>{
        const newMsg = await fetcher('put',`/messages/${id}`,{text,userId})
        if(!newMsg) throw Error('something wrong')
        setMsgs(msgs =>{
            const targetIndex = msgs.findIndex(msg=>msg.id ==id)
            if(targetIndex <0 ) return msgs
            const newMsgs = [...msgs]
            newMsgs.splice(targetIndex,1,newMsg)
            return newMsgs
        })
        setEditingId(null);
    }

    const onDelete = async id =>{
    
      
        const receivedId = await fetcher('delete',`/messages/${id}`,{params:{userId}})

        setMsgs(msgs => {
            const targetIndex = msgs.findIndex(msg => msg.id === receivedId+'')
            if(targetIndex < 0 ) return msgs
            const newMsgs = [...msgs]
            newMsgs.splice(targetIndex,1)
            return newMsgs
        })
        
    }

    const getMessages = async()=>{
        const msgs = await fetcher('get','/messages')
        setMsgs(msgs)

    }
    useEffect(()=>{
       getMessages()

    },[])

   // console.log(JSON.stringify(msgs));

    return (
        <Container>
             <h1>SIMPLE SNS</h1>
            {userId &&<MsgInput mutate={onCreate} />}
            <Messages >
                {msgs.map(msg => <MsgItem key={msg.id}{...msg} onUpdate={onUpdate} onDelete={()=>onDelete(msg.id)} isEditing ={editingId} startEdit ={()=>setEditingId(msg.id)} myId={userId}/>)}
            </Messages>
        </Container>
    );
};

export default MsgList;