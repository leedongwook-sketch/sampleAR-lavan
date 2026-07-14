// 프로덕션 next start(3100, http) 앞에 두는 HTTPS 리버스 프록시.
// 실기기 카메라/AR(getUserMedia)은 보안 컨텍스트(HTTPS)가 필요하므로 사용한다.
// 사용: node scripts/https-proxy.js  → https://<LAN-IP>:3443 (자체서명, 기기에서 경고 수락)
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const TARGET = { host: "127.0.0.1", port: 3100 };
const LISTEN_PORT = 3443;
const root = path.resolve(__dirname, "..");

const options = {
  key: fs.readFileSync(path.join(root, "certificates/localhost-key.pem")),
  cert: fs.readFileSync(path.join(root, "certificates/localhost.pem")),
};

const server = https.createServer(options, (req, res) => {
  const proxyReq = http.request(
    {
      host: TARGET.host,
      port: TARGET.port,
      path: req.url,
      method: req.method,
      headers: { ...req.headers, host: `${TARGET.host}:${TARGET.port}` },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    },
  );
  proxyReq.on("error", (e) => {
    res.writeHead(502, { "content-type": "text/plain" });
    res.end("proxy error: " + e.message);
  });
  req.pipe(proxyReq);
});

server.listen(LISTEN_PORT, "0.0.0.0", () => {
  console.log(`HTTPS proxy listening on :${LISTEN_PORT} -> http://${TARGET.host}:${TARGET.port}`);
});
