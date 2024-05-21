import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateProjectForm } from "../Project/CreateProjectForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/Auth/Action";
export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="border-b py-4 px-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p onClick={() => navigate("/")} className="cursor-pointer">
          Project Manangement
        </p>
        <Dialog>
          <DialogTrigger>
            <Button variant="ghost">New Project</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>Create New Project</DialogHeader>
            <CreateProjectForm></CreateProjectForm>
          </DialogContent>
        </Dialog>
        <Button onClick={() => navigate("/upgrade_plan")} variant="ghost">
          Upgrade
        </Button>
      </div>
      <div className="flex gap-3 item-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-gray-500"
            >
              <PersonIcon></PersonIcon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>{auth.user?.fullName}</p>
      </div>
    </div>
  );
};
