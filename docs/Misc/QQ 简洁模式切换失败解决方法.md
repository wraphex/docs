# QQ 简洁模式切换失败解决方法

play 版 QQ (v8.2.11) 在切换简洁模式时，提示切换失败，或者开启/关闭失败

![Untitled](_assets/QQ%20简洁模式切换失败解决方法/Untitled.png)

尝试多次发现这个提示是在开关或者切换时转圈加载一定时间后弹出，初步判断是网络数据加载失败。

## 抓包分析

![响应头 302 Found](_assets/QQ%20简洁模式切换失败解决方法/Untitled%201.png)

响应头 302 Found

使用 fiddler 抓包，发现获取的一个数据包返回 302 ，返回`302 状态码`需要客户端重定向到响应头 Location 指定的 URL 。问题就出在这里，这个版本的 QQ 并没有重定向去加载，连接关闭，于是主题切换失败。

## 解决步骤

1. 以管理员启动 fiddler ，fiddler 默认没有启用远程连接，需要设置启用。
    
    ![Tools→Options→Connections](_assets/QQ%20简洁模式切换失败解决方法/Untitled%202.png)
    
    Tools→Options→Connections
    
2. 手机与电脑处于同一局域网，wifi 设置代理，主机名填电脑局域网 ip ，代理端口与上图端口相同，保存
    
    ![wifi 设置代理](_assets/QQ%20简洁模式切换失败解决方法/Screenshot_20220204-141646_相册.png)
    
    wifi 设置代理
    
3. fiddler 启动之后自动开了抓包，没开始的检查 File → Capture Traffic 勾选
    
    ![Untitled](_assets/QQ%20简洁模式切换失败解决方法/Untitled%203.png)
    
4. 切换一下主题，找到返回 302 Found 的包，这里的 Location 就是需要重定向的目标。
    
    ![Untitled](_assets/QQ%20简洁模式切换失败解决方法/Untitled%204.png)
    
5. 设置断点，在响应之后
    
    ![Untitled](_assets/QQ%20简洁模式切换失败解决方法/Untitled%205.png)
    
6. 再次尝试切换主题，可以看到 fiddler 截获到响应，右键 Location ，复制值
    
    ![Inked屏幕截图 2022-02-04 144107_LI.jpg](_assets/QQ%20简洁模式切换失败解决方法/Inked屏幕截图_2022-02-04_144107_LI.jpg)
    
7. 粘贴到浏览器，下载这个包，然后在 fiddler 选择响应，返回刚刚下载的包，然后 run to completion
    
    ![Untitled](_assets/QQ%20简洁模式切换失败解决方法/Untitled%206.png)
    
8. 可以看到包列表的暂停符号消失，此时已经把包传到 QQ
    
    ![Untitled](_assets/QQ%20简洁模式切换失败解决方法/Untitled%207.png)
    
9. 接下来还会有几个包需要进行同样的操作，这里就不重复了

## DONE

![Untitled](_assets/QQ%20简洁模式切换失败解决方法/Untitled%208.png)

## 参考

[使用httpcanary开启Play版QQ的简洁模式](https://www.coolapk.com/feed/32946253)

[fiddler之模拟响应、修改请求或响应数据（断点）](https://www.cnblogs.com/smallstone2018/p/9858004.html)

[302 Found - HTTP | MDN (mozilla.org) ](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/302)