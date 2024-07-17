"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const useFetchModels = (projectName, applicationName) => {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (projectName && applicationName) {
      const fetchModels = async () => {
        try {
          //開始抓取資料，畫面顯示loading
          setIsLoading(true);
          const response = await axios.get(
            `/api/projects/${projectName}/applications/${applicationName}/models`
          );
          setModels(response.data);
        } catch (error) {
          console.error("Error fetching models：", error);
        } finally {
          //結束抓資料，畫面顯示資料
          setIsLoading(false);
        }
      };
      fetchModels();
    }
  }, [projectName, applicationName]);

  return { models, isLoading };
};

export const useFetchModelData = (projectName, applicationName, modelName) => {
  const [modelData, setModelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (projectName && applicationName && modelName) {
      const fetchModelData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `/api/projects/${projectName}/applications/${applicationName}/models/${modelName}/retrainModels`
          );
          setModelData(response.data);
        } catch (error) {
          console.error("Error fetching model data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchModelData();
    }
  }, [projectName, applicationName, modelName]);

  return { modelData, isLoading };
};

export const handleLinkClick = (projectName, applicationName) => {
  const router = useRouter();

  const handlePreprocessingPipelineClick = () => {
    router.push(
      `/projects/${projectName}/applications/${applicationName}/dashboard/preprocessing_pipeline`
    );
  };

  const handleTrainingPipelineClick = () => {
    router.push(
      `/projects/${projectName}/applications/${applicationName}/dashboard/training_pipeline`
    );
  };

  return { handlePreprocessingPipelineClick, handleTrainingPipelineClick };
};
