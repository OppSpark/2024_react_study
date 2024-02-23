import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useMemo,
} from "react";

function App() {
    const [posts, setPosts] = useState([]);
    const postId = useRef(0);
    const addArticle = useCallback((title, body) => {
        writePost({ title: title, body: body });
        console.log({
            id: postId.current++,
            title: title,
            body: body,
            comment: [],
        });
    });
    const removeArticle = useCallback((id) => {
        deletePost(id);
    });
    const updateArticle = useCallback((id, title, body) => {
        putPosts({ id: id, title: title, body: body });
    });
    const addComment = useCallback((id, title, body) => {
        commentPost({ id: id, title: title, body: body });
    });

    useEffect(() => {
        fetchPosts();
        document.title = `${posts.length}개 글 존재함`;
    }, []);

    const actions = useMemo(
        () => ({
            removeArticle: removeArticle,
            updateArticle: updateArticle,
            addComment: addComment,
        }),
        [removeArticle, updateArticle, addComment]
    );

    const deletePost = (id) => {
        fetch(`http://cs-dept.esm.kr/${id}`, {
            method: "DELETE",
        }).then();
    };

    const putPosts = (posts) => {
        fetch(`http://cs-dept.esm.kr/${posts.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: upload(posts),
        });
    };

    const fetchPosts = () => {
        fetch("http://cs-dept.esm.kr", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((posts) => {
                setPosts(posts);
            });
    };

    const writePost = (newPost) => {
        fetch("http://cs-dept.esm.kr", {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: upload(newPost),
        }).then();
    };

    const commentPost = (newPost) => {
        fetch("http://cs-dept.esm.kr", {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: upload(newPost),
        }).then();
    };

    return (
        <div>
            <Input addArticle={addArticle} fetchPosts={fetchPosts} />
            <Wall posts={posts} actions={actions} />
        </div>
    );
}

function upload(data) {
    var formbody = [];
    for (var property in data) {
        var encodeKey = encodeURIComponent(property);
        var encodeValue = encodeURIComponent(data[property]);
        formbody.push(encodeKey + "=" + encodeValue);
    }
    formbody = formbody.join("&");

    return formbody;
}

function Input(props) {
    const { addArticle } = props;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = useCallback(() => {
        addArticle(title, body);

        setTitle("");
        setBody("");
    }, [addArticle, title, body]);

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
            <button Click={handleSubmit}>글 추가</button>
        </div>
    );
}
function Wall(props) {
    const { posts, actions } = props;

    return (
        <div>
            {posts.map((post) => (
                <Post key={post.id} post={post} actions={actions} />
            ))}
        </div>
    );
}
function Post(props) {
    const { post, actions } = props;
    const [isModifyMode, setIsModifyMode] = useState(false);
    const [editStr, setEditStr] = useState(post.body);

    return (
        <div>
            {}
            <h1 className="title">{post.title}</h1>
            {!isModifyMode ? (
                <p className="SNScontent">{post.body}</p>
            ) : (
                <textarea
                    className="textbox"
                    onChange={(e) => setEditStr(e.target.value)}
                >
                    {editStr}
                </textarea>
            )}
            <button
                className="delbtns"
                onClick={() => actions.removeArticle(post.id)}
            >
                삭제
            </button>
            {!isModifyMode ? (
                <button
                    className="putbtns"
                    onClick={() => setIsModifyMode(true)}
                >
                    수정
                </button>
            ) : (
                <button
                    className="putbtns"
                    onClick={() => {
                        actions.updateArticle(post.id, post.title, editStr);
                        setIsModifyMode(false);
                    }}
                >
                    수정 완료
                </button>
            )}
            <CommentBox post={post} actions={actions} />
        </div>
    );
}

function CommentBox(props) {
    const { post, actions } = props;
    const [comment, setComment] = useState("");

    const handleSubmit = useCallback(() => {
        actions.addComment(post.id, comment);
        setComment("");
    }, [actions, post.id, comment]);

    return (
        <div>
            <input
                className="snsComment"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className="snsCommnetbtn" onClick={handleSubmit}>
                댓글 추가
            </button>
            {post.comment.map((comment) => (
                <div>{comment}</div>
            ))}
        </div>
    );
}

export default App;
