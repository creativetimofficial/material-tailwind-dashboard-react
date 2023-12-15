import { Faculty } from "@/entities/faculty.entity";
import { createSignal } from "@dilane3/gx";

export type FacultiesState = {
  faculties: Faculty[];
  loading: boolean;
};

export type FacultiesActions = {
  loadFaculties: (faculties: Faculty[]) => void;
  addFaculty: (faculty: Faculty) => void;
  updateFaculty: (faculty: Faculty) => void;
  deleteFaculty: (faculty: Faculty) => void;
};

const facultiesSignal = createSignal<FacultiesState>({
  name: "faculties",
  state: {
    faculties: [],
    loading: false
  },
  actions: {
    loadFaculties: (state, faculties: Faculty[]) => {
      return {
        ...state,
        faculties,
        loading: false
      };
    },

    addFaculty: (state, faculty: Faculty) => {
      return {
        ...state,
        faculties: [...state.faculties, faculty]
      };
    },

    updateFaculty: (state, faculty: Faculty) => {
      return {
        ...state,
        faculties: state.faculties.map((f) => {
          if (f.id === faculty.id) {
            return faculty;
          }
          return f;
        })
      };
    },

    deleteFaculty: (state, faculty: Faculty) => {
      return {
        ...state,
        faculties: state.faculties.filter((f) => f.id !== faculty.id)
      };
    }
  }
});

export default facultiesSignal;