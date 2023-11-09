#### [固态硬盘无法格式化解决方案](https://www.likecs.com/show-203562992.html)  
  
#### Mac修改文件访问权限  
chmod 777 xx.sh  

`sudo xattr -r -d com.apple.quarantine ./changeName.sh`  sh豁免权  
Linux chmod +755和chmod +777 各是什么意思呢?  
755 代表用户对该文件拥有读，写，执行的权限，同组其他人员拥有执行和读的权限，没有写的权限，其他用户的权限和同组人员权限一样。  
777代表，user,group ,others ,都有读写和可执行权限。  
  
在linux终端先输入ls -al,可以看到如:   
-rwx-r–r– (一共10个参数) ：  
第一个跟参数跟chmod无关,先不管.  
2-4参数:属于user  
5-7参数:属于group  
8-10参数:属于others  
接下来就简单了:r==>可读 w==>可写 x==>可执行  
r=4 w=2 x=1  
所以755代表 rwxr-xr-x  
其实最后还是sudo -s解决的  
  
#### homebrew自己维护了一个opt文件夹  
如果/usr/loacal/下找不到对应的文件，可以去/opt/homebrew/目录下查找  
  
#### git 批量删除tag方法  
```C
​git show-ref --tag | awk ‘/1\.1\.[123456789]{1}[0-5]{0,1}$/ {print ":" $2}' 
​git tag | grep ^1\.2 | xargs git tag -d 
git tag|grep ^1\.2\. | xargs git push origin --delete tag 
```  
​\#注意 命令最后有个空格

