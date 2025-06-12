const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api/config', createProxyMiddleware({
  target: 'http://18.163.40.64:8091',
  changeOrigin: true,
  pathRewrite: { '^/api/config': '/config' }
}));

app.use('/api', createProxyMiddleware({
  target: 'http://18.163.40.64:8091',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  },
  onProxyRes(proxyRes, req, res) {
    const location = proxyRes.headers['location'];
    if (location) {
      // 把重定向地址中的 http://18.163.40.64:8091 替换为你的代理地址
      const newLocation = location.replace('http://18.163.40.64:8091', 'https://你的代理地址/api');
      proxyRes.headers['location'] = newLocation;
    }
  }
}));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
