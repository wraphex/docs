# ArchLinux - Fcitx5 输入法配置

使用 Fcitx5 搭配 雾凇拼音，在 Arch Linux 上打造流畅的中文输入体验。

## Fcitx5

### 安装Fcitx5软件包组

```bash
paru -S fcitx5-im
```

### KDE（Wayland）下配置虚拟键盘启动器

（其他环境参考[wiki](https://wiki.archlinuxcn.org/wiki/Fcitx_5)）

系统设置 - 输入与输出 - 键盘 - 虚拟键盘，选择 `Fcitx 5 Wayland 启动器`

## 雾凇拼音

雾凇拼音提供了现代化的词库和默认配置。

### 安装

```bash
paru -S rime-ice-pinyin-git
```

如果需要其他方案（如五笔、双拼等），可查看变体： https://aur.archlinux.org/pkgbase/rime-ice-git

### 启用

1. 系统设置 - 输入法 - 添加中州韵（Rime）输入法；
2. 启动Fcitx5；

### 自定义配置：删除 F4 快捷键

雾凇拼音默认将 `F4` 绑定为“切换输入方案”，这在很多软件中会产生冲突。我们需要通过**用户配置覆盖系统配置**的方式来移除它。

> 原理：Rime 会优先读取用户目录 (`~/.local/share/fcitx5/rime/`) 下的配置文件。只要将系统的配置文件复制一份到用户目录并修改，即可在不影响系统文件的情况下实现自定义。

#### 复制配置文件

执行以下命令，将包含快捷键定义的系统文件复制到用户目录：

```bash
# 确保用户配置目录存在
mkdir -p ~/.local/share/fcitx5/rime/

# 复制 rime_ice_suggestion.yaml (这是雾凇的核心补丁文件，包含 F4 定义)
cp /usr/share/rime-data/rime_ice_suggestion.yaml ~/.local/share/fcitx5/rime/
```

#### 编辑并删除 F4

使用文本编辑器打开刚刚复制的文件`~/.local/share/fcitx5/rime/rime_ice_suggestion.yaml`，找到`switcher` - `hotkeys`，删除`- F4`行。

#### 重新部署配置

右键点击托盘区的键盘图标 - 选择`重新部署`。

部署完成后，尝试在输入框激活输入法并按下 `F4`，此时应不再触发方案切换，冲突解决。
