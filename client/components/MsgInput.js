import {useRef} from 'react';
import styled from 'styled-components';

const Form = styled.form`

display: flex;
justify-content: center;


margin: 0;
width:80%;

padding-left: 40px;
textarea {
   
flex-grow: 1;
}
button {
    
}

`;


function MsgInput ({mutate,text='',id=''}){
    const textRef = useRef(null);

    const onSubmit = e =>{
        e.preventDefault()
        e.stopPropagation()
        const text = textRef.current.value
        textRef.current.value = '' 
        mutate(text,id)
       
    }
    return (
        <Form onSubmit={onSubmit}>
           <textarea ref = {textRef} defaultValue={text} placeholder="please write here"/>
            <button type="submit">Add</button>
        </Form>
    )

}
export default MsgInput;