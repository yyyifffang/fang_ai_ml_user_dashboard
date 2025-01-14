import React from "react";

export const ConfigCard = ({ config }) => {
  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 flex justify-between items-center cursor-pointer">
      <div>
        <div className="bg-blue-300 rounded-lg p-0.5">{config.uid}</div>
        <h2 className="text-xl font-semibold p-1">{config.name}</h2>
        <p className="text-gray-500">{config.description}</p>
      </div>
      <div className="space-x-8 px-5">
        <button>
          <img src="/project/edit.svg" alt="Edit" />
        </button>
        <button>
          <img src="/project/download.svg" alt="Download" />
        </button>
        <button>
          <img src="/project/delete.svg" alt="Delete" />
        </button>
      </div>
    </div>
  );
};
