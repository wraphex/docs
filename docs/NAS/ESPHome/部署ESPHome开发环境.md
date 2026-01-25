# 部署ESPHome开发环境

```yaml
services:
  esphome:
    container_name: esphome
    image: ghcr.nju.edu.cn/esphome/esphome
    volumes:
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
    restart: no
    privileged: true
    network_mode: host
```

## 参考

[安装docker](../Docker/安装Docker.md)

https://esphome.io/guides/getting_started_command_line/#esphome-device-builder-docker
