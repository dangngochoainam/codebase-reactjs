import { useRoutes } from "react-router";
import { ProducsRoute } from "./features/Product/routes";
import { WelcomeRoutes } from "./features/Wellcome/routes";

export const appRoutes = [...WelcomeRoutes, ...ProducsRoute];

export const AppRouter = () => {
  const element = useRoutes(appRoutes);
  return element;
};
