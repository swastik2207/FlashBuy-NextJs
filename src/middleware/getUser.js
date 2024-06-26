import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const getUser = async (req) => {

  const token = Cookies.get("token");
  console.l


  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(token, "default_secret_key");
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default getUser;