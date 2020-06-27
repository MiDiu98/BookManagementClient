import { environment } from 'src/environments/environment.prod';

export class Constant {
  public static URL_API = environment.backendIP + ":" + environment.backendPort;
  public static PREFIX = "api";
  //public static URL_API = "https://bookmanagement9892.herokuapp.com";

  public static COMMON_URL = [Constant.URL_API, Constant.PREFIX].join('/');

  public static LOGIN_URL = [Constant.URL_API, Constant.PREFIX, 'auth', 'login'].join('/');

  public static REGISTER_URL = [Constant.URL_API, Constant.PREFIX, 'auth', 'register'].join('/');

  public static BOOK_URL = [Constant.URL_API, Constant.PREFIX, 'books'].join('/');

  public static USER_URL = [Constant.URL_API, Constant.PREFIX, 'users'].join('/');

  public static COMMENT_URL = [Constant.URL_API, Constant.PREFIX, 'comments'].join('/');

  // public static COMMON_URL = [Constant.URL_API, Constant.PREFIX].join('/');

  // public static LOGIN_URL = [Constant.URL_API, Constant.PREFIX, 'auth', 'login'].join('/');

  // public static REGISTER_URL = [Constant.URL_API, Constant.PREFIX, 'auth', 'register'].join('/');

}
