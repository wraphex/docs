# 模拟Airtag

## 前言

想低成本复刻 AirTag 功能？这套基于 nRF5x 芯片的开源方案（Heystack-nRF5x）是个不错的选择。原理就是利用 nRF5x 芯片模拟苹果“查找”网络的蓝牙广播协议。你只需先在电脑上生成好一套轮换密钥并烧录进固件，设备启动后就会不断广播这些加密信号，借助路过的苹果设备上报位置。除了硬件方案，Linux 也能通过底层接口直接发包实现类似功能，安卓由于系统限制了蓝牙原始数据的发送，目前不支持。

## nrf5x

### heystack-nrf5x 支持密钥轮换

```bash
git clone https://github.com/pix/heystack-nrf5x
```

```bash
python -m venv venv
```

```bash
source venv/bin/activate.fish
```

```bash
pip install intelhex cryptography
```

```bash
cd tools; python generate_keys.py; cd ..
```

#### 常见问题

##### nrf-sdk 未安装

> Unzip the relevant Nordic SDK and a compiler and place it in the `nrf-sdk` folder:
```
gcc-arm-none-eabi-6-2017-q2-update/ # Migth work with newer versions
nRF5_SDK_12.3.0_d7731ad/
nRF5_SDK_15.3.0_59ac345/
```

[https://developer.arm.com/downloads/-/gnu-rm](https://developer.arm.com/downloads/-/gnu-rm#panel11a)

[https://www.nordicsemi.com/Products/Development-software/nRF5-SDK/Download#infotabs](https://www.nordicsemi.com/Products/Development-software/nRF5-SDK/Download#infotabs)

##### 找不到mergehex

https://www.nordicsemi.com/Products/Development-tools/nrf-command-line-tools/download
下载[nrf-command-line-tools-10.24.2_linux-amd64.tar.gz](https://nsscprodmedia.blob.core.windows.net/prod/software-and-other-downloads/desktop-software/nrf-command-line-tools/sw/versions-10-x-x/10-24-2/nrf-command-line-tools-10.24.2_linux-amd64.tar.gz) 

添加里面的bin到path

```bash
set PATH $(pwd)/nrf-command-line-tools/bin $PATH
```

#### 编译安装

[pix版本](https://github.com/pix/heystack-nrf5x)（已验证）

```bash
paru -S tinyxxd
```

make时patch+flash

```bash
make -C nrf51822/armgcc GNU_INSTALL_ROOT=/path-to/heystack-nrf5x/nrf-sdk/gcc-arm-none-eabi-6-2017-q2-update ADV_KEYS_FILE=/path-to/_keyfile  stflash-nrf51822_xxac-patched
```

[laszloh分支](https://github.com/laszloh/heystack-nrf5x)

```bash
paru -S openocd
```

make时已经将python生成的密钥.h文件编译，不需要再patch

```bash
make nrf51822_xxac
```

```bash
openocd -f openocd.cfg -c "init; halt; nrf51 mass_erase; program nrf51822_xxac_s130_patched.bin; reset; exit”
```

### go-haystack 仅支持静态密钥

[hybridgroup/go-haystack](https://github.com/hybridgroup/go-haystack)

## Linux

[seemoo-lab/openhaystack](https://github.com/seemoo-lab/openhaystack/tree/main/Firmware/Linux_HCI)

## Android 不支持

安卓的蓝牙API不提供直接构造和发送原始、特定厂商广播包的底层控制

## 软件部署

要在非苹果设备上查看位置，需要部署一些软件/服务：

https://github.com/dchristl/macless-haystack

https://github.com/Dadoum/anisette-v3-server