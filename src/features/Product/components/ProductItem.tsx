import type { ProductModel } from "../types/product.types";
import { MONO, SANS } from "@/core/lib/utils/styles";

export default function ProductItem({ product }: { product: ProductModel }) {
  return (
    <div
      className="group flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
      style={{ background: "#0e0f18", border: "1px solid #1e1f30" }}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden flex items-center justify-center p-8"
        style={{ background: "#13141f", aspectRatio: "1" }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          style={{ mixBlendMode: "luminosity", opacity: 0.9 }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, #0e0f18 0%, transparent 55%)",
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span
          style={{
            ...MONO,
            fontSize: "9px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--app-accent)",
          }}
        >
          {product.category}
        </span>
        <p
          className="font-light leading-snug line-clamp-2 flex-1 text-sm text-app-text"
          style={SANS}
        >
          {product.title}
        </p>
        <div
          className="flex items-center justify-between pt-3 mt-1"
          style={{ borderTop: "1px solid #1e1f30" }}
        >
          <span
            className="text-app-accent text-lg"
            style={{ ...MONO, fontWeight: 500 }}
          >
            ${product.price}
          </span>
          <div
            className="flex items-center gap-1"
            style={{ ...MONO, fontSize: "10px", color: "var(--app-text-dim)" }}
          >
            <span style={{ color: "rgba(201,168,76,0.4)" }}>★</span>
            <span>{product.rating.rate}</span>
            <span>({product.rating.count})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
