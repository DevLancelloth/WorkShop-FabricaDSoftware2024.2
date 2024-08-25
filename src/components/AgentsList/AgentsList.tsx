import React, { useState, useEffect } from "react";
import AgentCard from "../AgentCard/AgentCard";

export interface AgentType {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  displayIconSmall: string;
  role?: Role;
}

export interface Role {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

export function AgentList() {
  const [data, setData] = useState<AgentType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://valorant-api.com/v1/agents")
      .then((response) => response.json())
      .then((result) => {
        setData(result.data || []);
      })
      .catch((error: Error) => console.log("Error:", error));
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full">
      {data.length > 0 ? (
        <div className="relative w-full flex justify-center items-center">
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          >
            &#9664;
          </button>

          <div className="w-full max-w-lg">
            <AgentCard key={data[currentIndex].uuid} agent={data[currentIndex]} />
          </div>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          >
            &#9654;
          </button>
        </div>
      ) : (
        <p className="text-white">Loading...</p>
      )}

      {/* Indicadores de Posição */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {data.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${index === currentIndex ? 'bg-red-600' : 'bg-gray-500'}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
