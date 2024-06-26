"use client";
import { GlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { addToCart } from "@/services/Cart";
import { toast } from "react-toastify";
import ComponentLevelLoader from "@/components/Loader/ComponentLoader";
import Cookies from "js-cookie";
import getUser from "@/middleware/getUser";




export default function ProductButton({item}){

  

    const pathName=usePathname();
   
    const isAdminview =pathName.includes("admin-view");
    const {setCurrentUpdatedProduct,setComponentLevelLoader,componentLevelLoader,user,setShowCartModal}=useContext(GlobalContext);
    const router=useRouter();


    async function handleAddtoCart(getItem){
        setComponentLevelLoader({loading:true,id:getItem._id})
       // const user=await getUser();
        console.log(user)
        try{
            if(user==null){
                toast.error("User has  to be signed in ", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  setComponentLevelLoader({loading:false,id:""});
                
            }
    
        const res=await addToCart({productId:getItem._id,userId:user._id});

        if(res.success){

            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
              setComponentLevelLoader({loading:false,id:""});
              setShowCartModal(true)

        }
        else{
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
              setComponentLevelLoader({loading:false,id:""});
        }
    }
    catch(e){
        console.log(e);
    }
      
    
    
    }

    return  isAdminview ?(<div>

        <button className="text-white mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium upprcase"
        onClick={()=>{
            setCurrentUpdatedProduct(item);
            router.push("/admin-view/add-product")
        }}>
            Update
        </button>
              
        <button className="text-white mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium upprcase">
            Delete
        </button>



    </div>
    )
    :(
           <div>
        <button className="text-white mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium upprcase"
        onClick={()=>handleAddtoCart(item)}>

            {
                componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id===item._id?(
                <ComponentLevelLoader
                text="Adding to Cart"
                color={"#ffffff"}
                loading={componentLevelLoader&&componentLevelLoader.loading}
                />
                )
                :("Add to Cart")
            }
      
    </button>
          
    <button className="text-white mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium upprcase">
        Remove from Cart
    </button>
    </div>

    )
    ;

}