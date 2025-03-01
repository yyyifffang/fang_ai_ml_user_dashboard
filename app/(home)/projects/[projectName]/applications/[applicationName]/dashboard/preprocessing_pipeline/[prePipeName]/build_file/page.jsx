"use client";

import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useBackNavigation } from "@/app/backNavigation";
import { useFetchBuildFiles, HandleLinkClick } from "./service";
import { BuildFileCard } from "./buildFileCard";
import { CreateModal } from "./buildFileModal";

export default function PreprocessingBuildFilePage() {
  const { projectName, applicationName, prePipeName } = useParams();
  const projectNameDecode = decodeURIComponent(projectName);
  const applicationNameDecode = decodeURIComponent(applicationName);
  const prePipeNameDecode = decodeURIComponent(prePipeName);
  const searchParams = useSearchParams();
  const pipelineUID = searchParams.get("pipelineUID");

  const handleBackClick = useBackNavigation();

  const {
    buildFiles: preprocessingBuildFiles,
    isLoading,
    triggerFetch,
  } = useFetchBuildFiles(pipelineUID);

  const { handleConfigClick, handleTasksClick } = HandleLinkClick(
    projectNameDecode,
    applicationNameDecode,
    prePipeNameDecode,
    pipelineUID
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="mx-auto min-h-screen bg-gray-50 pt-32 px-40">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500">
              Projects / {projectNameDecode} / Applications /{" "}
              {applicationNameDecode} / Preprocessing Pipeline /
              <span className="text-black"> {prePipeNameDecode} </span>
            </p>
            <div className="flex items-center mb-6 space-x-4">
              <button onClick={handleBackClick}>
                <img src="/project/vector_left.svg" alt="Back" />
              </button>
              <p className="text-3xl">Build File</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <div
                className="bg-green-100 text-green-800 px-1 py-0.5 rounded-md cursor-pointer flex items-center space-x-2"
                onClick={handleConfigClick}
              >
                <span>Config</span>
                <img
                  src="/project/external-link.svg"
                  alt="External Link"
                  className="w-4 h-4"
                />
              </div>
              <div
                className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded-md cursor-pointer flex items-center space-x-2 "
                onClick={handleTasksClick}
              >
                <span>Tasks</span>
                <img
                  src="/project/external-link.svg"
                  alt="External Link"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>
          <button
            className="bg-green-800 text-white px-4 py-3 rounded-2xl text-xl "
            onClick={handleCreateClick}
          >
            Upload Build File
          </button>
        </div>
        {/*放card */}
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="space-y-4">
            {preprocessingBuildFiles.map((preBuildFile) => (
              <BuildFileCard
                key={preBuildFile.uid}
                buildFile={preBuildFile}
                onEdit={triggerFetch}
                onDelete={triggerFetch}
              />
            ))}
          </div>
        )}
      </div>
      {isCreateModalOpen && (
        <CreateModal
          pipelineUID={pipelineUID}
          pipelineName={prePipeNameDecode}
          type="Preprocessing"
          onCreate={triggerFetch}
          onClose={handleCloseCreateModal}
          title1="1. Download Original Dataset"
          title2="2. Preprocessing"
          title3="3. Upload Training Dataset"
        />
      )}
    </div>
  );
}
