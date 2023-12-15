import { createStore } from "@dilane3/gx";
import facultiesSginal from "../signals/faculties.signal";
import authSignal from "../signals/auth.signal";

const store = createStore([facultiesSginal, authSignal]);

export default store;
