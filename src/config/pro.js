// const HOST = "https://www.hwlljy.top"

// var URL = {};

// URL.BASE = HOST;
// URL.API = `${URL.BASE}/api`;
// URL.UPLOAD = `${URL.API}/user/uploadImg`
// URL.SOCKET = `wss://www.hwlljy.top/api/socket/msg`

// export default URL

const HOST = "http://localhost"

var URL = {};

URL.BASE = HOST;
URL.API = `${URL.BASE}/api`;
URL.UPLOAD = `${URL.API}/user/uploadImg`
URL.SOCKET = `ws://localhost:8899/socket/msg`

export default URL