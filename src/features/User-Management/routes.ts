import type { RouteObject } from "react-router";
import UserManagementView from "./views/UserManagementView";
import UserDetailView from "./views/UserDetailView";
import FullLayout from "../../core/layouts/FullLayout";

export const UserManagementRoutes: RouteObject[] = [
  {
    path: "/user-management",
    Component: FullLayout,
    children: [
      {
        path: "",
        Component: UserManagementView,
      },
      {
        path: ":id/:mode?",
        Component: UserDetailView,
      },
    ],
  },
];

