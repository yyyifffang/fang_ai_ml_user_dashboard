import React, { useState } from "react";
import { EditModal, PerformanceModal, DeleteModal } from "./modelModal";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HandlePublishToggle } from "./service";
import { useToast } from "@/components/ui/use-toast";

export const ModelCard = React.memo(
  ({ model, onEdit, onDelete, applicationName }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPerformModalOpen, setIsPerformModalOpen] = useState(false);
    const [isPublish, setIsPublish] = useState(model.status === "publish");

    const { toast } = useToast();

    const handleEditClick = () => {
      setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
    };

    const handleDeleteClick = () => {
      setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
      setIsDeleteModalOpen(false);
    };

    const handlePerformanceClick = () => {
      setIsPerformModalOpen(true);
    };
    const handleClosePerformanceModal = () => {
      setIsPerformModalOpen(false);
    };

    const handlePublishToggle = async () => {
      const response = await HandlePublishToggle(model, isPublish);
      if (response) {
        setIsPublish((prev) => !prev); // 更新本地狀態
        toast({
          description: (
            <span className="text-xl">Status changed successfully !</span>
          ),
          variant: "success",
          duration: 1500, // 顯示三秒
        });
      } else {
        toast({
          description: <span className="text-xl">Model publishing failed</span>,
          variant: "destructive",
          duration: 1500, // 顯示三秒
        });
      }
    };

    return (
      <div className="relative bg-white shadow-md rounded-lg p-4 flex justify-between items-center cursor-pointer">
        <div>
          <div className="bg-blue-300 rounded-lg p-0.5">{model.uid}</div>
          <h2 className="text-xl font-semibold p-1">{model.name}</h2>
          <p className="text-gray-500">{model.description}</p>
        </div>
        <div className="space-x-8 flex items-center">
          <button onClick={handleEditClick}>
            <img src="/project/edit.svg" alt="Edit" />
          </button>
          <button>
            <img src="/project/download.svg" alt="Download" />
          </button>
          <button onClick={handleDeleteClick}>
            <img src="/project/delete.svg" alt="Delete" />
          </button>
          <div className="flex items-center space-x-1">
            <Switch checked={isPublish} onCheckedChange={handlePublishToggle} />
            <Label className="text-lg" htmlFor="publish">
              Publish
            </Label>
          </div>
          <button
            onClick={handlePerformanceClick}
            className="bg-gray-200 rounded-xl px-3 py-2 border border-gray-400"
          >
            Performance
          </button>
        </div>
        {isEditModalOpen && (
          <EditModal
            model={model}
            onClose={handleCloseEditModal}
            onEdit={onEdit}
            applicationName={applicationName}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            model={model}
            onClose={handleCloseDeleteModal}
            onDelete={onDelete}
          />
        )}
        {isPerformModalOpen && (
          <PerformanceModal
            model={model}
            onClose={handleClosePerformanceModal}
          />
        )}
      </div>
    );
  }
);

export default ModelCard;
