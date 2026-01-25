# ipv6-PD补丁

解决光猫dhcp过期更新ipv6地址时，未分配PD前缀给路由器问题

```bash
#!/bin/sh
# 脚本位于 /etc/hotplug.d/iface/99-retry-ipv6pd
# 在wan6接口启动或更新时触发
[ "$INTERFACE" = "wan6" ] || exit 0
[ "$ACTION" = "ifup" -o "$ACTION" = "ifupdate" ] || exit 0

logger -t "IPv6-PD" "检测到wan6接口事件: $ACTION，开始检查PD状态..."

sleep 10

# 检查IPv6 PD前缀是否存在
if ip -6 addr show dev br-lan | grep -q "240"; then
    logger -t "IPv6-PD" "IPv6 PD前缀正常存在。"
else
    logger -t "IPv6-PD" "IPv6 PD前缀丢失，正在重启wan6..."
    ifdown wan6 && ifup wan6
    logger -t "IPv6-PD" "wan6已重启。"
fi

```