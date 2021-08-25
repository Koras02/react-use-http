/* eslint-disable no-unused-vars */
import "../style.css";
import React, { useState,useEffect,useCallback } from 'react'
 
import useFecth, {Provider} from 'use-http';
import {
    Snowflakes
} from '../components';
 



const Form = () => {
    const [title,setTitle] = useState(''); 
    const [todos, setTodos] = useState([]);
    const { get, post, response, loading, error} = useFecth({ data: []});


    const loadInitialTodos = useCallback(async () => {
        // const { ok } = response // 사용성이 좋지않기 때문에 X

        // get 방식으로 생성자 Todos 불러오기
        const initialTodos = await get('/todos');
        if (response.ok) setTodos(initialTodos);
        
    }, [get,response])

    // useEffect 생성했던 initial을 구성요소로 넣음
    useEffect(() => { loadInitialTodos() }, [loadInitialTodos]) 


    const addNewTodo = useCallback(async () => {
        // title 요소가 없다면 작업내용을 불러오지 못함 
        if (!title) return 
        // const { ok } = response // BAD, DO NOT DO THIS
        // post방식으로 /todos 리스트를 불러오고 title 제목과 body영역을 선택해서 가져옴
        const newTodo = await post('/todos', {title, body: title})
        if (response.ok) {
            // 통과 된다면 보여줌
            setTitle('')
            // 통과된다면 목록 첫번재부터 넣어줌
            setTodos(todos => [newTodo, ...todos])
        }
    }, [post,response,title])

    return (
      <>
        <Snowflakes>
           
        </Snowflakes>
      </>
    )
}

export default Form
