import devUrl from "./dev"
import proUrl from "./pro"

let BASE_URL;

if(process.env.NODE_ENV === 'development') {
  BASE_URL = devUrl;
}else {
  BASE_URL = proUrl;
}

export default BASE_URL;