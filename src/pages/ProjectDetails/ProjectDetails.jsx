import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { InviteUserForm } from "./InviteUserForm";
import IssueList from "./IssueList";
import Chatbox from "./Chatbox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProjectByID } from "@/Redux/Project/Action";
import { useParams } from "react-router-dom";
export const ProjectDetails = () => {
  const handleProjectInvitation = () => {};
  const dispatch = useDispatch();

  const id = useParams();
  useEffect(() => {
    dispatch(fetchProjectByID(id));
  }, []);
  const { project } = useSelector((store) => store);
  console.log(project);
  return (
    <>
      <div className="mt-5 lg:px-10">
        <div className="lg:flex gap-5 justify-between pb-4">
          <ScrollArea className="h-screen lg:w-[69%] pr-2">
            <div className="text-gray-400 pb-10 w-full">
              <h1 className="text-lg font-semibold pb-5">
                {project.projectDetails?.name}
              </h1>
              <div className="space-y-5 pb-10 text-sm">
                <p className="w-full md:max-w-lg:max-w-xl ">
                  {project.projectDetails?.description}
                </p>
                <div className="flex">
                  <p className="w-36">Project Lead:</p>
                  <p>{project.projectDetails?.owner?.fullName}</p>
                </div>
                <div className="flex">
                  <p className="w-36">Members:</p>

                  <div className="flex items-center gap-2">
                    {project.projectDetails?.team?.map((person) => (
                      <Avatar
                        key={person.id}
                        item={person}
                        className="cursor-pointer"
                      >
                        <AvatarFallback>{person.fullName[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger>
                      <DialogClose>
                        <Button
                          className="ml-2"
                          size="sm"
                          variant="outline"
                          onClick={handleProjectInvitation}
                        >
                          <span className="text-md">Invite</span>
                          <PlusCircledIcon className="w-3 h-3 ml-1"></PlusCircledIcon>
                        </Button>
                      </DialogClose>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>Invite User</DialogHeader>
                      <InviteUserForm></InviteUserForm>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex">
                  <p className="w-36">Category:</p>
                  <p>{project.projectDetails?.category}</p>
                </div>

                <div className="flex">
                  <p className="w-36">Status:</p>
                  <Badge>In Progress</Badge>
                </div>
              </div>
              <section>
                <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
                <div className="lg:flex md:flex gap-3 justify-between py-5">
                  <IssueList status="Pending" title="Todo List"></IssueList>
                  <IssueList
                    status="In Progress"
                    title="In Progress"
                  ></IssueList>
                  <IssueList status="Done" title="Done"></IssueList>
                </div>
              </section>
            </div>
          </ScrollArea>
          <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
            <Chatbox></Chatbox>
          </div>
        </div>
      </div>
    </>
  );
};
