import { Sector } from "@/entities/sector.entity";
import { createSignal } from "@dilane3/gx";

export type SectorsState = {
  sectors: Sector[];
  loading: boolean;
};

export type SectorsActions = {
  loadSectors: (sectors: Sector[]) => void;
  addSector: (sector: Sector) => void;
  updateSector: (sector: Sector) => void;
  deleteSector: (sector: Sector) => void;
};

const sectorsSignal = createSignal<SectorsState>({
  name: "sectors",
  state: {
    sectors: [],
    loading: false
  },
  actions: {
    loadSectors: (state, sectors: Sector[]) => {
      return {
        ...state,
        sectors,
        loading: false
      };
    },

    addSector: (state, sector: Sector) => {
      return {
        ...state,
        faculties: [...state.sectors, sector]
      };
    },

    updateSector: (state, sector: Sector) => {
      return {
        ...state,
        faculties: state.sectors.map((s) => {
          if (s.id === sector.id) {
            return sector;
          }
          return s;
        })
      };
    },

    deleteSector: (state, sector: Sector) => {
      return {
        ...state,
        faculties: state.sectors.filter((s) => s.id !== sector.id)
      };
    }
  }
});

export default sectorsSignal;