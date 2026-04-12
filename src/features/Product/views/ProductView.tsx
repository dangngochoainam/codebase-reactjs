import { useAuthContext } from "@/core/auth/hooks/useAuth";
import { Navigate } from "react-router";
import ProductList from "../components/ProductList";
import { EYEBROW, PAGE_HEADING } from "@/core/lib/utils/styles";

export default function ProductView() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-app-accent" />
            <span style={EYEBROW}>Catalog</span>
          </div>
          <h1 style={PAGE_HEADING}>Products</h1>
        </div>
        <ProductList />
      </div>
    </div>
  );
}
