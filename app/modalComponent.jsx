import React, { useState } from "react";
import PropTypes from "prop-types";

//通用的ModalInput Component
export const ModalInput = ({
  label,
  value,
  name,
  onChange,
  readOnly = false,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`${
        readOnly ? "bg-gray-200" : "border-blue-500"
      } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
    />
    <span className="text-red-500 mt-1">{error}</span>
  </div>
);

ModalInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  error: PropTypes.string,
};

//通用的DeleteModal Component
export const BaseDeleteModal = ({
  entity,
  entityName,
  onClose,
  onDelete,
  handleDelete,
}) => {
  const handleDeleteClick = () => {
    handleDelete(entity.uid, onDelete, onClose);
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
        <h2 className="text-2xl font-bold mb-4">Delete {entityName}</h2>
        <p className="mb-4">
          Are you sure you want to delete the &quot;{entity.name}&quot;?
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleDeleteClick}
            className="bg-red-700 text-white px-4 py-2 rounded-md font-bold"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-700 text-white px-4 py-2 rounded-md font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

BaseDeleteModal.propTypes = {
  entity: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  entityName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

//通用的FileInput Component
export const FileInput = ({ label, onChange, accept, error }) => {
  const [fileName, setFileName] = useState("未選擇任何檔案");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    } else {
      setFileName("未選擇任何檔案");
      onChange(null);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => document.getElementById("fileInput").click()}
          className="absolute right-0 top-0 bottom-0 bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          選擇檔案
        </button>
        <input
          type="file"
          id="fileInput"
          accept={accept}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <input
          type="text"
          value={fileName}
          readOnly
          className="border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {error && <span className="text-red-500 mt-1">{error}</span>}
    </div>
  );
};

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  error: PropTypes.string,
};

//表單驗證
export const ValidateForm = (formData, fieldsToValidate) => {
  const errors = {};
  const errorMessage = "This field is required.";

  fieldsToValidate.forEach((field) => {
    const value = formData[field];

    if (field === "file") {
      if (!value || value.length === 0) {
        errors[field] = "A file is required.";
      }
    } else {
      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[field] = errorMessage;
      }
    }
  });

  return errors;
};
