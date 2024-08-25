import React from "react";
import { AgentType } from "../AgentsList/AgentsList";

interface AgentCardProps {
  agent: AgentType;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <div className="relative bg-gradient-to-r from-black via-gray-900 to-red-900 text-white p-8 rounded-xl shadow-2xl w-full max-w-lg mx-auto transform transition-transform duration-300">
      <div className="relative z-10">
        <img
          src={agent.displayIconSmall}
          alt={agent.displayName}
          className="w-full h-60 object-cover rounded-lg mb-6 border-4 border-red-600"
        />
        <h2 className="text-3xl font-bold mb-4 text-red-500">{agent.displayName}</h2>
        <p className="text-base mb-4 text-gray-300 leading-relaxed">{agent.description}</p>
        <div className="flex justify-end items-center mt-6">
          {agent.role && (
            <div className="flex items-center">
              <img
                src={agent.role.displayIcon}
                alt={agent.role.displayName}
                className="h-10 w-10 mr-2"
              />
              <span className="text-lg text-gray-400">{agent.role.displayName}</span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
    </div>
  );
};

export default AgentCard;
