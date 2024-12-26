"use client";

import { useAuth } from "@/context/AuthContext";
import useChatBot from "@/hooks/chatbot/useChatbot";
import useOutsideClickHandler from "@/hooks/useOutsideAlerter";
import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Form, Input, Skeleton } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MessageView from "./Message";

const ChatBot = () => {
  const [openChat, setOpenChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authData = useAuth();
  const sessionId = authData?.userInfo?.id?.toString();
  const { history, refetch, sendMessage } = useChatBot(sessionId);
  const messages = history?.data;

  const messageListRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const iconChatRef = useRef<HTMLButtonElement>(null);

  const [form] = Form.useForm();

  const messageList = useMemo(() => {
    return messages?.map((message, index) => (
      <MessageView key={index} role={message.role} content={message.content} />
    ));
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messageListRef.current?.scrollTo(0, messageListRef.current?.scrollHeight);
  }, [messageListRef]);

  const focusInput = useCallback(() => {
    form.setFieldValue("message", "");
    form.focusField("message");
  }, [form]);

  useEffect(() => {
    if (openChat) {
      scrollToBottom();
      focusInput();
    }
  }, [openChat, messages, scrollToBottom, focusInput]);

  useOutsideClickHandler(chatContainerRef, () => setOpenChat(false), [
    iconChatRef,
  ]);

  const handleSendMessage = async (values: { message: string }) => {
    setIsLoading(true);

    await sendMessage({ content: values.message, sessionId });

    refetch();

    setIsLoading(false);
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="default"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
        onClick={() => setOpenChat((prev) => !prev)}
        ref={iconChatRef}
      >
        <svg
          xmlns=" http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="border-gray-200"
          ></path>
        </svg>
      </Button>

      <div
        className={`fixed z-20 bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px] ${
          openChat ? "" : "hidden"
        } dark:bg-gray-900 shadow-lg`}
        ref={chatContainerRef}
      >
        <CloseCircleFilled
          className="float-right mb-2 cursor-pointer"
          onClick={() => setOpenChat(false)}
        />
        <div className="flex flex-col space-y-1.5 pb-2">
          <h2 className="font-semibold text-lg">Chat cùng Wildnest Bot</h2>
        </div>
        <div className="pr-4 h-[474px] overflow-y-auto" ref={messageListRef}>
          {messageList}
        </div>
        <div className="flex items-center pt-0 relative">
          <Skeleton loading={isLoading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSendMessage}
              disabled={isLoading}
              className="w-full flex items-center justify-center pt-4"
              autoComplete="off"
              size="large"
            >
              <Form.Item
                name="message"
                className="w-full rounded-md px-3 py-2 mb-0 text-sm placeholder-[#6b7280]"
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Button
                className="px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                disabled={isLoading}
              >
                Send
              </Button>
            </Form>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
