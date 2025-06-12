// server.js

const express = require('express');
const fetch = require('node-fetch');
const app = express();

const TARGET_API_BASE = 'http://18.163.40.64:8091/config'; // 你的真实 API 地址

const PORT = process.env.PORT || 3000;

// 代理所有 /api 路径请求
app.use('/api', async (req, res) => {
  try {
    // 构造目标 URL
    const url = TARGET_API_BASE + req.originalUrl;

    // 转发请求，保留 method、headers、body（这里以简单处理 GET 请求为例，POST 可拓展）
    const fetchOptions = {
      method: req.method,
      headers: {...req.headers, host: new URL(TARGET_API_BASE).host},
      // POST、PUT等带body的请求需要处理
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      fetchOptions.body = req;
    }

    const response = await fetch(url, fetchOptions);

    // 把远端响应头、状态码复制回来
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // 把远端响应体流直接pipe到客户端
    response.body.pipe(res);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Proxy error');
  }
});

// 根路径简单返回
app.get('/', (req, res) => {
  res.send('Proxy server is running');
});

app.listen(PORT, () => {
  console.log(`Proxy server started on port ${PORT}`);
});

