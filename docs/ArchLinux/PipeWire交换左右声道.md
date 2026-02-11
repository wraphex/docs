# ArchLinux - PipeWire交换左右声道

## pactl设置

1. 确定当前音频设备
    
    ```bash
    pactl get-default-sink
    ```
    
    此命令将返回当前默认的音频输出设备，例如：
    
    `alsa_output.pci-0000_00_1f.3.analog-stereo`
    
2. 创建声道交换的虚拟设备
    
    ```bash
    pactl load-module module-remap-sink \
      master=alsa_output.pci-0000_00_1f.3.analog-stereo \
      sink_name=reversed-stereo \
      channels=2 \
      channel_map=front-right,front-left
    ```
    
    请将 `master` 参数替换为你在第一步中获得的设备名称。
    
3. 设置为默认输出设备
    
    ```bash
    pactl set-default-sink reversed-stereo
    ```
    
4. 验证结果
    
    播放一个左右声道测试音频（如 [Audio Channel Test](https://www.youtube.com/watch?v=6TWJaFD6R2s)）来确认声道已成功交换。
    

### 恢复原状

要恢复原始音频设置，只需将默认设备设回原始设备：

```bash
pactl set-default-sink alsa_output.pci-0000_00_1f.3.analog-stereo
```

如需完全移除虚拟设备：

```bash
pactl unload-module module-remap-sink
```

## 永久化

### 使用 WirePlumber 配置

WirePlumber 是现代 PipeWire 默认的会话管理器，通过创建自定义配置片段可以实现永久化的声道交换。

1. 创建配置目录与文件
    
    在用户配置目录下为 WirePlumber 创建专用的配置片段文件：
    
    ```bash
    mkdir -p ~/.config/wireplumber/main.lua.d/
    nano ~/.config/wireplumber/main.lua.d/99-swap-channels.lua
    ```
    
2. 编写配置内容
    
    将以下 Lua 代码写入刚创建的文件中。**请务必将 `alsa_output.pci-0000_00_1f.3.analog-stereo` 替换为你实际的设备名**（可通过 `pactl get-default-sink` 命令获取）：
    
    ```
    rule = {
      matches = {
        {
          { "node.name", "equals", "alsa_output.pci-0000_00_1f.3.analog-stereo" },
        },
      },
      apply_properties = {
        ["audio.channel-map"] = "front-right,front-left",
      },
    }
    
    table.insert(alsa_monitor.rules, rule)
    ```
    
    - **`node.name`**：此属性应使用设备的持久化名称，基于硬件路径生成，重启后保持不变。
    - **`audio.channel-map`**：设置 `front-right,front-left` 即可实现左右声道互换。
3. 重启 WirePlumber 应用配置
    
    配置完成后，需要重启 WirePlumber 服务来加载新的设置：
    
    ```bash
    systemctl --user restart wireplumber
    ```
    
    此后，每次系统启动，你的默认音频设备都会自动应用声道交换设置。