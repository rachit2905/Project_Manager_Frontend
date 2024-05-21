import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "@/Redux/Comment/Action";

export const CreateCommentForm = ({ issueId }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = (data) => {
    dispatch(
      createComment({
        issueId: issueId,
        comment: data.content,
        userId: auth.user?.id,
      })
    );
    console.log(data);
  };
  return (
    <Form {...form}>
      <form className="flex-gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2">
                {" "}
                <div>
                  <Avatar>
                    <AvatarFallback>{auth.user.fullName[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-[20rem]"
                    placeholder="Add Comment Here..."
                  ></Input>
                </FormControl>{" "}
                <FormMessage></FormMessage>
              </div>
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" className="mt-1">
          Comment
        </Button>
      </form>
    </Form>
  );
};
