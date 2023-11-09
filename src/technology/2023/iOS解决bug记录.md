注册开发者账号需要收货地址和信用卡地址相同；

Xcode14  pod 配置

```ruby
post_install **do** |installer|

 installer.generated_projects.each **do** |project|

  project.targets.each **do** |target|

   target.build_configurations.each **do** |config|

\#    config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '10.0'

​    config.build_settings['EXPANDED_CODE_SIGN_IDENTITY'] = ""

​    config.build_settings['CODE_SIGNING_REQUIRED'] = "NO"

​    config.build_settings['CODE_SIGNING_ALLOWED'] = "NO"

   **end**

  **end**

 **end**

**end**
```



APM相关

APM可以看这几个大厂的, 

\# APM

\## 卡顿检测

app performance monitor



微信Matrix:https://mp.weixin.qq.com/s/M6r7NIk-s8Q-TOaHzXFNAw

360(QiLagMonitor):https://wemp.app/posts/2384b301-50fc-4e99-bc60-8a1ba6630dff

360:https://segmentfault.com/a/1190000019645150

美团Hertz: https://tech.meituan.com/2016/12/19/hertz.html

得物: https://mp.weixin.qq.com/s/Rs1lvFdQlXK6k9jkXHAhHQ

头条: https://juejin.cn/post/7031834640034103304

美图(MTHawkeye):https://github.com/meitu/MTHawkeye/blob/develop/Readme-cn.md

Wedjat: https://github.com/aozhimin/iOS-Monitor-Platform



https://juejin.cn/post/6844904003793321997#heading-11