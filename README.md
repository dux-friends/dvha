# Dux Vue Headless Admin

Dux Vue 是一款与 UI 无关的中后台前端框架，专注于多管理端、认证、权限、CURD、I18n等业务逻辑部分处理，可以搭配任何 Vue 生态的 UI 框架。

## 简介

Dux Vue Headless Admin 是一个基于 Vue 3 的无头（Headless）管理后台开发框架，主要特点是将业务逻辑与 UI 表现层解耦，使开发者可以专注于业务逻辑的实现，而不必担心 UI 的具体实现。

### 主要特性

- **UI 框架无关**：可以与任何 Vue 生态的 UI 框架（如 Element Plus、Ant Design Vue、Naive UI 等）集成
- **多管理端支持**：适用于构建多个管理端应用，如主后台、子应用后台、商户后台等
- **统一认证**：内置完整的认证流程和权限管理
- **CRUD 操作简化**：提供丰富的 hooks 和工具函数，简化数据增删改查操作
- **国际化支持**：内置 I18n 支持
- **TypeScript 支持**：完全使用 TypeScript 开发，提供良好的类型提示

## 核心包 @dux-vue/core

`@dux-vue/core` 是 Dux Vue 的核心包，提供了框架的基础功能：

### 核心组件

- **路由管理** 🧭：基于 Vue Router 的路由管理，支持权限控制和路由守卫
- **状态管理** 💾：基于 Pinia 的状态管理，支持持久化存储
- **认证模块** 🔐：完整的用户认证流程，包括登录、注册、权限验证等
- **数据处理** 📊：提供数据 CRUD 相关的 hooks 和工具函数
- **配置中心** ⚙️：统一的应用配置管理

### 架构图

```mermaid
graph TD
    %% 应用层
    A[🖥️ 应用层 Apps] --> B[⚙️ @dux-vue/core 核心层]

    %% 应用层组件
    A1[🏠 主管理端] --> A
    A2[🏢 其他管理端] --> A

    %% 核心层
    B --> C[🎨 UI 框架层 可替换]

    %% 核心层组件
    B1[🧭 路由] --> B
    B2[💾 状态管理] --> B
    B3[🔐 用户认证] --> B
    B4[📊 数据处理] --> B
    B5[⚙️ 配置中心] --> B
    B6[🧩 通用组件] --> B

    %% UI框架层组件
    C1[💄 Element Plus] --> C
    C2[💄 Ant Design] --> C
    C3[💄 Naive UI] --> C
    C4[💄 其他UI框架] --> C

    %% 样式设置
    classDef default fill:#1d1e26,stroke:#6b7280,color:#fff,stroke-width:2px;
    classDef app fill:#1e293b,stroke:#6b7280,color:#fff;
    classDef core fill:#0f172a,stroke:#6b7280,color:#fff;
    classDef ui fill:#18181b,stroke:#6b7280,color:#fff;

    %% 应用类样式
    class A,A1,A2 app;
    %% 核心层样式
    class B,B1,B2,B3,B4,B5,B6 core;
    %% UI框架层样式
    class C,C1,C2,C3,C4 ui;
```

## 快速开始

```bash
# 安装核心包
npm install @dux-vue/core

# 安装相关依赖
npm install vue vue-router pinia
```

## 使用示例

```typescript
import { createDux } from '@dux-vue/core'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 创建 Dux 实例
const dux = createDux({
  // 配置项
  baseUrl: '/api',
  // 其他配置...
})

// 使用 Dux
app.use(dux)
app.mount('#app')
```

## 相关包

- `@dux-vue/core` ⚙️: 核心功能包
- `@dux-vue/table` 📋: 表格数据处理工具

## 开源协议

LGPL-3.0
