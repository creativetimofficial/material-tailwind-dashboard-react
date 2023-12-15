import { findAllAgents } from "@/api/agents";
import { Role, RoleEnum } from "@/entities/role.entity";
import { User } from "@/entities/user.entity";
import { AgentsActions, AgentsState } from "@/gx/signals/agents.signal";
import { AuthState } from "@/gx/signals/auth.signal";
import { useActions, useSignal } from "@dilane3/gx";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useLoadAgents() {
  // Global state
  const { user } = useSignal<AuthState>("auth");
  const { loading } = useSignal<AgentsState>("agents");

  // Global actions
  const { loadAgents } = useActions<AgentsActions>("agents");

  useEffect(() => {
    (async () => {
      if (user && !loading) {
        await handleLoadAgents();
      }
    })();
  }, [user]);

  // Handlers
  const handleLoadAgents = async () => {
    const { data } = await findAllAgents();

    if (data) {
      const agents = data.map((agent: any) => {
        return new User({
          id: agent.id,
          firstName: agent.firstName,
          lastName: agent.lastName,
          phone: agent.phone,
          email: agent.user.email,
          avatar: "",
          sexe: "male",
          createdAt: new Date(agent.user.createdAt),
          role: new Role({
            label: RoleEnum.AGENT,
            description: "Agent",
          }),
        });
      });

      loadAgents(agents);
    } else {
      toast.error("Failed to load faculties");
    }
  };
}
