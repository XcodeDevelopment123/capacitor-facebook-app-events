# Capacitor 插件集成 Facebook App Events 指南

## 一、环境准备

### 基础要求

- Node.js ≥ 18
- Angular CLI ≥ 18
- Capacitor CLI ≥ 7
- Android Studio & Xcode
- Facebook 开发者账户

> 💡 **提示**：确保所有工具都已正确安装并配置环境变量

## 二、创建 Capacitor 插件

### 初始化插件

```bash
npm init @capacitor/plugin
```

按提示填写基本信息：

- Plugin name: facebook-app-events
- npm package name: capacitor-facebook-app-events
- description: Facebook App Events integration
  ![Init image](./Screenshot%202025-07-08%20130606.png)
  > 📚 **参考文档**：详细的插件创建流程请参考 [Capacitor 官方文档](https://capacitorjs.com/docs/plugins/creating-plugins)

## 三、定义插件接口

编辑 `src/definitions.ts`：

```typescript
export interface FacebookAppEventsPlugin {
  logEvent(options: { name: string; params?: Record<string, any> }): Promise<void>;
}
```

编辑 `src/index.ts`：

```typescript
import { registerPlugin } from "@capacitor/core";
import type { FacebookAppEventsPlugin } from "./definitions";

const FacebookAppEvents = registerPlugin<FacebookAppEventsPlugin>("FacebookAppEvents");

export * from "./definitions";
export { FacebookAppEvents };
```

## 四、Android 平台集成

![java image](./Screenshot%202025-07-08%20130952.png)

### 添加依赖

在 `android/build.gradle` 中添加 Facebook SDK：

```gradle
dependencies {
    implementation 'com.facebook.android:facebook-android-sdk:latest.release'
}
```

### 插件实现

创建 Android 插件主类，实现 `logEvent` 方法。

> 📋 **实现要点**：
>
> - 继承 `Plugin` 类
> - 使用 `@PluginMethod` 注解
> - 调用 Facebook SDK 的 `AppEventsLogger`
>
> 具体实现请参考 [Facebook Android SDK 文档](https://developers.facebook.com/docs/app-events/getting-started-app-events-android)

## 五、iOS 平台集成

![java image](./Screenshot%202025-07-08%20131054.png)

### 添加依赖

在 `ios/Podfile` 中添加：

```ruby
pod 'FacebookCore'
pod 'FacebookSDKCoreKit'
```

### 插件实现

创建 Swift 插件类，实现相应的事件记录功能。

> 📋 **实现要点**：
>
> - 继承 `CAPPlugin` 类
> - 使用 `@objc` 方法
> - 调用 Facebook SDK 的 `AppEvents.logEvent`
>
> 具体实现请参考 [Facebook iOS SDK 文档](https://developers.facebook.com/docs/app-events/getting-started-app-events-ios)

## 六、应用中使用

### 安装插件

```bash
npm install ../capacitor-facebook-app-events
npx cap sync
```

### 调用示例

```typescript
import { FacebookAppEvents } from "capacitor-facebook-app-events";

// 记录自定义事件
FacebookAppEvents.logEvent({
  name: "custom_event_name",
  params: { user_id: "123", action: "click" },
});
```

![java image](./Screenshot%202025-07-08%20131099.jpg)

## 七、平台配置

### Android 配置

在 `AndroidManifest.xml` 中添加必要的权限和 meta-data：

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id" />
```

### iOS 配置

在 `Info.plist` 中添加 Facebook 相关配置：

```xml
<key>FacebookAppID</key>
<string>你的 Facebook App ID</string>
<key>FacebookDisplayName</key>
<string>你的 App 名称</string>
```

> ⚠️ **重要**：配置详情请参考 Facebook 官方文档，确保所有设置正确

## 八、Facebook 后台设置

1. 登录 Facebook App Dashboard
2. 添加 iOS/Android 平台
3. 配置 Bundle ID 和 Package Name
4. 启用 App Events 功能

> 📱 **平台设置**：每个平台的具体配置步骤请参考 Facebook 开发者文档
> ![facebook image](./Screenshot%202025-07-08%20131323.png)

## 九、常见问题

| 问题类型       | 解决方向                   |
| -------------- | -------------------------- |
| SDK 初始化失败 | 检查 App ID 配置和平台设置 |
| 事件无法记录   | 确认 SDK 初始化和网络权限  |
| 构建错误       | 检查依赖版本和原生代码配置 |

> 🔧 **调试建议**：
>
> - 查看原生平台的日志输出
> - 使用 Facebook 提供的测试工具验证集成
> - 参考官方示例项目

## 十、参考资源

- [Capacitor 插件开发指南](https://capacitorjs.com/docs/plugins/creating-plugins)
- [Facebook App Events 官方文档](https://developers.facebook.com/docs/app-events/)
- [Facebook Android SDK](https://developers.facebook.com/docs/app-events/getting-started-app-events-android)
- [Facebook iOS SDK](https://developers.facebook.com/docs/app-events/getting-started-app-events-ios)
- [Facebook App Event References](https://developers.facebook.com/docs/app-events/reference)

---

> ⚠️ **免责声明**：  
> 本文档提供基本集成流程参考，具体实现细节可能因 SDK 版本更新而变化。  
> 请以官方文档为准，并根据实际项目需求进行调整。
