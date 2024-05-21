import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import IssueCard from "./IssueCard";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import CreateIssueForm from "./CreateIssueForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "@/Redux/Issue/Action";
const IssueList = ({ title, status }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIssues(id));
  }, []);
  const { issue } = useSelector((store) => store);
  return (
    <div>
      <Dialog>
        <Card className="w-full md:w-[300px] lg:w-[310px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-2">
              {issue.issues
                ?.filter((issue) => issue.status == status)
                .map((issue) => (
                  <IssueCard
                    key={issue.id}
                    item={issue}
                    projectID={id}
                  ></IssueCard>
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <DialogTrigger>
              <Button
                variant="outline"
                className="w-full  flex items-center gap-2"
              >
                Create Issue
                <PlusCircledIcon className="w-3 h-3"></PlusCircledIcon>
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm status={status}></CreateIssueForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;
