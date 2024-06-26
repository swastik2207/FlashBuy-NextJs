import CommonListing from "@/components/CommonListing";
import { getAllProducts } from "@/services/product";
export default async function AllProducts() {
  const allProducts = await getAllProducts();

  return <CommonListing data={allProducts.data} />;
}