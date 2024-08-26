import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AgentType } from "../AgentsList/AgentsList"; // Assume que `Daum` é a interface para o agente

export function AgentDetail() {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<AgentType | null>(null);

  useEffect(() => {
    fetch(`https://valorant-api.com/v1/agents/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setAgent(result.data || null);
      })
      .catch((error: Error) => console.log("Error:", error));
  }, [id]);

  if (!agent) {
    return <p className="text-white">Carregando...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Retrato Completo e Background */}
        <div
          className="relative mb-6 overflow-hidden rounded-lg"
          style={{
            backgroundImage: `linear-gradient(to right, ${agent.backgroundGradientColors.join(", ")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={agent.fullPortrait || agent.displayIcon}
            alt={agent.displayName}
            className="w-full h-auto object-cover" // Ajustado para `object-cover`
            style={{ maxHeight: "calc(100vh - 4rem)" }} // Ajuste para não cortar a imagem
          />
        </div>

        <h1 className="text-5xl font-bold mb-4 text-red-500">
          {agent.displayName}
        </h1>
        <p className="text-lg mb-4 text-gray-300 leading-relaxed">
          {agent.description}
        </p>

        {/* Função do Agente */}
        {agent.role && (
          <div className="flex items-center mt-6">
            <img
              src={agent.role.displayIcon}
              alt={agent.role.displayName}
              className="h-12 w-12 mr-3"
            />
            <span className="text-xl text-gray-400">
              Role: {agent.role.displayName}
            </span>
          </div>
        )}

        {/* Habilidades */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4 text-red-500">
            Abilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {agent.abilities.map((ability) => (
              <div
                key={ability.slot}
                className="flex items-start bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                {ability.displayIcon && (
                  <img
                    src={ability.displayIcon}
                    alt={ability.displayName}
                    className="h-12 w-12 mr-4"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold text-red-400">
                    {ability.displayName}
                  </h3>
                  <p className="text-gray-300">{ability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detalhes do Recrutamento */}
        {agent.recruitmentData && (
          <div className="mt-8 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-red-500">
              Recruitment Details
            </h2>
            <p className="text-gray-300">
              Start Date: {new Date(agent.recruitmentData.startDate).toLocaleDateString()}
            </p>
            <p className="text-gray-300">
              End Date: {new Date(agent.recruitmentData.endDate).toLocaleDateString()}
            </p>
            <p className="text-gray-300">
              Level VP Cost Override: {agent.recruitmentData.levelVpCostOverride}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
