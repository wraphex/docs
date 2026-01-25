# DLNA 音频推流（uPnP Renderer）

## 实现方案

MPD+Upmpdcli+PipeWire

## 安装

```bash
paru -S mpd upmpdcli
```

PipeWire配置参考[声音](/Linux/声音.md)

/etc/mpd.conf

```
bind_to_address "localhost"
port "6600"

audio_output {
    type                "pipewire"
    name                "PipeWire Output"
    auto_resample       "no"
    use_mmap            "yes"
    buffer_time         "300000"
    period_time         "5084"
    device              "hw:1,0"
}
```

音频底层框架用的PipeWire，默认运行于用户空间，所以mpd也要运行于用户空间

```bash
systemctl --user enable --now mpd
```

```bash
systemctl --user enable --now upmpdcli
```

[用户级服务开机自启动解决方案](/Linux/用户级服务开机自启动解决方案.md)

## 问题

播放在线音频有时会静音，可能是网络问题，但是即使设置了3s的buffer_time，也会报错

```bash
pipewire_output: Decoder is too slow; playing silence to avoid xrun
```

[https://github.com/MusicPlayerDaemon/MPD/issues/1630](https://github.com/MusicPlayerDaemon/MPD/issues/1630)

考虑换到MinimServer：需要安装xorg相关的包，aur包，版本旧

## 参考

[https://cn.linux-terminal.com/?p=8827](https://cn.linux-terminal.com/?p=8827)

[https://wiki.archlinux.org.cn/title/Music_Player_Daemon](https://wiki.archlinux.org.cn/title/Music_Player_Daemon)

[https://wiki.archlinuxcn.org/wiki/PipeWire](https://wiki.archlinuxcn.org/wiki/PipeWire)[https://github.com/MusicPlayerDaemon/MPD/issues/1263](https://github.com/MusicPlayerDaemon/MPD/issues/1263)

[https://linux.die.net/man/5/mpd.conf](https://linux.die.net/man/5/mpd.conf)

[https://github.com/MusicPlayerDaemon/MPD/issues/1263](https://github.com/MusicPlayerDaemon/MPD/issues/1263)