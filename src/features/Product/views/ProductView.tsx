import { useAuthContext } from "@/core/auth/hooks/useAuth";
import { Navigate } from "react-router";
import ProductList from "../components/ProductList";

export default function ProductView() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold"> Products </h1>
        <ProductList />
      </div>
    </>
  );
}
