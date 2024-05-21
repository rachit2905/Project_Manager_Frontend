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
import { useDispatch } from "react-redux";
import { createIssue } from "@/Redux/Issue/Action";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const CreateIssueForm = ({ status }) => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      issueName: "",
      description: "",
    },
  });
  const { id } = useParams();
  const { auth } = useSelector((store) => store);
  const onSubmit = (data) => {
    data.projectId = id;
    dispatch(
      createIssue(
        {
          title: data.issueName,
          description: data.description,
          projectId: data.projectId,
          status,
        },
        auth.user?.id
      )
    );
    console.log(data);
  };
  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="issueName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="border w-full border-gray-700 py-5 px-5"
                  placeholder="Issue Name..."
                ></Input>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="border w-full border-gray-700 py-5 px-5"
                  placeholder="Description..."
                ></Input>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <DialogClose>
          <Button type="submit" className="width-full mt-5 ">
            Create Issue
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default CreateIssueForm;
