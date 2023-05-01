import { sendRequest } from "./send-request";
const BASE_URL = "/api/users";

// 🙋🏽 called by signUp function from utilities/users/users-service.js
export async function signUp(userData) {
    // 🙋🏽‍♂️ passing user data along to sendRequest function from utilities/users/send-request.js
    return sendRequest(BASE_URL, "POST", userData);
}

export async function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export async function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}
