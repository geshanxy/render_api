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
  }
}));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
