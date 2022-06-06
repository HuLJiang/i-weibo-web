import devUrl from "./dev"
import proUrl from "./pro"

let BASE;

if(process.env.NODE_ENV === 'development') {
  BASE = devUrl;
}else {
  BASE = proUrl;
}

export default BASE;