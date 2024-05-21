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
import { useDispatch } from "react-redux";
import { createProjects } from "@/Redux/Project/Action";

const Tags = [
  "React",
  "NextJs",
  "SpringBoot",
  "MySQL",
  "MongoDB",
  "Angular",
  "Python",
  "Flask",
  "Django",
  "Java",
];

export const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [], // Make sure the tags are initialized correctly
    },
  });

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");
    const updatedTags = currentTags.includes(newValue)
      ? currentTags.filter((tag) => tag !== newValue)
      : [...currentTags, newValue];
    form.setValue("tags", updatedTags); // Ensure correct case for the form field
  };

  const onSubmit = (data) => {
    dispatch(createProjects(data));
    // console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project Name..."
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
                    placeholder="Project Description..."
                  ></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    defaultValue="FullStack"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    // className="border w-full border-gray-700 py-5 px-5"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FullStack">FullStack</SelectItem>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={handleTagsChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tags"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Tags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex gap-1 flex-wrap">
                  {field.value.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => handleTagsChange(tag)}
                      className="cursor-pointer flex rounded-full items-center border gap-2 px-4 py-1"
                    >
                      <span className="text-sm">{tag}</span>
                      <Cross1Icon className="h-3 w-3"></Cross1Icon>
                    </div>
                  ))}
                </div>
              </FormItem>
            )}
          ></FormField>
          <DialogClose>
            {false ? (
              <div>
                <p>
                  You can create only 3 project with free plan,Please Upgrade
                  Your Plan to Create More Projects
                </p>
              </div>
            ) : (
              <Button type="submit" className="width-full mt-5 ">
                Create Project
              </Button>
            )}
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};
