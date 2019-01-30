import axios from "axios";
import xss from "xss";
import qs from "qs";

const URL = {
  BASE:
    process.env.NODE_ENV === "production"
      ? "http://142.93.6.7:3010/api"
      : "http://localhost:3010",
  ADD_BOOKMARK: "/add-bookmark",
  GET_BOOKMARKS: "/get-bookmarks"
};

interface IBookmark {
  url: string;
  category: string;
}

export async function addBookmark(data: IBookmark) {
  try {
    const response = await axios.post(`${URL.BASE}${URL.ADD_BOOKMARK}`, data);

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
      `${URL.BASE}${URL.GET_BOOKMARKS}?${query}`
    );

    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }

    return response.data;
  } catch (error) {
    return { error };
  }
}
