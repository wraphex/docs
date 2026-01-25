# cm311-1a 刷 Armbian

## 刷Armbian

[https://www.bilibili.com/opus/796291176075362422](https://www.bilibili.com/opus/796291176075362422)

[https://github.com/ophub/amlogic-s9xxx-armbian/issues/1378#issuecomment-1537691718](https://github.com/ophub/amlogic-s9xxx-armbian/issues/1378#issuecomment-1537691718)

修改apt源 armbian-apt

安装到emmc armbian-install

断电重启

## 配置蓝牙

### 安装蓝牙软件包

[https://github.com/ophub/amlogic-s9xxx-armbian/issues/2842](https://github.com/ophub/amlogic-s9xxx-armbian/issues/2842)

```bash
apt-get -y install bluetooth bluez bluez-tools
```

### 下载配置rtk_hciattach

#### 下载

 [https://github.com/ophub/amlogic-s9xxx-armbian/issues/1513#issuecomment-1614173378](https://github.com/ophub/amlogic-s9xxx-armbian/issues/1513#issuecomment-1614173378)

[https://github.com/armbian/build/blob/main/packages/bsp/rk322x/rtk_hciattach](https://github.com/armbian/build/blob/main/packages/bsp/rk322x/rtk_hciattach)

放到/usr/bin/,`chmod +x rtk_hciattach`

#### 配置

 [https://github.com/ophub/amlogic-s9xxx-armbian/issues/1539](https://github.com/ophub/amlogic-s9xxx-armbian/issues/1539)

```bash
apt-get install libc6-armhf-cross
ln -s  /usr/arm-linux-gnueabihf/lib/ld-linux-armhf.so.3 /lib/ld-linux-armhf.so.3
ln -s  /usr/arm-linux-gnueabihf/lib/libc.so.6 /lib/libc.so.6
```

/etc/custom_service/start_service.sh 追加：

```bash
#bluetooth
/usr/bin/rtk_hciattach -n -s 115200 ttyAML1 rtk_h5 &
#bluetooth reset
gpioset -s 1 -m time 0 82=0
gpioset 0 82=1
```

#### 问题

配置rtk_hciattach后蓝牙服务未能自启动，hciconfig无输出

```bash
root@armbian:~# systemctl status bluetooth.service 
○ bluetooth.service - Bluetooth service
     Loaded: loaded (/usr/lib/systemd/system/bluetooth.service; enabled; preset: enabled)
     Active: inactive (dead)
       Docs: man:bluetoothd(8)
root@armbian:~# hciconfig

```

手动执行

```bash
root@armbian:~# /usr/bin/rtk_hciattach -n -s 115200 ttyAML1 rtk_h5
Realtek Bluetooth init uart with init speed:115200, final_speed:115200, type:HCI UART H5
Realtek Bluetooth :Realtek hciattach version 3.1 

Realtek Bluetooth :3-wire sync pattern resend : 1, len: 0

#...2~39

Realtek Bluetooth :3-wire sync pattern resend : 40, len: 0

Realtek Bluetooth ERROR: H5 sync timed out

```

手动启动bluetooth.service

```bash
root@armbian:~# systemctl start bluetooth.service 
root@armbian:~# systemctl status bluetooth.service 
● bluetooth.service - Bluetooth service
     Loaded: loaded (/usr/lib/systemd/system/bluetooth.service; enabled; preset: enabled)
     Active: active (running) since Wed 2025-03-19 14:08:31 CST; 1min 13s ago
       Docs: man:bluetoothd(8)
   Main PID: 1955 (bluetoothd)
     Status: "Running"
      Tasks: 1 (limit: 1997)
     Memory: 2.8M (peak: 3.1M)
        CPU: 85ms
     CGroup: /system.slice/bluetooth.service
             └─1955 /usr/libexec/bluetooth/bluetoothd

Mar 19 14:08:31 armbian systemd[1]: Started bluetooth.service - Bluetooth service.
Mar 19 14:08:31 armbian bluetoothd[1955]: Starting SDP server
Mar 19 14:08:31 armbian bluetoothd[1955]: src/plugin.c:plugin_init() System does not support csip plugin
Mar 19 14:08:31 armbian bluetoothd[1955]: profiles/audio/micp.c:micp_init() D-Bus experimental not enabled
Mar 19 14:08:31 armbian bluetoothd[1955]: src/plugin.c:plugin_init() System does not support micp plugin
Mar 19 14:08:31 armbian bluetoothd[1955]: src/plugin.c:plugin_init() System does not support vcp plugin
Mar 19 14:08:31 armbian bluetoothd[1955]: src/plugin.c:plugin_init() System does not support mcp plugin
Mar 19 14:08:31 armbian bluetoothd[1955]: src/plugin.c:plugin_init() System does not support bass plugin
Mar 19 14:08:31 armbian bluetoothd[1955]: src/plugin.c:plugin_init() System does not support bap plugin
Mar 19 14:08:31 armbian bluetoothd[1955]: Bluetooth management interface 1.22 initialized
```

hciconfig仍无输出

dmesg

```bash
root@armbian:~# dmesg | grep Bluetooth
[   26.539611] Bluetooth: Core ver 2.22
[   26.541988] Bluetooth: Starting self testing
[   26.556397] Bluetooth: ECDH test passed in 11767 usecs
[   26.562823] Bluetooth: SMP test passed in 3886 usecs
[   26.565177] Bluetooth: Finished self testing
[   26.573937] Bluetooth: HCI device and connection manager initialized
[   26.580249] Bluetooth: HCI socket layer initialized
[   26.585105] Bluetooth: L2CAP socket layer initialized
[   26.590103] Bluetooth: SCO socket layer initialized
[   26.607461] Bluetooth: HCI UART driver ver 2.3
[   26.609662] Bluetooth: HCI UART protocol H4 registered
[   26.613534] Bluetooth: HCI UART protocol BCSP registered
[   26.618952] Bluetooth: HCI UART protocol LL registered
[   26.623931] Bluetooth: HCI UART protocol ATH3K registered
[   26.629363] Bluetooth: HCI UART protocol Three-wire (H5) registered
[   26.635728] Bluetooth: HCI UART protocol Intel registered
[   26.641142] Bluetooth: HCI UART protocol Broadcom registered
[   26.646477] Bluetooth: HCI UART protocol QCA registered
[   26.651575] Bluetooth: HCI UART protocol AG6XX registered
[   26.657065] Bluetooth: HCI UART protocol Marvell registered
[ 1252.567113] Bluetooth: BNEP (Ethernet Emulation) ver 1.3
[ 1252.569659] Bluetooth: BNEP filters: protocol multicast
[ 1252.574487] Bluetooth: BNEP socket layer initialized
```

取消 /etc/custom_service/start_service.sh 的rtk_hciattach，断电重启手动执行 /usr/bin/rtk_hciattach -n -s 115200 ttyAML1 rtk_h5：

```bash
root@armbian:~# /usr/bin/rtk_hciattach -n -s 115200 ttyAML1 rtk_h5
Realtek Bluetooth init uart with init speed:115200, final_speed:115200, type:HCI UART H5
Realtek Bluetooth :Realtek hciattach version 3.1 

Realtek Bluetooth :3-wire sync pattern resend : 1, len: 8

Realtek Bluetooth :Get SYNC Resp Pkt

Realtek Bluetooth :3-wire config pattern resend : 1 , len: 10
Realtek Bluetooth :Get SYNC pkt-active mode

Realtek Bluetooth :Get SYNC pkt-active mode

Realtek Bluetooth :Get CONFG pkt-active mode

Realtek Bluetooth :3-wire config pattern resend : 2 , len: 10
Realtek Bluetooth :Get CONFG resp pkt-active mode

Realtek Bluetooth :H5 init finished

Realtek Bluetooth :RTK send HCI_VENDOR_READ_RTK_ROM_VERISION_Command

Realtek Bluetooth :Received reliable seqno 0 from card
Realtek Bluetooth :receive hci command complete event with command:1001

Realtek Bluetooth :Read Local Version Information with Status:0
Realtek Bluetooth :HCI Version 0x0a
Realtek Bluetooth :HCI Revision 0x000b
Realtek Bluetooth :LMP Subversion 0x8761
Realtek Bluetooth :RTK send HCI_VENDOR_READ_RTK_ROM_VERISION_Command

Realtek Bluetooth :Received reliable seqno 1 from card
Realtek Bluetooth :receive hci command complete event with command:fc6d

Realtek Bluetooth :Read RTK rom version with Status:0
Realtek Bluetooth :LMP Subversion 0x8761
Realtek Bluetooth :EVersion 1
Realtek Bluetooth :IC: RTL8761ATV

Realtek Bluetooth :Firmware/config: rtl8761a_fw, rtl8761a_config

Realtek Bluetooth :config baud rate to :4928002, hwflowcontrol:5f, 1
Realtek Bluetooth :Get config baud rate from config file:4928002
Realtek Bluetooth :Load FW OK
Realtek Bluetooth :rtk_get_fw_project_id: opcode 0, len 1, data 14
Realtek Bluetooth ERROR: lmp_subver 8761, project id 0000, mismatch

Realtek Bluetooth :Total len 0 for fw/config
Realtek Bluetooth :baudrate in change speed command: 0x2 0x80 0x92 0x4 

Realtek Bluetooth :Received reliable seqno 2 from card
Realtek Bluetooth :receive hci command complete event with command:fc17

Realtek Bluetooth :Change BD Rate with status:0
Realtek Bluetooth :final_speed 1500000

Realtek Bluetooth :hw flow control enable
Realtek Bluetooth :Init Process finished
Realtek Bluetooth post process
Device setup complete
```

### 参考

> [https://bbs.hassbian.com/thread-17964-1-1.html](https://bbs.hassbian.com/thread-17964-1-1.html)
> 
> 
> [https://post.smzdm.com/p/a8xm0rkq/](https://post.smzdm.com/p/a8xm0rkq/)
> 

## HomeAssistant

armbian-software → Docker

docker run -d --name homeassistant -v /etc/localtime:/etc/localtime:ro -v /storage/hassio/homeassistant:/config -v /run/dbus:/run/dbus:ro --network host --restart unless-stopped ghcr.nju.edu.cn/home-assistant/qemuarm-64-homeassistant:2025.3.0

## LED

获取可用事件来源

```bash
cat /sys/class/leds/power_led/trigger
```

```bash
echo heartbeat > /sys/class/leds/power_led/trigger
```