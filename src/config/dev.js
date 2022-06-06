const HOST = "http://localhost:8083"

var URL = {};

URL.BASE = HOST;
URL.API = `${URL.BASE}/api`;
URL.UPLOAD = `${URL.API}/user/uploadImg`
URL.SOCKET = `ws://localhost:8899/socket/msg`

export default URL