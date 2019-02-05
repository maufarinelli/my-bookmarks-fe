import axios from "axios";
import xss from "xss";
import qs from "qs";

const URL = {
  BASE:
    process.env.NODE_ENV === "production"
      ? "http://142.93.6.7:3010/api"
      : "http://localhost:3010",
  LOGIN: "/login",
  ADD_BOOKMARK: "/add-bookmark",
  GET_BOOKMARKS: "/get-bookmarks",
  DELETE_BOOKMARK: "/delete-bookmark"
};

interface IUser {
  username: string;
  password: string;
}

interface IBookmark {
  url: string;
  category: string;
}

const postFunction = async (
  url: string,
  data: object,
  needAuth?: boolean
): Promise<any> => {
  try {
    const headers = needAuth
      ? {
          headers: { Authorization: "bearer " + getUserToken() }
        }
      : undefined;
    const response = await axios.post(url, data, headers);

    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }

    return response.data;
  } catch (error) {
    return { error };
  }
};

export async function login(userData: IUser) {
  try {
    const response = await axios.post(`${URL.BASE}${URL.LOGIN}`, userData);

    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }

    setUserToken(response.data.token);
    return response.data;
  } catch (error) {
    return { error };
  }
}

export async function addBookmark(data: IBookmark) {
  try {
    const response = await axios.post(`${URL.BASE}${URL.ADD_BOOKMARK}`, data, {
      headers: { Authorization: "bearer " + getUserToken() }
    });

    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }

    return response.data;
  } catch (error) {
    return { error };
  }
}

export async function getBookmarks(filters: {
  [key: string]: string;
}): Promise<any> {
  const clonedFilters = { ...filters };
  Object.keys(clonedFilters).forEach(key => {
    clonedFilters[key] = xss(clonedFilters[key].trim());

    if (clonedFilters[key] === "") {
      delete clonedFilters[key];
    }
  });

  const query = qs.stringify(clonedFilters);
  try {
    const response = await axios.get(
      `${URL.BASE}${URL.GET_BOOKMARKS}?${query}`,
      {
        headers: { Authorization: "bearer " + getUserToken() }
      }
    );

    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }

    return response.data;
  } catch (error) {
    return { error };
  }
}

export async function deleteBookmark(id: number) {
  try {
    // Using POST because DELETE in Axios is weird. Does not accept data and passing into the config was not working
    const response = await axios.post(
      `${URL.BASE}${URL.DELETE_BOOKMARK}`,
      { id },
      {
        headers: { Authorization: "bearer " + getUserToken() }
      }
    );

    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }

    return response.data;
  } catch (error) {
    return { error };
  }
}

export function getUserToken() {
  return window.localStorage.getItem("userToken");
}

export function removeUserToken() {
  return window.localStorage.removeItem("userToken");
}

export function setUserToken(token: string) {
  window.localStorage.setItem("userToken", token);
}
