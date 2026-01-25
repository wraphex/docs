# frp不支持cdn(http)加速

## 结论

cdn仅支持使用http/https方式回源，frp 客户端服务端通信默认用的tcp：[https://gofrp.org/zh-cn/docs/features/common/network/network/](https://gofrp.org/zh-cn/docs/features/common/network/network/)，即使在frpc.toml指定transport.protocol = "websocket"，也需要cdn支持tcp流量

- https://github.com/fatedier/frp/issues/2728
- https://github.com/fatedier/frp/issues/4683

## 保留现场

frpc.toml

```toml
serverAddr = "[frp.weihao.qzz.io](http://frp.weihao.qzz.io/)"
serverPort = 80 #（80是http端口，cdn设置回源到下面frps的7000端口）
transport.protocol = "websocket"
```

frps.toml

```toml
bindPort = 7000
```

设置cdn回源到7000

nginx websocket反代

```
server {
    listen 7001;
    listen [::]:7001;
    server_name frp.weihao.qzz.io;
    location / {
        proxy_pass <http://127.0.0.1:7000>;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    access_log /var/log/nginx/frp.access.log;
    error_log /var/log/nginx/frp.error.log;
}

```

结果:connection reset by peer

```
2025-11-05 22:00:45.304 [I] [sub/root.go:149] start frpc service for config file [frpc.toml]
2025-11-05 22:00:45.304 [I] [client/service.go:325] try to connect to server...
2025-11-05 22:00:45.394 [W] [client/service.go:328] connect to server error: read tcp [2409:xxxx::3]:38120->[240d:xxxx::a2]:80: read: connection reset by peer
2025-11-05 22:00:45.394 [I] [sub/root.go:167] frpc service for config file [frpc.toml] stopped
login to the server failed: read tcp [2409:xxxx::3]:38120->[240d:xxxx::a2]:80: read: connection reset by peer. With loginFailExit enabled, no additional retries will be attempted
```