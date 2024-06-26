import CommonListing from "@/components/CommonListing";
import { getAllProducts } from "@/services/product";

export default async function AdminAllProducts(){

    const allAdminProducts=await getAllProducts();
    console.log(allAdminProducts)
    return(
        <div>
            <CommonListing data={ allAdminProducts.data}/>

        </div>
    )
}