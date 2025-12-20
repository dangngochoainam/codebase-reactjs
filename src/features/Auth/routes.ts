import type { RouteObject } from "react-router";
import SignInView from "./views/SignInView";
import FullLayout from "@/core/layouts/FullLayout";
import SignUpView from "./views/SignUpView";

export const AuthRoutes: RouteObject[] = [
  {
    path: "/signin",
    Component: FullLayout,
    children: [
      {
        path: "",
        Component: SignInView,
      },
    ],
  },
  {
    path: "/signup",
    Component: FullLayout,
    children: [
      {
        path: "",
        Component: SignUpView,
      },
    ],
  },
];
