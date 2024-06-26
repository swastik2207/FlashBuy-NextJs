import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";

export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);
  console.log(params)

  console.log(productDetailsData);

  return(<>

  <CommonDetails item={productDetailsData.data}/>
  
  </>)
}