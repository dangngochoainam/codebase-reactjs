import { useRoutes } from "react-router";
import { ProducsRoute } from "./features/Product/routes";
import { WelcomeRoutes } from "./features/Wellcome/routes";
import { AuthRoutes } from "./features/Auth/routes";
import { UserManagementRoutes } from "./features/User-Management/routes";

export const appRoutes = [
  ...WelcomeRoutes,
  ...ProducsRoute,
  ...AuthRoutes,
  ...UserManagementRoutes,
];

export const AppRouter = () => {
  const element = useRoutes(appRoutes);
  return element;
};
