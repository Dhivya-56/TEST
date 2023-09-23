import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from './Popup';

const Api = () => {
  const url = 'http://localhost:3030/posts';
  const [posts, setPosts] = useState([]);
  const [popBut, setPopBut] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [updateId, setUpdateId] = useState(null); 

  useEffect(() => {
    axios.get(url).then((response) => {
      setPosts(response.data);
    });
  }, []);

  function createPost() {
    axios.post(url, newPost).then((response) => {
      setPosts([...posts, response.data]);
      setNewPost({ title: '', body: '' });
      setPopBut(false); 
    });
  }

  function updatePost(id, newTitle, newBody) {
    axios
      .put(`${url}/${id}`, {
        title: newTitle,
        body: newBody,
      })
      .then(() => {
      
        const updatedPosts = posts.map((post) =>
          post.id === id ? { ...post, posts } : post
        );
        setPosts(updatedPosts);
        setUpdateId(null);
      });
  }
  function deletePost(id) {
    axios.delete(`${url}/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  }

  return (
    <>
      <div>
        {posts.map((mypost) => (
          <div className="display_data" key={mypost.id}>
            {updateId === mypost.id ? (
             
              <div>
                <input
                  type="text"
                  placeholder="New Title"
                  value={mypost.title}
                  onChange={(e) => {
                    const updatedPosts = posts.map((post) =>
                      post.id === mypost.id ? { ...post, title: e.target.value } : post
                    );
                    setPosts(updatedPosts);
                  }}
                />
                <input
                  type="text"
                  placeholder="New Content"
                  value={mypost.body}
                  onChange={(e) => {
                    const updatedPosts = posts.map((post) =>
                      post.id === mypost.id ? { ...post, body: e.target.value } : post
                    );
                    setPosts(updatedPosts);
                  }}
                />
              <button onClick={() => updatePost(mypost.id)}>Save</button>

              </div>
            ) : (
              
              <div>
                <h3>{mypost.title}</h3>
                <p>{mypost.body}</p>
                <button onClick={() => setUpdateId(mypost.id)}>Update</button>
                <button onClick={() => deletePost(mypost.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}

        <button onClick={() => setPopBut(true)}>ADD POST</button>
        {popBut && (
          <Popup trigger={popBut} setTrigger={setPopBut}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Title
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Content
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              />
            </div>
            <button onClick={createPost}>ADD</button>
          </Popup>
        )}
      </div>
    </>
  );
};

export default Api;
