import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import React from "react";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteIssue, updateIssueStatus } from "@/Redux/Issue/Action";
const IssueCard = ({ item, projectID }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleIssueDelete = () => {
    dispatch(deleteIssue(item.id));
  };
  const handleInProgressStatusUpdate = () => {
    dispatch(updateIssueStatus(item.id, "in Progress"));
  };
  const handleDoneSattusUpdate = () => {
    dispatch(updateIssueStatus(item.id, "Done"));
  };
  return (
    <Card className="rounded-md py-1 pb-2">
      <CardHeader className="py-0 pb-1">
        <div className="flex justify-between items-center">
          <CardTitle
            className="cursor-pointer"
            onClick={() => navigate(`/project/${projectID}/issue/${item.id}`)}
          >
            {item.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="rounded-full" size="icon" variant="ghost">
                <DotsVerticalIcon></DotsVerticalIcon>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleInProgressStatusUpdate}>
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDoneSattusUpdate}>
                Done
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleIssueDelete}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="flex items-center justify-between ">
          <p>FBP-{1}</p>
          <DropdownMenu className="w-[30rem] border border-red-400">
            <DropdownMenuTrigger>
              <Button
                size="icon"
                className="bg-gray-900 text-black text-white rounded-full"
              >
                <Avatar>
                  <AvatarFallback>
                    <PersonIcon></PersonIcon>
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <UserList issueDetails={item}></UserList>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
