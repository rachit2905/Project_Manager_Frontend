import { assignIssueToUser } from "@/Redux/Issue/Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({ issueDetails }) => {
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleAssignIssueToUser = (userId) => {
    dispatch(assignIssueToUser(issueDetails.id, userId));
  };
  return (
    <div>
      <div className="space-y-2">
        <div className="border rounded-md">
          <p className="py-2 px-3">
            {issueDetails.assignee?.fullName != null
              ? issueDetails.assignee?.fullName
              : "Unassigned"}
          </p>
        </div>
        {project.projectDetails?.team.map((member) => (
          <div
            onClick={() => handleAssignIssueToUser(member.id)}
            key={member.id}
            item={member}
            className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4 "
          >
            <Avatar>
              <AvatarFallback>{member.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm leading-none">{member.fullName}</p>
              <p className="text-sm text-muted-foreground">
                @{member.fullName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
