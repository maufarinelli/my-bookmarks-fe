export interface IUser {
  username: string;
  password: string;
}

export interface IBookmark {
  url: string;
  category: string;
}

export interface ILoginResponse {
  user: IUser & {
    email: string;
    id: string;
  };
  message: string;
  token: string;
}

export interface IAddBookmarkResponse extends IBookmark {
  message: string;
}

export interface IGetBookmarksResponse extends IBookmark {
  id: string;
}
