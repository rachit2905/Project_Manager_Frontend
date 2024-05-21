import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMessages, sendMessage } from "@/Redux/Chat/Action";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const Chatbox = () => {
  const { auth, project, chat } = useSelector((store) => store);
  const [messagess, setMessagess] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatMessages(project.projectDetails?.id));
  }, [project.projectDetails]);

  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        senderId: auth.user?.id,
        projectId: project.projectDetails?.id,
        content: messagess,
      })
    );
    console.log(messagess);
    setMessagess("");
  };
  const handleMessageChange = (e) => {
    setMessagess(e.target.value);
  };
  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {chat.messages?.map((mess, index) =>
            mess?.sender?.id !== auth.user.id ? (
              <div
                className="flex gap-2 mb-2 justify start"
                key={mess.id}
                item={mess}
              >
                <Avatar>
                  <AvatarFallback>{mess.sender?.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-s-xl">
                  <p>{mess.sender?.fullName}</p>
                  <p className="text-gray-300">{mess.content}</p>
                </div>
              </div>
            ) : (
              <div
                className="flex gap-2 mb-2 justify-end"
                key={mess.id}
                item={mess}
              >
                <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-e-xl">
                  <p>{mess.sender?.fullName}</p>
                  <p className="text-gray-300">{mess.content}</p>
                </div>
                <Avatar>
                  <AvatarFallback>{mess.sender?.fullName[0]}</AvatarFallback>
                </Avatar>
              </div>
            )
          )}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            value={messagess}
            className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            onChange={handleMessageChange}
            placeholder="Type Your Message Here..."
          ></Input>
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon></PaperPlaneIcon>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
