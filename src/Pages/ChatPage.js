import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        try {
            const response = await axios.get("/api/chat");
            const data = Array.isArray(response.data) ? response.data : [];
            setChats(data);
        } catch (error) {
            console.error("Error fetching chats:", error);
            setChats([]);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            {
              chats.map((chat)=>(
                <div key={chat._id}>{chat.chatName}</div>
              ))
            }
        </div>
    );
};

export default ChatPage;
