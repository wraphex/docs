# 使用手机网络（简易CPE）

安装软件包

```
opkg install kmod-usb-net-rndis
```

重启

usb插上手机选择usb共享网络

添加新接口，协议选择DHCP客户端，设备选择usb0

![](_assets/使用手机网络（简易CPE）/Pasted%20image%2020260120013323.png)

添加新接口，协议选择DHCPv6客户端，设备选择@usb0（注意是接口别名，真实接口与接口别名的区别见[接口选择真实设备与别名区别](接口选择真实设备与别名区别.md)）

![](_assets/使用手机网络（简易CPE）/Pasted%20image%2020260120014618.png)

实测可以获取到一个ipv6地址，但获取不到ipv6pd，所以只能路由器有ipv6，终端没有ipv6，部署网站服务的话只能反向代理了