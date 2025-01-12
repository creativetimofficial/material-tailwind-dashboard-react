import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/Auth';
import { MessageSquare, Send, X } from 'lucide-react';
import { useSnackbar } from '@/hooks/SnackBar';
import { AdminApi } from '@/api';

const ChatMessage = ({ message, isOwn }) => (
  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[70%] rounded-lg p-3 ${isOwn ? 'bg-[#212121] text-white' : 'bg-gray-100'}`}>
      <p className="text-sm">{message.message}</p>
      <span className="text-xs opacity-70">
        {new Date(message.createdAt).toLocaleTimeString()}
      </span>
    </div>
  </div>
);

export const UserSupportChat = () => {
  const { account, socket } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [issue, setIssue] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [queueInfo, setQueueInfo] = useState(null);
  const { openSnackbar } = useSnackbar()
  const [showCloseChatMessage, setShowCloseChatMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const [newMessageWhileClosed, setNewMessageWhileClosed] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!socket || !account) return;

    socket.on('queueUpdate', (info) => {
      setQueueInfo(info);
    });

    socket.on('chatAccepted', (data) => {
      setQueueInfo(null);
      setSessionId(data.sessionId);
    });

    socket.on('newMessage', (message) => {
      if (isOpen === false && newMessageWhileClosed === false) {
        setNewMessageWhileClosed(true);
      }

      setMessages(prev => [...prev, message]);
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    });

    socket.on('chatClosed', () => {
      openSnackbar('Chat has been closed', 'info')
      setShowCloseChatMessage(true);
      setNewMessageWhileClosed(false);
    });

    return () => {
      socket.off('queueUpdate');
      socket.off('chatAccepted');
      socket.off('newMessage');
      socket.off('chatClosed');
    };
  }, [socket, account]);

  const handleStartChat = () => {
    if (!issue.trim()) return;
    console.log(issue)
    socket.emit('requestSupport', {
      userId: account._id,
      issue
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !sessionId) return;
    console.log("🚀 ~ handleSendMessage ~ sessionId", typeof sessionId)
    const message = {
      sessionId,
      senderId: account._id,
      message: newMessage.trim()
    };

    socket.emit('chatMessage', message);

    setNewMessage('');
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const closeChat = () => {
    setIsOpen(false);
    setSessionId(null);
    setMessages([]);
    setQueueInfo(null);
    setShowCloseChatMessage(false);
  }

  const openChat = () => {
    setIsOpen(true);
    setNewMessageWhileClosed(false);
  }

  const closeChatModal = () => {
    setIsOpen(false);
    setNewMessageWhileClosed(false);
  }


  return (
    <>
      {!isOpen ? (
        <button
          onClick={openChat}
          className={`fixed bottom-4 right-4 bg-[#212121] hover:bg-[#414141] transition rounded-full text-white p-4 shadow-lg ${newMessageWhileClosed ? "animate-bounce" : ""}`}
        >
          <MessageSquare />
          {newMessageWhileClosed && <span className='absolute -top-1 -right-1 z-2 w-3 h-3 bg-red-500 rounded-full' />}
        </button>
      ) : (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
          <div className="p-4 bg-[#212121] text-white rounded-t-lg flex justify-between items-center">
            <h3>Support Chat</h3>
            <button disabled={showCloseChatMessage} style={showCloseChatMessage ? { cursor: "not-allowed" } : {}} onClick={closeChatModal}>
              <X />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {!sessionId ? (
              <div className="space-y-4">
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Describe your issue..."
                  className="w-full p-2 border rounded"
                  rows={4}
                />
                <button
                  onClick={handleStartChat}
                  className="w-full bg-[#212121] text-white p-2 rounded"
                >
                  Start Chat
                </button>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <ChatMessage
                    key={idx}
                    message={msg}
                    isOwn={msg.sender === account._id}
                  />
                ))}
                {showCloseChatMessage && (
                  <div className="text-center p-4 bg-gray-100 rounded mt-4">
                    <p>Chat has been closed</p>
                    <button onClick={closeChat} className='p-2 bg-[#212121] text-white mt-3 rounded-md hover:bg-[#414141] transition'>Close Chat</button>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}

            {queueInfo && (
              <div className="text-center p-4 bg-gray-100 rounded mt-4">
                <p>Queue Position: {queueInfo.position}</p>
                <p>Estimated Wait: ~{queueInfo.estimatedWait} minutes</p>
              </div>
            )}
          </div>

          {sessionId && (
            <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={newMessage}
                disabled={showCloseChatMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded"
              />
              <button type="submit" className="bg-[#212121] text-white p-2 rounded">
                <Send size={20} />
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export const AgentSupportDashboard = () => {
  const { account, socket, auth } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!socket || !account) return;

    const fetchSessions = async () => {
      try {
        const response = await AdminApi.getRecentSupportSessions(auth);
        setSessions(response.data.activeSessions);
      } catch (error) {
        console.error('Error fetching support sessions:', error);
      }
    };

    fetchSessions()

    socket.emit('supportAgentConnect', account._id);

    socket.on('newSupportRequest', (session) => {
      setSessions(prev => [...prev, session]);
    });

    socket.on('newMessage', (message) => {
      // Check if we have an active session and the message belongs to it
      // if (activeSession && message.chatSession === activeSession.sessionId) {
      setMessages(prev => [...prev, message]);
      setTimeout(() => {
        scrollToBottom();
      }, 100);
      // }
    });

    socket.on('chatAccepted', (data) => {
    });

    socket.on('chatClosed', () => {
      // if (activeSession) {
      setChatHistory(prev => [...prev, {
        ...activeSession,
        messages: messages,
        createdAt: new Date().toISOString() // Ensure createdAt is set
      }]);
      setActiveSession(null);
      setMessages([]);
      // }
    });
    return () => {
      socket.off('newSupportRequest');
      socket.off('newMessage');
      socket.off('chatAccepted');
      socket.off('chatClosed');
    };
  }, [socket, account, activeSession]);

  const handleAcceptChat = (session) => {
    const sessionId = session._id || session.sessionId;

    socket.emit('acceptChat', {
      sessionId: sessionId,
      agentId: account._id
    });

    // After accepting the chat, join the socket room
    socket.emit('join', { sessionId: sessionId });

    setActiveSession({
      ...session,
      sessionId: sessionId
    });

    setSessions(prev => prev.filter(s => (s._id || s.sessionId) !== sessionId));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeSession) return;

    const message = {
      sessionId: activeSession.sessionId,
      senderId: account._id,
      message: newMessage.trim()
    };

    socket.emit('chatMessage', message);

    // Optimistically add message to the UI
    // setMessages(prev => [...prev, {
    //   sender: account._id,
    //   message: newMessage.trim(),
    //   createdAt: new Date().toISOString()
    // }]);

    setNewMessage('');
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const handleCloseChat = () => {
    if (!activeSession) return;

    socket.emit('closeChat', {
      sessionId: activeSession.sessionId
    });
    setActiveSession(null);
    setMessages([]);
  };

  useEffect(() => {
    console.log("🚀 ~ AgentSupportDashboard ~ chatHistory", chatHistory)
  }, [chatHistory])

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Support Queue ({sessions.length})</h2>
        <div className="space-y-2">
          {sessions.map((session) => {
            console.log("🚀 ~ AgentSupportDashboard ~ session:", session)
            return <div key={session._id || session.sessionId} className="p-3 bg-gray-100 rounded">
              <p className="font-medium">{session.userId}</p>
              <p className="text-sm text-gray-600 truncate">{session.issue}</p>
              <p className="text-xs text-gray-500">
                Waiting: {Math.floor((Date.now() - new Date(session.createdAt)) / 60000)} min
              </p>
              <button
                onClick={() => handleAcceptChat(session)}
                className="mt-2 w-full bg-[#212121] text-white p-2 rounded"
              >
                Accept Chat
              </button>
            </div>

          })}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Chat History</h2>
          <div className="space-y-2">
            {chatHistory.map((session, index) => (
              <div key={index} className="p-3 bg-red-500 rounded">
                <p className="font-medium">{session.userId}</p>
                <p className="text-xs text-gray-500">
                  {new Date(session.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {activeSession ? (
          <>
            <div className="p-4 bg-[#212121] text-white flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Chat with User</h3>
                <p className="text-sm opacity-90">Issue: {activeSession.issue}</p>
              </div>
              <button
                onClick={handleCloseChat}
                className="bg-red-400 hover:bg-red-800 duration-300 px-3 py-1 rounded"
              >
                Close Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, idx) => (
                <ChatMessage
                  key={idx}
                  message={msg}
                  isOwn={msg.sender === account._id}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded"
              />
              <button type="submit" className="bg-[#212121] text-white p-2 rounded">
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat from the queue to begin
          </div>
        )}
      </div>
    </div>
  );
};