"use client";

import { AgentList } from "../AgentsList/AgentsList";

export function Agents() {
  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <div className="w-full h-full">
        <AgentList />
      </div>
    </main>
  );
}

export default Agents;
