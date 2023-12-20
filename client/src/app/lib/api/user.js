import AxiosCLient from "app/lib/axiosClient";

export async function userLogin(data) {
  return await AxiosCLient.fetchingWithData("post", "/user/login", data);
}

export async function userRegister(data) {
  return await AxiosCLient.fetchingWithData("post", "/user/register", data);
}
