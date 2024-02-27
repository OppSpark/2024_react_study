import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usernameChange, navigatorChange } from "./redux/store";
import {
    Route,
    BrowserRouter,
    useParams,
    Routes,
    Link,
    Outlet
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function encodeWWWFormUrlencoded(data) {
    var formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return formBody;
}

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPost();
    }, []);

    const addPost = (newPost) => {
        fetch("http://cs-dept.esm.kr/", {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: encodeWWWFormUrlencoded(newPost),
        }).then(loadPost);
    };
    const loadPost = () => {
        fetch("http://cs-dept.esm.kr/")
            .then((res) => res.json())
            .then((posts) => {
                setPosts(posts);
            });
    };

    const updatePost = (id, updatedTitle, updatedContent) => {
        fetch(`http://cs-dept.esm.kr/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: encodeWWWFormUrlencoded({
                id,
                title: updatedTitle,
                body: updatedContent,
            }),
        }).then(loadPost);
    };
    const deletePost = (id) => {
        fetch(`http://cs-dept.esm.kr/${id}`, {
            method: "DELETE",
        }).then(loadPost);
    };

    return (
        <div>
            <div class="container">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigator />}>
                            <Route
                                path="/"
                                element={<PostTitle posts={posts}></PostTitle>}
                            />
                            <Route
                                path="/write"
                                element={<Input onAddPost={addPost} />}
                            />

                            <Route
                                path="/post"
                                element={
                                    <Wall
                                        posts={posts}
                                        onDeletePost={deletePost}
                                        onUpdatePost={updatePost}
                                    />
                                }
                            />
                            <Route
                                path="/post/:id"
                                element={
                                    <PostDetail onDeletePost={deletePost} />
                                }
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

function Navigator() {
    const path = useSelector((state) => state.navigator.navigator);
    const dispatch = useDispatch();
    const changeNavigator = (navigator) => {
        dispatch(navigatorChange(navigator));
    };

    return (
        <div class="row g-3 align-items-center">
            <div class="col-auto">
                <button class="btn btn-warning">
                    <Link class="btn btn-warning" to="/">
                        Home
                    </Link>
                </button>
                <button class="btn btn-warning">
                    <Link class="btn btn-warning" to="/write">
                        Write
                    </Link>
                </button>
                <button class="btn btn-warning">
                    <Link class="btn btn-warning" to="/post">
                        Post
                    </Link>
                </button>
            </div>
            <Outlet />
        </div>
    );
}

function Router({ children }) {
    const path = useSelector((state) => state.navigator.navigator);

    if (path === "home") {
        return children;
    }

    return <div>router - {path}</div>;
}

function PostDetail({ idx, onDeletePost }) {
    const { id } = useParams();
    const [post, setPosts] = useState({ title: "...", body: "..." });

    const handleDelete = () => {
        onDeletePost(post.id);
        window.location.href = "/";
    };

    useEffect(() => {
        fetch(`http://cs-dept.esm.kr/${id}`)
            .then((res) => res.json())
            .then((post) => {
                setPosts(post);
            });
    }, [id]);
    return (
        <div class="card mb-2">
            <div class="card-body">
                <h1 class="card-title mb-4"> 제목 :{post.title}</h1>
                <p>내용 : {post.body}</p>
            </div>
            <button class="btn btn-danger" onClick={handleDelete}>
                삭제
            </button>
        </div>
    );
}

function PostTitle({ posts }) {
    return (
        <div>
            <ul>
                {posts.map((posts) => (
                    <li>
                        <Link to={`/post/${posts.id}`}>
                            <h3>{posts.title}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function UserBox() {
    const global_username = useSelector((state) => state.user.username);
    const dispatch = useDispatch();
    const [username, setUsername] = useState(global_username);

    const changeNickname = (newNickname) => {
        dispatch(usernameChange(newNickname));
    };

    useEffect(() => {
        if (global_username !== username) {
            setUsername(global_username);
        }
    }, [global_username]);

    return (
        <div class="row g-3 align-items-center">
            <div class="col-auto">
                <input
                    class="form-control"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div class="col-auto">
                <button
                    class="btn btn-primary"
                    onClick={() => changeNickname(username)}
                >
                    닉네임 변경
                </button>
            </div>
        </div>
    );
}

function Input({ onAddPost }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const handleSubmit = () => {
        const newPost = { title, body };
        onAddPost(newPost);
        setTitle("");
        setBody("");
        window.location.href = "/";
    };
    return (
        <div class="container">
            <div class="alert alert-secondary" role="alert">
                원하는 글을 입력해 보세요
            </div>
            <input
                class="form-control"
                type="text"
                placeholder="제목"
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                class="form-control"
                placeholder="내용"
                onChange={(e) => setBody(e.target.value)}
            />
            <br />
            <br />
            <button class="btn btn-primary" onClick={handleSubmit}>
                글 추가
            </button>
        </div>
    );
}

function Wall({ posts, onDeletePost, onUpdatePost }) {
    return (
        <div class="container">
            {posts.map((post, index) => (
                <Post
                    post={post}
                    onDeletePost={onDeletePost}
                    onUpdatePost={onUpdatePost}
                />
            ))}
        </div>
    );
}

function Post({ post, onDeletePost, onUpdatePost }) {
    const [isModifyMode, setIsModifyMode] = useState(false);
    const [editStr, setEditStr] = useState(post.body);

    const handleDelete = () => {
        onDeletePost(post.id);
    };

    const handleUpdate = () => {
        onUpdatePost(post.id, post.title, editStr);
        setIsModifyMode(false);
    };

    return (
        <div class="card mb-2">
            <div class="card-body">
                <h1 class="card-title mb-4">{post.title}</h1>
                {!isModifyMode ? (
                    <p>{post.body}</p>
                ) : (
                    <textarea
                        class="form-control"
                        value={editStr}
                        onChange={(e) => setEditStr(e.target.value)}
                    />
                )}
                <button class="btn btn-danger" onClick={handleDelete}>
                    삭제
                </button>
                {!isModifyMode ? (
                    <button
                        class="btn btn-warning"
                        onClick={() => setIsModifyMode(true)}
                    >
                        수정
                    </button>
                ) : (
                    <button class="btn btn-primary" onClick={handleUpdate}>
                        수정 완료
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
