"use client"
import { loginFormControls } from "@/utils"
import InputComponent from "@/components/Form/InputComponent"
import SelectComponent from "@/components/Form/SelectComponent"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { login } from "@/services/login"
import { GlobalContext } from "@/context"
import Cookies from "js-cookie";
import ComponentLevelLoader from "@/components/Loader/ComponentLoader"
import { toast } from "react-toastify";
import Notification from "@/components/Notification"



const initialFormData={
  email: "",
  password:""
}



function isValidForm( formData) {
  return formData &&
    formData.email &&
    formData.email.trim() !== "" &&
    formData.password &&
    formData.password.trim() !== ""
    ? true
    : false;
}

export default function Login(){

const [formData,setFormData]=useState(initialFormData)


const router=useRouter();

  


    const {
      isAuthUser,
      setIsAuthUser ,
      user,
      setUser ,
      componentLevelLoader,
      setComponentLevelLoader
    }=useContext(GlobalContext)

  

    async function handleLogin(e){
      e.preventDefault();
      setComponentLevelLoader({loading:"true"})
      const res=await login(formData);
    if(res.success){
    
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      console.log(res?.finalData?.user);
      setFormData(initialFormData);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem('user',JSON.stringify(res?.finalData?.user));
      console.log(user);
      setComponentLevelLoader({loading:false})
      router.push("/")
   
    }else{

    }
   
      

    }


   


    return(

      <div className="ml-15 bg-white relative">
      <div className=" ml-50 flex flex-row items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 ">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 ">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 ">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
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
                  ) : null
              )}
                <button
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                  disabled={!isValidForm(formData)}
                  onClick={handleLogin}
                >
                 {
                  componentLevelLoader && componentLevelLoader.loading ? <ComponentLevelLoader
                  text={"logging in"}
                  color={"#ffffff"}


                  />:'Login'
                 }
                </button>
                <div className="flex flex-col gap-2">
                  <p>New to website ?</p>
                  <button
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                    onClick={() => router.push("/register")}
                  >
                  Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification/>
      </div>
    
  
     
    )
}