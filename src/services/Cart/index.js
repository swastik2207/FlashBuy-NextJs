import Cookies from "js-cookie";

export const addToCart = async (formData) => {
  try {
    console.log(formData)
    const res = await fetch("/api/Cart/add-to-cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllCartItems = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Cart/all-cart-products?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteFromCart = async (id) => {
  try {
    const res = await fetch(`/api/Cart/delete-from-cart?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};