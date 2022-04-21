
import { useState } from 'react';
import MsgItem from "./MsgItem";
import styled from 'styled-components';
import MsgInput from "./MsgInput";

const Container=styled.div`
width: 100vw;
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: center;
`

const Messages = styled.ul`
width: 80%;
list-style: none;
`;

// Mock data
const UserIds = ['roy', 'jay'];
const getRandomUserId = () => UserIds[Math.round(Math.random())]
const testMsgs = Array(30).fill(0).map((_, i) => ({
    id:`${30 -i}`,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + (30 - i) * 1000 * 60,
    text: `${30 - i} mock text`
}))


function MsgList() {
    const [msgs, setMsgs] = useState(testMsgs);
    const [editingId,setEditingId] = useState(null);

    const onCreate = text => {
        const newMsg = {
            id: msgs.length + 1,
            userId: getRandomUserId(),
            timestamp: Date.now(),
            text: `${msgs.length} ${text}`
        }
        setMsgs(msgs => [newMsg, ...msgs])

    };
    
    const onUpdate = (text,id)=>{
        setMsgs(msgs =>{
            const targetIndex = msgs.findIndex(msg=>msg.id ==id)
            if(targetIndex <0 ) return msgs
            const newMsgs = [...msgs]
            const newMsg = {...msgs[targetIndex],text}
            newMsgs.splice(targetIndex,1,newMsg)
            return newMsgs
        })
        setEditingId(null);
    }

    const onDelete = (id)=>{
        setMsgs(msgs => {
            const targetIndex = msgs.findIndex(msg => msg.id === id)
            if(targetIndex < 0 ) return msgs
            const newMsgs = [...msgs]
            newMsgs.splice(targetIndex,1)
            return newMsgs
        })
        
    }

   // console.log(JSON.stringify(msgs));

    return (
        <Container>
             <h1>SIMPLE SNS</h1>
            <MsgInput mutate={onCreate} />
            <Messages >
                {msgs.map(msg => <MsgItem key={msg.id}{...msg} onUpdate={onUpdate} onDelete={()=>onDelete(msg.id)} isEditing ={editingId} startEdit ={()=>setEditingId(msg.id)}/>)}
            </Messages>
        </Container>
    );
};

export default MsgList;