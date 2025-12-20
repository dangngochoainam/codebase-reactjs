import { useRoutes } from "react-router";
import { ProducsRoute } from "./features/Product/routes";
import { WelcomeRoutes } from "./features/Wellcome/routes";
import { AuthRoutes } from "./features/Auth/routes";

export const appRoutes = [...WelcomeRoutes, ...ProducsRoute, ...AuthRoutes];

export const AppRouter = () => {
  const element = useRoutes(appRoutes);
  return element;
};
