import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShopWave — Advanced E-commerce" },
      { name: "description", content: "Browse products, manage your cart, wishlist and checkout." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/shop.html"
      title="ShopWave"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  );
}
