// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 目标API地址
const target = 'http://18.163.40.64:8091/config';

app.use('/api', createProxyMiddleware({
  target,
  changeOrigin: true,
  pathRewrite: { '^/api': '/config' },  // 将 /api 替换成 /config
  secure: false,  // 如果是自签证书，可以用这个绕过
}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy listening on port ${port}`));
