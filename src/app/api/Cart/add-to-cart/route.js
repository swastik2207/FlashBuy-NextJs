import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";

import Joi from "joi";
import { NextResponse } from "next/server";

const AddToCart = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    


    if (isAuthUser) {
      const data = await req.json();
       console.log(data)
      const {productId , userId} = data;

      const { error } = AddToCart.validate({ userId, productId });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      console.log(productId, userId);

      const isCurrentCartItemAlreadyExists = await Cart.find({
        productID: productId,
        userID: userId,
      });

      console.log(isCurrentCartItemAlreadyExists);
      

      if (isCurrentCartItemAlreadyExists?.length > 0) {
        return NextResponse.json({
          success: false,
          message:
            "Product is already added in cart! Please add different product",
        });
      }

      const saveProductToCart = await Cart.create({
        productID:productId,
        userID:userId

      });

      console.log(saveProductToCart);

      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "Product is added to cart !",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add the product to cart ! Please try again.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}