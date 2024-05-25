import React, { useState, useRef, useEffect } from 'react';
import { FaComment } from 'react-icons/fa'; // Import de l'icône de commentaire depuis Font Awesome
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const CommentSection: React.FC = () => {
  const commentsContainerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('identity', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('identity', newMessage);
    setNewMessage('');
  }; 
  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  }, [messages]);



  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-3">
                <img src="../../public/velo.png" className="card-img" alt="Image" style={{ width: '100%', height: '400px' }}/>
              </div>
              <h5 className="card-title">Comment Section</h5>
              <div className="d-flex">
                <textarea
                  className="form-control mr-2"
                  rows={3}
                  placeholder="Write a comment..."
                  value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>
                <button
                  onClick={sendMessage}
                  className="btn btn-primary h-40 m-2"
                >
                  Post Comment
                </button>
              </div>
              <div
                ref={commentsContainerRef}
                style={{ maxHeight: '300px', overflowY: 'scroll' }} 
                className="mt-3"
              >
                {messages.map((message,index) => (
                  <div key={index} className="border-bottom pb-2 mb-2">
                    <p className="card-text">
                      <FaComment className="m-2" style={{ color: 'grey' }} /> 
                      {message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
