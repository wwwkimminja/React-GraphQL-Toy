
import styled from 'styled-components';
import MsgInput from './MsgInput';

const ItemList = styled.li`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
border: 1px solid darkgray;
border-radius: 5px;
margin-top: 5px;
width: 100%;
button{
    border-style: none;
    border:1px solid darkgray;
    border-radius: 5px;
}

div{
    width: 95%;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    & span:first-child{
        font-size: large;
        margin-right: 20px;
    }
    & span:last-child{
        font-size: small;
        align-self: flex-end;

    }
    .delBtn{
        
        color:red;
    }
    
}


`;

function MsgItem({id,userId,timestamp,text,isEditing,onUpdate,startEdit,onDelete}){


    return (
        <ItemList > 
            <div>
                <span>{userId}{' '}</span>
                <span>
                    {new Date(timestamp).toLocaleString('US',{
                        year:'numeric',
                        month:'numeric',
                        day:'numeric',
                        hour:'2-digit',
                        minute:'2-digit',
                        hour12:true, 
                    })}
                </span>
            </div>
            {isEditing === id ? <MsgInput mutate={onUpdate} id={id} text={text}/>: 
           <div>{text}</div>}
            <div><button onClick={startEdit}>Edit</button><button className='delBtn' onClick={onDelete}>Del</button></div>
        </ItemList>
       
    )

}

export default MsgItem;