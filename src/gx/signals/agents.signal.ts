import { User } from "@/entities/user.entity";
import { createSignal } from "@dilane3/gx";

export type AgentsState = {
  agents: User[];
  loading: boolean;
};

export type AgentsActions = {
  loadAgents: (agents: User[]) => void;
  addAgent: (agent: User) => void;
};

export default createSignal<AgentsState>({
  name: "agents",
  state: {
    agents: [],
    loading: false,
  },
  actions: {
    loadAgents: (state, agents: User[]) => ({
      ...state,
      agents,
      loading: false,
    }),

    addAgent: (state, agent: User) => ({
      ...state,
      agents: [...state.agents, agent],
    }),
  },
});
