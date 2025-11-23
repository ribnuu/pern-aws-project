import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { chatAddMessageApi, chatGetSingleChatApi } from "../../apis/ChatApi";

const home = () => {
  const [refresh, setRefresh] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const insertResponse = chatAddMessageApi(formData);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };
  const userId = 24;
  const params = useParams();
  const { chatId } = params;

  const [messageData, setMessageData] = useState([]);

  const [formData, setFormData] = useState({
    message: "",
    userId: userId,
    chatId: chatId,
  });

  const fetchChats = async () => {
    const data = chatGetSingleChatApi(chatId);
    setMessageData(data);
  };
  useEffect(() => {
    fetchChats();
  }, [refresh]);

  return (
    <div class="container mx-auto">
      <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div class="border-r border-gray-300 lg:col-span-1">
          <div class="mx-3 my-3">
            <div class="relative text-gray-600">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  class="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required
              />
            </div>
          </div>
        </div>
        <div class="lg:col-span-2 lg:block">
          <div class="w-full">
            <div class="relative flex items-center p-3 border-b border-gray-300">
              <img
                class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                alt="username"
              />
              <span class="block ml-2 font-bold text-gray-600">Emma</span>
              <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>
            <div class="relative w-full p-6 grid gap-2 overflow-y-auto">
              {messageData.map((data, key) => {
                let style =
                  "bg-blue-300 border-2 rounded-r-xl rounded-b-lg w-max text-left px-2 py-1";
                let usernamestyle = "text-xs text-left";
                let contentStyle = "text-left text-lg";
                if (data.sender_id === userId) {
                  style =
                    "bg-green-300 rounded-l-xl rounded-b-lg w-max place-self-end px-2 py-1";
                  usernamestyle = "text-xs text-right";
                  contentStyle = "text-lg text-right";
                }
                return (
                  <div className="w-full grid ">
                    <div key={key} className={style}>
                      <div className={usernamestyle}>{data.username}</div>
                      <div className={contentStyle}>{data.content}</div>
                      <div className="text-xs">{data.created_at}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="chatId" value={chatId} id="" />
              <input type="hidden" name="userId" value={userId} id="" />
              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>
                <button type="submit">
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
