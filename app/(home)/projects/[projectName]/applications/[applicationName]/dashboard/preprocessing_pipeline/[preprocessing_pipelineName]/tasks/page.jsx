"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useBackNavigation } from "@/app/backNavigation";
import { useFetchPreprocessingTask, handleLinkClick } from "./service";
import { TaskCard } from "./taskCard";

export default function PreprocessingPipelinePage() {
  const { projectName, applicationName } = useParams();
  const handleBackClick = useBackNavigation();
  const projectNameDecode = decodeURIComponent(projectName);
  const applicationNameDecode = decodeURIComponent(applicationName);
  const { preprocessingTasks, isLoading } = useFetchPreprocessingTask(projectNameDecode,applicationNameDecode);
  const { handleBuildFileClick, handleConfigClick } = handleLinkClick(
    projectNameDecode,
    applicationNameDecode
  );
  const pipelineName = "UAV前處理管線";
  return (
    <div className="mx-auto min-h-screen bg-gray-50 pt-32 px-40">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500">
              Projects / {projectNameDecode} / Applications / {applicationNameDecode} / Preprocessing Pipeline /
              <span className="text-black"> {pipelineName} </span>
            </p>
            <div className="flex items-center mb-6 space-x-4">
              <button onClick={handleBackClick}>
                <img src="/project/vector_left.svg" alt="Back" />
              </button>
              <p className="text-3xl">Tasks</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <div
                className="bg-green-100 text-green-800 px-1 py-0.5 rounded-md cursor-pointer flex items-center space-x-2"
                onClick={handleBuildFileClick}
              >
                <span>Build File</span>
                <img
                  src="/project/external-link.svg"
                  alt="External Link"
                  className="w-4 h-4"
                />
              </div>
              <div
                className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded-md cursor-pointer flex items-center space-x-2 "
                onClick={handleConfigClick}
              >
                <span>Config</span>
                <img
                  src="/project/external-link.svg"
                  alt="External Link"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>
          <button className="bg-green-800 text-white px-4 py-3 rounded-2xl text-xl ">
            Run Preprocessing Task
          </button>
        </div>
        {/*放card */}
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="space-y-4">
            {preprocessingTasks.map((preTask) => (
              <TaskCard key={preTask.id} task={preTask} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
