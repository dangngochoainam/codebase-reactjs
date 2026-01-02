import { useAuthContext } from "./useAuth";

export const useToken = () => {
  const { user } = useAuthContext();
  return user?.accessToken || null;
};
