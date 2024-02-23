import { useContext, useReducer } from "react";
import "./App.css";
import React, {
    useState,
    useRef,
    useEffect,
    useMemo,
    useCallback,
} from "react";


function App() {
    const [posts, setPosts] = useState([]);
    const postId = useRef(0);
    const addArticle = useCallback((title, body) => {
      setPosts([...posts, {id: postId.current++, title: title, body: body, comment: []}]);
    });
    const removeArticle = useCallback((id) => {
      setPosts(posts.filter(post => post.id!== id));
    });
    const updateArticle = useCallback((id, title, body) => {
      setPosts([...posts.map(post => (post.id == id? {...post, 'title': title, 'body': body} : post))]);
    });
    const addComment = useCallback((id, comment) => {
      setPosts([...posts.map(post => (post.id == id? {...post, 'comment': [...post.comment, comment]} : post))]);
    });
  
    useEffect(() => {
      document.title = `${posts.length}개 글 존재함`
    }, [posts])
  
    const actions = useMemo(() => ({
      removeArticle: removeArticle,
      updateArticle: updateArticle,
      addComment: addComment
    }), [removeArticle, updateArticle, addComment]);
  
    return (
      <div>
        <Input addArticle={addArticle}/>
        <Wall posts={posts} actions={actions}/>
      </div>
    );
  }