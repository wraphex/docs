# 常用adb命令

## 查看当前activity

```Bash
adb shell dumpsys window | grep mCurrentFocus
```

## 查看进程

```Bash
adb shell ps -A | grep xxx
```

## 关闭分区验证

```Bash
adb root && adb disable-verity && adb remount
```

## 启动指定Activity

```Bash
adb shell am start xx.xx/.XXActivity
```

## 应用列表

```Bash
adb shell pm list package -f
```

## 应用位置

```Bash
adb shell pm path com.
```

## 启用/禁用应用

```Bash
adb shell pm enable
```

```Bash
adb shell pm disable-user
```

## 设备型号

```Bash
adb shell getprop | grep product
```

## 包版本

```Bash
adb shell dumpsys package com.xx | grep version
```

## 固件日期

```Bash
adb shell getprop | grep build.date
```

## 时间

```Bash
adb root && date "+%m%d%H%M%Y.%S" | xargs adb shell date
```

## 重启所有进程/服务（软重启）

```Bash
adb shell "stop && start"
```

## 重启adb服务

```Bash
adb kill-server && adb start-server
```

## 关机

```Bash
adb reboot -p
```

## 模拟辅助显示设备

```Bash
#开启
adb shell "settings put global overlay_display_devices '1920x1080/320'"
#关闭
adb shell "settings put global overlay_display_devices ''"
```

## 设置竖屏

```Bash
adb shell settings put system user_rotation 0
```

## 设置横屏

```Bash
adb shell settings put system user_rotation 1
```

## 分辨率

```Bash
adb shell wm size 1600x2560
```

## DPI

```Bash
adb shell wm density 256
```

## 刷新依赖

```Bash
./gradlew build --refresh-dependencies
```
