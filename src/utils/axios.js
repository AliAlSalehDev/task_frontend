import axios from "axios";
import { useAuthStore } from "@/stores/auth.store.js";

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //console.log(error);
        const { user, logout } = useAuthStore();
        if ([401, 403].includes(error?.response?.status) && user) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            logout();
        }
        return Promise.reject(error);
    }
);

export const sender = {
    get: request("GET"),
    post: request("POST"),
    patch: request("PATCH"),
    delete: request("DELETE"),
};

// Define URL
const baseUrl = `${import.meta.env.VITE_API_URL}`;

function request(method) {
    return async (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url),
        };

        if (body) {
            requestOptions.body = JSON.stringify(body);
        }

        requestOptions.headers["Content-Type"] = "application/json";
        // requestOptions.headers["Accept"] = "application/*";

        try {
            return axios({
                url: `${baseUrl + url}`,
                method: method,
                data: body,
                headers: requestOptions.headers,
            }).then(handleResponse);
        } catch (err) {
            //console.log(err);
            // console.log(err)
        }

        // return fetch(`${baseUrl + url}`, requestOptions).then(handleResponse);
    };
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    // const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

async function handleResponse(response) {
    const isJson = response.headers
        ?.get("content-type")
        ?.includes("application/json");
    // const data = isJson ? await response.json() : null;
    const data = response.data;

    // check for error response
    if (response.status !== 200 && response.status !== 201) {
        const { user, logout } = useAuthStore();
        if ([401, 403].includes(response.status) && user) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            logout();
        }

        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(response);
    }

    return data;
}
