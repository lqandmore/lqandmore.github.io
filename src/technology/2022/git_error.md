```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@     WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!    @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:aSYUv+E7Jkv0pqArNJuqiVDHu/6NqDcmEZK0+hpgPA8.
Please contact your system administrator.
Add correct host key in /Users/xxx/.ssh/known_hosts to get rid of this message.
Offending RSA key in /Users/xxx/.ssh/known_hosts:1
Host key for git.duia.org.cn has changed and you have requested strict checking.
Host key verification failed.
fatal: 无法读取远程仓库。
```

会出现这个信息是因为在ssh第一次连接时，会生成一个认证，存储在客户端的/Users/xxx/.ssh/known_hosts中，但是如果服务器重启过了，认证也会随之更改，造成服务器和客户端不同步。  

因此只需要把电脑中的认证删除，连线时重新生成就可以解决。

输入命令：  

```
ssh-keygen -R 服务器地址或ip
example: ssh-keygen -R git.xx.com or 192.168.19.10
```

接下来重新使用git命令连接一次，会出现  

```
Are you sure you want to continue connecting (yes/no/[fingerprint])?  yes
```

输入yes 完成认证，这时就重新连接成功了。同时也生成了新的认证。  

