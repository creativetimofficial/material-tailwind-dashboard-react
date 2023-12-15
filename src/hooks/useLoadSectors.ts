import { findAllSectors } from "@/api/sector";
import { Sector } from "@/entities/sector.entity";
import { AuthState } from "@/gx/signals/auth.signal";
import { SectorsActions, SectorsState } from "@/gx/signals/sectors.signal";
import { useActions, useSignal } from "@dilane3/gx";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useLoadSectors() {
  // Global state
  const { user } = useSignal<AuthState>("auth");
  const { loading } = useSignal<SectorsState>("sectors");

  // Global actions
  const { loadSectors } = useActions<SectorsActions>("sectors");

  useEffect(() => {
    (async () => {
      if (user && !loading) {
        await handleLoadSectors();
      }
    })();
  }, [user]);

  // Handlers
  const handleLoadSectors = async () => {
    const { data } = await findAllSectors();

    if (data) {
      const sectors = data.map((sector: any) => {
        return new Sector({
          id: sector.id,
          name: sector.name,
          createdAt: new Date(sector.createdAt),
          idFaculty: sector.idFaculty
        });
      });

      loadSectors(sectors);
    } else {
      toast.error("Failed to load sectors");
    }
  };
}
