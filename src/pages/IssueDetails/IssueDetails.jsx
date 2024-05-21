import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateCommentForm } from "./CreateCommentForm";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";
import { fetchProjectByID } from "@/Redux/Project/Action";
import { fetchComments } from "@/Redux/Comment/Action";
export const IssueDetails = () => {
  const { projectId, issueId } = useParams();
  const dispatch = useDispatch();
  const { issue, project, comment } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchProjectByID(projectId));
    dispatch(fetchComments(issueId));
  }, []);
  const handleUpdateIssueStatus = (status) => {
    dispatch(updateIssueStatus(issueId, status));
    console.log(status);
  };
  return (
    <div className="px-20 py-8 text-gray-400 flex justify-between p-10 rounded-lg">
      <ScrollArea className="h-[80vh] w-[60%]">
        <div>
          <h1 className="text-lg font-semibold text-gray-400">
            {issue.issueDetails?.title}
          </h1>
          <div className="py-5">
            <h2 className="font-semibold text-gray-400">Description</h2>
            <p className="text-gray-400 text-sm mt-3">
              {issue.issueDetails?.description}
            </p>
          </div>
          <div className="mt-5 ">
            <div className="pb-3">
              <Tabs defaultValue="Comments" className="w-[400px]">
                <TabsList className="mb-5">
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Comments">Comments</TabsTrigger>
                  <TabsTrigger value="History">History</TabsTrigger>
                </TabsList>
                <TabsContent value="All">
                  All Make Changes To Your Account Here
                </TabsContent>
                <TabsContent value="History">
                  History Change Your Pasword Here
                </TabsContent>
                <TabsContent value="Comments">
                  <CreateCommentForm issueId={issueId}></CreateCommentForm>
                  <div className="mt-8 space-y-6">
                    {comment.comments?.map((Comment) => (
                      <CommentCard
                        key={Comment.id}
                        item={Comment}
                      ></CommentCard>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="w-full lg:w-[30%] space-y-2">
        <Select onValueChange={handleUpdateIssueStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="To Do" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
        <div className="border rounded-lg">
          <p className="py-3 px-5 border-b">Details</p>
          <div className="p-5">
            <div className="space-y-7">
              {" "}
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Assignee</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 text-xs">
                    <AvatarFallback>
                      {issue.issueDetails?.assignee?.fullName == null
                        ? null
                        : issue.issueDetails?.assignee?.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p>
                    {issue.issueDetails?.assignee?.fullName == null
                      ? "Unassigned"
                      : issue.issueDetails?.assignee?.fullName}
                  </p>
                </div>
              </div>
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Labels</p>
                <div className="flex items-center gap-3">
                  <p>None</p>
                </div>
              </div>
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Status</p>
                <div className="flex items-center gap-3">
                  <Badge>{issue.issueDetails?.status}</Badge>
                </div>
              </div>
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Release</p>
                <div className="flex items-center gap-3">
                  <p>18-05-2024</p>
                </div>
              </div>
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Reporter</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 text-xs">
                    <AvatarFallback>
                      {project.projectDetails?.owner?.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p>{project.projectDetails?.owner?.fullName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
