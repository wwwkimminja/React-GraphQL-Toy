import {useRef} from 'react';
import styled from 'styled-components';


const Form = styled.form`
box-sizing: border-box;
display: flex;
width: 90%;
padding:10px;

textarea {
    flex:1 1 80%
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