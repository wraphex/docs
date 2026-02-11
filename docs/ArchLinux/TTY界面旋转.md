# ArchLinux - TTY界面旋转

> 前言：笔记本在未启动显示管理器或桌面环境前，通常只会在笔记本屏幕横屏显示TTY，外接屏幕没有输出。我的笔记本又是竖起来放的，如果要用TTY，就得歪着脖子看，所以用了下文的方法将TTY界面旋转。

## 方法1: GRUB设置

永久设置：在 `/etc/default/grub` GRUB_CMDLINE_LINUX_DEFAULT 行追加 `fbcon=rotate:<n>`

临时设置：在grub界面按e,在linux行末尾追加参数 `fbcon=rotate:<n>`

- n的取值
	- 0 - 正常方向（0度）
	- 1 - 顺时针方向（90度）
	- 2 - 上下颠倒方向（180度）
	- 3 - 逆时针方向（270度）

## 方法2: 系统文件设置

启动后通过将相同的数字 `echo` 到 `/sys/class/graphics/fbcon` 中找到的2个属性之一来随时更改角度

- rotate - 旋转活动控制台的显示
- rotate_all - 旋转所有控制台的显示

## 参考

> https://docs.linuxkernel.org.cn/fb/fbcon.html
