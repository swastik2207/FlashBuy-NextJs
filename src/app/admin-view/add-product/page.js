
"use client"

import TileComponent from "@/components/Form/TileComponent"
import { AvailableSizes ,firebaseConfig, firebaseStroageURL} from "@/utils"
import { initializeApp } from "firebase/app";
import { adminAddProductformControls } from "@/utils";
import { useState,useEffect, useContext } from "react";
import InputComponent from "@/components/Form/InputComponent";
import SelectComponent from "@/components/Form/SelectComponent";
import {
  getDownloadURL,
  getStorage, 
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addNewProduct } from "@/services/product";
import { GlobalContext } from "@/context";
import { updateAProduct } from "@/services/product";
import { useRouter } from "next/navigation";
import { toast,ToastContainer } from "react-toastify";
import ComponentLevelLoader from "@/components/Loader/ComponentLoader";
import Notification from "@/components/Notification";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app,firebaseStroageURL)


const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "kkkk",
  priceDrop: 0,
};




const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);
return `${getFile.name}-${timeStamp}-${randomStringValue}`
}

async function helperforUploadingImageToFirebase(file){

  const getFileName=createUniqueFileName(file);
  const storageReference= ref(storage,`ecommerce/${getFileName}`)
  const uploadImage=uploadBytesResumable(storageReference,file);
  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });

  
}




export default function AdminAddNewProduct(){

 const [formData,setFormData]=useState(initialFormData);
 const router=useRouter();
 const{currentUpdatedProduct,setCurrentUpdatedProduct,componentLevelLoader,setComponentLevelLoader}=useContext(GlobalContext)

console.log(currentUpdatedProduct)

 useEffect(() => {

  if(currentUpdatedProduct!==null)setFormData(currentUpdatedProduct)
  console.log("formData updated:", formData);

  return () => {
   
  }
}, [currentUpdatedProduct]);
 

async function handleImage(e){
  console.log(e.target.files[0]);

  try{
    const extractImageUrl=await helperforUploadingImageToFirebase(e.target.files[0])
  
  
    console.log(extractImageUrl)
    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl
      });
    }
    console.log(formData)
  }
  catch(err){
    console.log(e);
  }

}

 async function handleAddProduct(){
  setComponentLevelLoader({ loading: true, id: "" });
  

  const res =
  currentUpdatedProduct !== null
    ? await updateAProduct(formData)
    : await addNewProduct(formData);
    console.log(res)
    
    if (res.success) {
      
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      setCurrentUpdatedProduct(null)
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 3000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }
   // router.push("/admin-view/all-products");


 }

  function handleTileClick(getCurrentItem) {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);
  
    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  }


    return(
        
            <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />


<div className="flex gap-2 flex-col">
            <label>Available sizes</label>

            <TileComponent selected={formData.sizes} onClick={handleTileClick} data={AvailableSizes}/>

            </div>
                  


            {adminAddProductformControls.map((controlItem,index) =>
            controlItem.componentType === "input" ? (
              <InputComponent
              key={index}
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
                value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                key={index}
                label={controlItem.label}
                options={controlItem.options}
                value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : null
          )}      

<button
      
           onClick={handleAddProduct}
           className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
          >
          
             {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text={currentUpdatedProduct !== null ? 'Updating Product' : "Adding Product"}
                color={"#ffffff"}
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : currentUpdatedProduct !== null ? (
              "Update Product"
            ) : (
              "Add Product"
            )}

            </button>

          </div>
          </div>
          <Notification/>
          </div>
            
        
    )
}