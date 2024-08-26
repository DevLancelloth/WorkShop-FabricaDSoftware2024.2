import React, { useState, useEffect } from "react";
import AgentCard from "../AgentCard/AgentCard";

export interface Root {
  status: number;
  data: AgentType[];
}

export interface AgentType {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags?: string[];
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait?: string;
  fullPortrait?: string;
  fullPortraitV2?: string;
  killfeedPortrait: string;
  background?: string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role?: Role;
  recruitmentData?: RecruitmentData;
  abilities: Ability[];
  voiceLine: any;
}

export interface Role {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  assetPath: string;
}

export interface RecruitmentData {
  counterId: string;
  milestoneId: string;
  milestoneThreshold: number;
  useLevelVpCostOverride: boolean;
  levelVpCostOverride: number;
  startDate: string;
  endDate: string;
}

export interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon?: string;
}

export function AgentList() {
  const [data, setData] = useState<AgentType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://valorant-api.com/v1/agents")
      .then((response) => response.json())
      .then((result) => {
        // Filtrar para obter apenas agentes jogáveis
        const playableAgents = result.data.filter((agent: AgentType) => agent.isPlayableCharacter);
        setData(playableAgents);
      })
      .catch((error: Error) => console.log("Error:", error));
  }, []);

  const filteredAgents = data.filter((agent) =>
    agent.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Garantir que o currentIndex esteja dentro dos limites da lista filtrada
    if (currentIndex >= filteredAgents.length) {
      setCurrentIndex(0);
    }
  }, [filteredAgents]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredAgents.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredAgents.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-2xl mb-6">
        <input
          type="text"
          placeholder="Procurar Agentes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 text-lg text-gray-200 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-500"
        />
      </div>

      {filteredAgents.length > 0 ? (
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <button
            onClick={goToPrevious}
            className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors mx-2"
          >
            &#9664;
          </button>

          <div className="w-full">
            <AgentCard
              key={filteredAgents[currentIndex]?.uuid}
              agent={filteredAgents[currentIndex]}
            />
          </div>

          <button
            onClick={goToNext}
            className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors mx-2"
          >
            &#9654;
          </button>
        </div>
      ) : (
        <p className="text-gray-400 mt-10">No agents found...</p>
      )}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {filteredAgents.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${index === currentIndex ? 'bg-red-600' : 'bg-gray-500'}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
