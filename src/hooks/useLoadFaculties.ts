import { findAllFaculties } from "@/api/faculty";
import { Faculty } from "@/entities/faculty.entity";
import { AuthState } from "@/gx/signals/auth.signal";
import { FacultiesState, FacultiesActions } from "@/gx/signals/faculties.signal";
import { useActions, useSignal } from "@dilane3/gx";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useLoadFaculties() {
  // Global state
  const { user } = useSignal<AuthState>("auth");
  const { loading } = useSignal<FacultiesState>("faculties");

  // Global actions
  const { loadFaculties } = useActions<FacultiesActions>("faculties");

  useEffect(() => {
    (async () => {
      if (user && !loading) {
        await handleLoadFaculties();
      }
    })();
  }, [user]);

  // Handlers
  const handleLoadFaculties = async () => {
    const { data } = await findAllFaculties();

    if (data) {
      const faculties = data.map((faculty: any) => {
        return new Faculty({
          id: faculty.id,
          name: faculty.name,
          createdAt: new Date(faculty.createdAt),
        });
      });

      loadFaculties(faculties);
    } else {
      toast.error("Failed to load faculties");
    }
  };
}
