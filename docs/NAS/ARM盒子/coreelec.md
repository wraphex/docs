# coreelec

## 进入coreelc

刷CM311-1a_安卓9-S905L3A没无线版Emotn UI桌面线刷包_new.img

插入20.1coreelc启动盘

```
adb connect [ip]
```

```
adb shell reboot update
```

ceemmc -x（超过20.1的会报错）

## 遥控器

/storage/.config/rc_keymaps/mbh

```
#table mbh, type: NEC

0x22dc KEY_POWER #电源
0x22ca KEY_UP #向上
0x2299 KEY_LEFT #向左
0x22c1 KEY_RIGHT #向右
0x22d2 KEY_DOWN #向下
0x2292 KEY_1
0x2293 KEY_2
0x22cc KEY_3
0x228e KEY_4
0x228f KEY_5
0x22c8 KEY_6
0x228a KEY_7
0x228d KEY_8
0x22c4 KEY_9
0x2287 KEY_0
0x22f0 KEY_DOT #M键/点号
0x22d0 KEY_BACKSPACE #删除
0x2288 KEY_HOME #主页
0x2282 KEY_CONTEXT_MENU #菜单
0x22ce KEY_ENTER #选中/确定
0x2295 KEY_ESC #返回
0x228d KEY_CONFIG #设置
0x22da KEY_STOP #按键区的电源键
0x2281 KEY_VOLUMEDOWN #音量-
0x2280 KEY_VOLUMEUP #音量+
0x229c KEY_MUTE #静音
0x2285 KEY_PLAYPAUSE #播放停止按键区的TV/AV键
```

/storage/.config/rc_maps.cfg
cp /storage/.config/rc_maps.cfg.sample /storage/.config/rc_maps.cfg

加一行meson-ir * mbh

执行ir-keytable -a /storage/.config/rc_maps.cfg -s rc0

## 蓝牙

/storage/.config/autostart.sh

```
#!/bin/bash
(
ln -s /lib/firmware/rtl_bt/rtl8761b_fw.bin /lib/firmware/rtlbt/rtl8761b_fw
ln -s /lib/firmware/rtl_bt/rtl8761b_config.bin /lib/firmware/rtlbt/rtl8761b_config
rtk_hciattach -n -s 115200 ttyS1 rtk_h5 2000000 &
rfkill block 0
rfkill unblock 0
)&
```

重映射

[https://post.smzdm.com/p/ag873e3m/](https://post.smzdm.com/p/ag873e3m/)