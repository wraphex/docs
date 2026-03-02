# OpenWRT - 通过USB使用手机网络（简易CPE）

## 准备

带USB口的OpenWRT路由器

## 安装软件包

```
opkg install kmod-usb-net-rndis
```

重启路由器

usb插上手机选择usb共享网络

## 添加接口

### IPv4

添加新接口，协议选择DHCP客户端，设备选择usb0

![](_assets/通过USB使用手机网络（简易CPE）/Pasted%20image%2020260120013323.png)

### IPv6（可选）

添加新接口，协议选择DHCPv6客户端，设备选择@usb0（注意是接口别名，真实接口与接口别名的区别见[接口设备选择真实设备与设备别名区别](接口设备选择真实设备与设备别名区别.md)）

![](_assets/通过USB使用手机网络（简易CPE）/Pasted%20image%2020260120014618.png)

实测可以获取到一个IPv6地址，但没有分配IPv6-PD，所以只能路由器有IPv6，连接路由器的终端没有IPv6，部署网站服务的话只能反向代理了