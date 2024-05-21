import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@radix-ui/react-dialog";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { inviteToProject } from "@/Redux/Project/Action";
export const InviteUserForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(
      inviteToProject({
        email: data.email,
        projectId: project.projectDetails.id,
      })
    );
    console.log(data);
  };
  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="border w-full border-gray-700 py-5 px-5"
                  placeholder="User Email..."
                ></Input>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>

        <DialogClose>
          <Button type="submit" className="width-full mt-5 ">
            Invite User
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};
