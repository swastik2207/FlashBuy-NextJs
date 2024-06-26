import Cookies from "js-cookie";


export const addNewProduct = async(formData)=>{


    try {
      console.log("hello");
      console.log(Cookies.get("token"))
        const response = await fetch("/api/Admin/Add-Product", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body:JSON.stringify(formData)
        });
    
        const finalData = await response.json();
        console.log(finalData)
    
        return finalData;
      } catch (e) {
    console.log("error", e);
      }
}


export const getAllProducts=async()=>{
  
  try{
  
  const response = await fetch("http://localhost:3000/api/Admin/All-Products",{
    method:"GET",
    cache: "no-store",
   
    }
  )
  const finalData=await response.json();
  return finalData

  }
  catch(e){
    console.log("error  ",e);

  }
}

export const updateAProduct=async(formData)=>{
  try{


    const res = await fetch("/api/Admin/Update-Product", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;

  }
  catch(e){
    console.log("error",e);
  }
}


export const productById = async (id) => {
  try {
    console.log(id);
    const res = await fetch(
      `http://localhost:3000/api/Admin/Product-By-Id?id=${id}`,

      {
        method: "GET",
        cache: "no-store",
      }
    );


    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productByCategory=async(category)=>{
  try{
    const res=await fetch(`http://localhost:3000/api/Admin/Product-By-Category?category=${category}`,
      {
        method:"GET",
        cache:"no-store",
      }
    );

    const data= await res.json();
    return data
  }
  catch(e){
    console.log(e);
  }

}