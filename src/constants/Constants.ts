import { environment } from 'src/environments/environment.prod';

export  class Constant {
  public static URL_API = environment.backendIP + ":" + environment.backendPort;
  public static PREFIX = "api";

  //192.168.78.114:9999/API
  public static COMMON_URL = [Constant.URL_API, Constant.PREFIX].join('/');

  public static LOGIN_URL = [Constant.URL_API, Constant.PREFIX, 'auth', 'login'].join('/');

  public static REGISTER_URL = [Constant.URL_API, Constant.PREFIX, 'auth', 'register'].join('/');

}
