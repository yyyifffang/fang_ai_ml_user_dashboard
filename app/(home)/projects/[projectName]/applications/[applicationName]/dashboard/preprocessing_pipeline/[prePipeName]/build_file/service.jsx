"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTestAPI } from "@/app/api/entrypoint";

export const useFetchPreprocessingBuildFile = (projectName, applicationName) => {
  const [preprocessingBuildFile, setPreprocessingBuildFile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (projectName && applicationName) {
      const fetchPreprocessingBuildFile = async () => {
        const response = await getTestAPI(
          `preprocessing_build_file`
        );
        if (response && response.data) {
            setPreprocessingBuildFile(response.data);
          setIsLoading(false);
        } else if (response && response instanceof Error) {
          console.log("Error fetching preprocessing build file：", response.message);
        }
      };
      fetchPreprocessingBuildFile();
    }
  }, [projectName, applicationName]);
  return { preprocessingBuildFile, isLoading };
};

export const handleLinkClick = (projectName, applicationName) => {
  const router = useRouter();

  const handleConfigClick = () => {
    router.push(
      `/projects/${projectName}/applications/${applicationName}/dashboard/model`
    );
  };
  const handlePreprocessingPipelineClick = () => {
    router.push(
      `/projects/${projectName}/applications/${applicationName}/dashboard/preprocessing_pipeline`
    );
  };

  return { handleModelClick, handlePreprocessingPipelineClick };
};
