import { getMe } from "@/api/auth";
import { Role } from "@/entities/role.entity";
import { User } from "@/entities/user.entity";
import { AuthActions, AuthState } from "@/gx/signals/auth.signal";
import { useActions, useSignal } from "@dilane3/gx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  // Navigate
  const navigate = useNavigate();

  // Global state
  const { loaded, loading } = useSignal<AuthState>("auth");

  // Global actions
  const { setIsLoading, login } = useActions<AuthActions>("auth");

  useEffect(() => {
    (async () => {
      if (!loaded && !loading) {
        await handleGetMe();
      }
    })();
  }, []);

  // Handlers
  const handleGetMe = async () => {
    setIsLoading(true);

    const { data, user: userData } = await getMe();

    if (data) {
      if (userData.admin) {
        const adminData = {
          lastName: userData.admin.lastName,
          firstName: userData.admin.firstName,
          phone: userData.admin.phone,
          avatar: "https://www.gravatar.com/av",
          sexe: "male",
          role: new Role({
            id: userData.admin.id,
            label: "admin",
            description: "admin",
          }),
        };

        const user = new User({
          id: userData.id,
          email: userData.email,
          ...adminData,
        });

        login(user);
      } else {
        // TO DO: Handle agent
      }
    } else {
      setIsLoading(false);

      navigate("/auth/sign-in");
    }
  };
}
