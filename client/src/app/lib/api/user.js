import AxiosCLient from "app/lib/axiosClient";

export async function userLogin(data) {
  return await AxiosCLient.fetchingWithData("post", "/user/login", data);
}

export async function userLogout() {
  return await AxiosCLient.fetching("get", "/user/logout");
}

export async function userRegister(data) {
  return await AxiosCLient.fetchingWithData("post", "/user/register", data);
}

export async function userUpdate(data) {
  return await AxiosCLient.fetchingWithData("post", "/user/update", data);
}

export async function userCheckAuthen(data) {
  return await AxiosCLient.fetching("get", "/user/checkAuthen", data);
}

export async function userDelete(data) {
  return await AxiosCLient.fetchingWithData("post", "/user/delete", data);
}

export async function userGetAll(data) {
  return await AxiosCLient.fetching("get", "/user/getAll");
}

export async function userDetail(data) {
  return await AxiosCLient.fetchingWithData("post", "/user/getDetail", data);
}
