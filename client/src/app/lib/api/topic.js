import AxiosCLient from "app/lib/axiosClient";

export async function topicCreate(data) {
  return await AxiosCLient.fetchingWithData("post", "/topic/register", data);
}

export async function topicEnroll(data) {
  return await AxiosCLient.fetchingWithData("post", "/topic/enroll", data);
}

export async function topicUpdate(data) {
  return await AxiosCLient.fetchingWithData("post", "/topic/update", data);
}

export async function topicDelete(data) {
  return await AxiosCLient.fetchingWithData("post", "/topic/delete", data);
}

export async function topicGetAll() {
  return await AxiosCLient.fetching("get", "/topic/getAll");
}

export async function topicDetail(data) {
  return await AxiosCLient.fetchingWithData("post", "/topic/getDetail", data);
}

export async function topicApprove(data) {
  return await AxiosCLient.fetchingWithData("post", "/topic/approve", data);
}

export async function topicAssign(data) {
  return await AxiosCLient.fetchingWithData("post", "/topic/teacherAssign", data);
}
