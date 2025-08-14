import { useAuth } from "@/context/AuthContext";

import data from "@/mock/data.json";

export function useActions() {
  const { user } = useAuth();
  const actions = data.actions;

  if (user?.role === "coordinator") {
    return actions;
  } else if (user?.role === "teacher") {
    return actions.filter(
      (action) => action.professor === user.name || action.status !== "Pendente"
    );
  } else {
    return actions.filter((action) => action.status !== "Pendente");
  }
}
