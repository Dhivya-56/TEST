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

        setPosts(posts.map((post) =>
          post.id === id ? { ...post, title: posts.title, body: posts.body } : post
        ));


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
      <div className="Content_display">
        <button onClick={() => setPopBut(true)} className="Add_post_butn">ADD POST</button>
        <p className='Num_of_data'>No of Datas:{posts.length}</p>
        {popBut ? (
          <Popup trigger={popBut} setTrigger={setPopBut} className="POP">
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
        ) : (
          <div className="save_post">
            {
              posts.map((mypost) => (
                <div className="display_data" key={mypost.id}>
                  {updateId === mypost.id ? (

                    <div className="align_update_box">
                      <input
                      className='save_input'
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
                        className='save_input'
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
                   
                      <button onClick={() => updatePost(mypost.id, mypost.title, mypost.body)} className='save_btn'>Save</button>

                  </div>

                  ) : (

                    <div className="datas">
                      <div className="title_body">
                      <h3>{mypost.title}</h3>
                      <p>{mypost.body}</p>
                      </div>
                      <div className='update_delete_btn'>
                      <button onClick={() => setUpdateId(mypost.id)} className='update_btn'>Update</button>
                      <button onClick={() => deletePost(mypost.id)} className='delete_btn'>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            }
          </div>

        )}

      </div>
    </>
  );
};

export default Api;
