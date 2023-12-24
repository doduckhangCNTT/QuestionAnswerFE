import { getApi } from "../services/fetchData";
import { jwtDecode } from "jwt-decode";

export const checkTokenExp = async (token) => {
  if (token) {
    // console.log("Token: ", token);
    const decode = jwtDecode(token);
    // console.log("Decode: ", decode);

    if (decode.exp >= Date.now() / 1000) return;
    const res = await getApi("refresh_token");
    // await actionAuth.refreshAction(dispatch);
    // console.log("ACCESS_TOKEN: ", res.data);
    return res.data.access_token;
  } else {
    console.log("Lỗi");
  }
};
