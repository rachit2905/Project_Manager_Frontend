import { acceptInvitation } from "@/Redux/Project/Action";
import { Button } from "@/components/ui/button";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AcceptInviation = () => {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");
  const navigate = useNavigate();
  const handleAcceptInvitation = () => {
    console.log(token);
    dispatch(acceptInvitation({ invitationToken: token, navigate }));
  };
  return (
    <div className="h-[85vh] flex flex-col justify-center items-center">
      <h1 className="py-5 font-semibold text-xl">
        You are invited to join the project
      </h1>
      <Button onClick={handleAcceptInvitation}>Accept Invitation</Button>
    </div>
  );
};

export default AcceptInviation;
