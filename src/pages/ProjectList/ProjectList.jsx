import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "@/Redux/Project/Action";
export const ProjectList = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const handleFilterCategory = (value) => {
    dispatch(fetchProjects({ category: value }));
  };
  const handleFilterTags = (value) => {
    if (value == "All") value = null;
    dispatch(fetchProjects({ tag: value }));
  };
  const [keyword, setKeyword] = useState("");
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value));
  };
  const Tags = [
    "All",
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

  return (
    <>
      <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
        <section className="filterSection">
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl -tracking-wider">filters </p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon></MixerHorizontalIcon>
              </Button>
            </div>
            <CardContent className="mt-5">
              <ScrollArea className="space-y-7 h-[70vh]">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="All"
                      onValueChange={(value) => handleFilterCategory(value)}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="" id="r1"></RadioGroupItem>{" "}
                        <Label htmlFor="r1">All</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="FullStack"
                          id="r2"
                        ></RadioGroupItem>
                        <Label htmlFor="r2">FullStack</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="Frontend"
                          id="r3"
                        ></RadioGroupItem>
                        <Label htmlFor="r3">Frontend</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="Backend"
                          id="r4"
                        ></RadioGroupItem>
                        <Label htmlFor="r4">Backend</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="pt-9">
                  <h1 className="pb-3 text-gray-400 border-b">Tags</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="All"
                      onValueChange={(value) => handleFilterTags(value)}
                    >
                      {Tags.map((tag) => (
                        <div
                          key={`tag-${tag}`}
                          className="flex items-center gap-2"
                        >
                          <RadioGroupItem
                            value={tag}
                            id={`r1-${tag}`}
                          ></RadioGroupItem>{" "}
                          <Label htmlFor={`r1-${tag}`}>{tag}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
        <section className="projectListSection w-full lg:w-[48rem]">
          <div className="flex gap-2 items-center pb-5 justify-between">
            <div className="relative p-0 w-full">
              <Input
                className="40% px-9"
                placeholder="Search Project"
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4"></MagnifyingGlassIcon>{" "}
            </div>
          </div>
          <div>
            <div className="space-y-5 min-h-[74vh]">
              {keyword
                ? project.searchProjects?.map((item, index) => (
                    <ProjectCard
                      key={item.id * index}
                      item={item}
                    ></ProjectCard>
                  ))
                : project.projects?.map((item) => (
                    <ProjectCard key={item.id} item={item}></ProjectCard>
                  ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
