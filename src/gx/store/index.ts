import { createStore } from "@dilane3/gx";
import facultiesSginal from "../signals/faculties.signal";
import authSignal from "../signals/auth.signal";
import sectorsSignal from "../signals/sectors.signal";

const store = createStore([facultiesSginal, authSignal, sectorsSignal]);

export default store;
