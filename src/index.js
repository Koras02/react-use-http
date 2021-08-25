/* eslint-disable no-unused-vars */
import "./style.css";
import React, {useState,useEffect,useCallback} from 'react'
import {render} from "react-dom";
import useFetch, { Provider } from "use-http";
import {
  Button,
  Row,
  Snowflakes,
  Input,
  Loading,
  Col,
  Center

} from "./components";
 
import reportWebVitals from './reportWebVitals';
 
 
// TodoList 설정 
const TodoList = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
 
  // get post 방식 API 처럼 const
  const { get,post,response, loading, error } = useFetch({data: []});
  
   // todos 생성자 만들기
  const loadInitialTodos = useCallback(async () => {
    // const { ok } = response // 좋지 않는 방법
    // /todos 파일에 접근해서 get방식으로 가져옴
    const initailTodos = await get("/todos");
    if(response.ok) setTodos(initailTodos);

  }, [get,response]); // 배열 받아옴
 
  useEffect(() => {
    loadInitialTodos();
  }, [loadInitialTodos]); // componentDiMount 

 
  // 새로운 Todo 리스트 만들기
  const addNewTodo = useCallback(async () => {
    if (!title) return; // 만약 타이틀이없다면 항목을 추가하지않음
    // const { ok } = response // 좋지않는 방법
    // 새로운 todo == 제목과 body에 있는 제목들 받아옴
    const newTodo = await post("/todos", { title, body: title });

    if(response.ok) {
      setTitle("");

      // 목록 맨앞에 추가 
      setTodos((todos) => [newTodo, ...todos]);
    }
  }, [post,response,title]); // 배열로 받아오기



  return (
    <Snowflakes>
        <Center>
            <h1 style={{ marginBottom: 0}}>TodoList만들기</h1>
            <h3 style={{ margin: 0 }}>use-http</h3>
            <a 
              style={{margin: "4px 0 12px 0", 
              textDecoration: "none", color:"white", 
              fontWeight: "bold"}}
              target="_link"
              href="https://www.youtube.com/watch?v=_-GujYZFCKI&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=6"
           >
             유튜브 링크
            </a>
            
            <Row>
              <Input 
                 placeholder="Add todo title🔥"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 right={loading && <Loading/>}
                 />
                <Button onClick={addNewTodo}>
                  {loading ? "추가할 리스트를 입력해주세요..." : "리스트 추가"}
                </Button>
            </Row>
            <Col>
              {error && "Error!"}
              {todos.map((todo, i) => (
                <div key={i}>
                  {i + 1}. {todo.title}
                </div>
              ))}
        </Col>
        </Center>
    </Snowflakes>
  )
} 


const App = () => {
  return (
      <Provider
         url="https://jsonplaceholder.typicode.com"
        options={{ cachePolicy: "no-cache" }}
      >
          <TodoList /> 
      </Provider>
  );
}


render(<App/>, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();