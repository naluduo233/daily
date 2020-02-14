const http = require("http");
const request = require("request");

const hostname = "127.0.0.1";
const port = 9010;
const imgPort = 9011;

// 创建一个 API 代理服务
const apiServer = http.createServer((req, res) => {
  const url = "http://news-at.zhihu.com/api/4" + req.url;
  // const url = "https://cn.bing.com/?mkt=zh-CN";
  const options = {
    url: url
  };

  function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      // 设置编码类型，否则中文会显示为乱码
      res.setHeader("Content-Type", "text/plain;charset=UTF-8");
      // 设置所有域允许跨域
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.end(body);
    }
  }
  request.get(options, callback);
});

apiServer.listen(port, hostname, () => {
  console.log(`接口代理运行在 http://${hostname}:${port}/`);
});

// 创建一个图片代理服务
const imgServer = http.createServer((req, res) => {
  const url = req.url.split("/img/")[1];
  // const url = "https://pic4.zhimg.com" + req.url.split("/img/")[1];
  console.log(url);
  const options = {
    url: url,
    encoding: null
  };

  function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      const contentType = response.headers["content-type"];
      res.setHeader("Content-Type", contentType);
      res.setHeader("Access-Control-Allow-origin", "*");
      res.end(body);
      // console.log(body);
    }
  }
  request.get(options, callback);
});

imgServer.listen(imgPort, hostname, () => {
  console.log(`图片代理运行在 http://${hostname}:${imgPort}/`);
});
