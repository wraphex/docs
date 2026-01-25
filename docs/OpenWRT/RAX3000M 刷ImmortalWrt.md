# RAX3000M 刷ImmortalWrt

## 文件准备

下载 [https://firmware-selector.immortalwrt.org/](https://firmware-selector.immortalwrt.org/)

![image.png](_assets/RAX3000M%20刷ImmortalWrt/image.png)

![image.png](_assets/RAX3000M%20刷ImmortalWrt/image%201.png)

将uboot和preloader放到/tmp/

内核文件删掉版本号：immortalwrt-mediatek-filogic-cmcc_rax3000m-initramfs-recovery.itb

## 路由器

windows安装打开tftpd，将目录设置为immortalwrt-mediatek-filogic-cmcc_rax3000m-initramfs-recovery.itb所在目录

### mtd设置可写

```bash
opkg update
opkg install kmod-mtd-rw
insmod mtd-rw i_want_a_brick=1
```

### 刷写分区

刷BL2

```bash
mtd erase BL2
mtd write /tmp/immortalwrt-24.10.0-mediatek-filogic-cmcc_rax3000m-nand-preloader.bin BL2
mtd verify /tmp/immortalwrt-24.10.0-mediatek-filogic-cmcc_rax3000m-nand-preloader.bin BL2
```

刷FIP

```bash
mtd erase FIP
mtd write /tmp/immortalwrt-24.10.0-mediatek-filogic-cmcc_rax3000m-nand-bl31-uboot.fip FIP
mtd verify /tmp/immortalwrt-24.10.0-mediatek-filogic-cmcc_rax3000m-nand-bl31-uboot.fip FIP
```

> 注意：mtd verify应返回SUCCESS

重启

```bash
reboot
```

## 电脑

### tftpd

### 上传内核itb包

设置静态ip192.168.1.254，子网掩码255.255.255.0

观察tftpd上传进度条完成，路由器自动重启

取消静态ip，设置成动态ip

### 进入后台升级固件

192.168.1.1 →系统→备份与升级→**刷写新的固件**

选择Sysupgrade itb包，升级完重启即可正常使用

进入imoortalwrt后台升级sysupgrade itb镜像