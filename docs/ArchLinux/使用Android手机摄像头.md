# Linux - 使用Android手机摄像头

## 配置Linux虚拟摄像头

### 环境

[https://wiki.archlinux.org/title/V4l2loopback](https://wiki.archlinux.org/title/V4l2loopback)

> Install the v4l2loopback-dkms package and the headers for the target kernel/kernels (see Dynamic Kernel Module Support#Installation). For example, for the default linux kernel this would be linux-headers.

```bash
paru -S linux-headers v4l2loopback-dkms
```

动态加载v4l2模块，会创建一个虚拟摄像头/dev/videoN

```bash
sudo modprobe v4l2loopback
```

查看是否配置成功

```bash
v4l2-ctl --list-devices
```

出现类似 (platform:v4l2loopback-000)的设备即成功

## 连接到Android摄像头

### 方法1:scrcpy

```bash
paru -S scrcpy
```

[https://github.com/Genymobile/scrcpy/tree/master#user-documentation](https://github.com/Genymobile/scrcpy/tree/master#user-documentation)

```bash
scrcpy --video-source=camera --camera-{facing=back,size=1920x1080,fps=30} --video-codec=h264 --v4l2-sink=/dev/video4 --v4l2-buffer=300 --no-window --no-audio
```

### 方法2:droidcam类应用

```bash
paru -S droidcam
```

## 对比

|                | 不需要手机APP | 不限制分辨率 | 不需要adb调试 |
| -------------- | ------------- | ------------ | ------------- |
| scrcpy         | ✅            | ✅           | ❌            |
| droidcam类应用 | ❌            | ❌           | ✅            |

## Android原生支持（Android 14-QPR1+）

[https://source.android.google.cn/docs/core/camera/webcam?hl=zh-cn](https://source.android.google.cn/docs/core/camera/webcam?hl=zh-cn)