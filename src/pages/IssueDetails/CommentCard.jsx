import { deleteComment } from "@/Redux/Comment/Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CommentCard = ({ item }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const handleDeleteComment = () => {
    dispatch(deleteComment({ commentId: item.id, userId: auth.user?.id }));
  };
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>{item.user?.fullName[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 ">
          <p>{item.user?.fullName}</p>
          <p>{item.content}</p>
        </div>
      </div>
      <Button
        className="rounded-full"
        variant="ghost"
        size="icon"
        onClick={handleDeleteComment}
      >
        <TrashIcon></TrashIcon>
      </Button>
    </div>
  );
};

export default CommentCard;
