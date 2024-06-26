"use client"
import { registrationFormControls } from "@/utils";
import InputComponent from "@/components/Form/InputComponent";
import SelectComponent from "@/components/Form/SelectComponent";
import { useState } from "react";
import { registerNewUser } from "@/services/register";





const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};


function isFormValid(formData) {
  return formData &&
    formData.name &&
    formData.name.trim() !== "" &&
    formData.email &&
    formData.email.trim() !== "" &&
    formData.password &&
    formData.password.trim() !== ""
    ? true
    : false;
}

async function handleRegisterOnSubmit(f){
  console.log(f);
const data = await registerNewUser(f);
console.log(data);

}

export default function Register() {

  const [formData,setFormData]=useState(initialFormData);

    const isRegistered=false;



    return (
       
             <div className="bg-white w-full">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
          <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
          
        <p className="w-full text-4xl font-xxl text-center font-serif">  {
            isRegistered ?" Registration Successful":"Sign up for an account"

          }
</p>
<p>
  {isRegistered ? (
                <button
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
             
                >
                  Login
                </button>
              )
            :(<div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">


                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}

                        onChange={(e)=>{

                          e.preventDefault();
                          setFormData({
                            ...formData,
                            [controlItem.id]:e.target.value
                        })

                        console.log(e.target.value)
                        }}
                        value={formData[controlItem.id]}
                        label={controlItem.label}
                        
                      
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        label={controlItem.label}
                        
                        onChange={(e)=>{
                          
                          e.preventDefault();
                          setFormData({
                            ...formData,
                            [controlItem.id]:e.target.value
                        })
                       // console.log(e.target.value)
                        }}
                        value={formData[controlItem.id]}
                        
                        
                      />
                    ) : null
                  )} 


              <button
                  className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
                disabled={!isFormValid(formData)}
                onClick={()=>{handleRegisterOnSubmit(formData)}}
                >
                Register
                </button>


            </div>)

            }
          

          
          </p>
          
            </div>
          </div>
        </div>
      </div>
     
    </div>
        
    )
}

