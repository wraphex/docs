# 抓包逆向Android BLE APP

## android

开发者模式开启蓝牙HCI日志，关开蓝牙

打开app，进行需要抓包的操作

日志存放于`/data/misc/bluetooth/logs/btsnoop_hci.log`，将其导出到电脑wireshark

## wireshark

过滤特定的 GATT 服务

设置过滤器`btatt.opcode == 0x12`（句柄 `0x0012` 的 ATT 流量）

下图从已选行开始为 暂停 播放 音量+1 音量+2 音量-1 音量-1

![](_assets/抓包逆向Android%20BLE%20APP/屏幕截图_20250302_221740.png)