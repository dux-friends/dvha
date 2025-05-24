# 管理端配置

DVHA 框架的核心特性之一是支持多管理端系统，每个管理端可以独立配置认证、数据、路由、菜单和主题等。

## 功能特点

- 🏗️ **多管理端支持** - 支持在同一应用中运行多个管理端
- 🔐 **独立认证** - 每个管理端可配置独立的认证提供者
- 📊 **独立数据源** - 每个管理端可配置独立的数据提供者
- 🎨 **独立主题** - 每个管理端可配置独立的主题样式
- 🚀 **独立路由** - 每个管理端拥有独立的路由配置
- 📱 **独立菜单** - 每个管理端可配置独立的菜单结构
- 🔄 **配置继承** - 支持全局配置和管理端配置的继承机制

## 管理端接口定义

```typescript
interface IManage {
  name: string                    // 管理端唯一标识
  title: string                   // 管理端标题
  copyright?: string              // 版权信息
  description?: string            // 描述信息

  register?: boolean              // 是否支持注册
  forgotPassword?: boolean        // 是否支持忘记密码
  updatePassword?: boolean        // 是否支持修改密码

  apiUrl?: string                 // API 基础地址
  apiRoutePath?: string           // 远程菜单 API 路径

  authProvider?: IAuthProvider    // 认证提供者
  dataProvider?: IDataProvider    // 数据提供者

  routePrefix?: string            // 路由前缀
  routes?: RouteRecordRaw[]       // 路由配置
  menus?: IMenu[]                 // 菜单配置

  components?: IConfigComponent   // 组件配置
  theme?: IConfigTheme           // 主题配置

  [key: string]: any             // 扩展字段
}
```

## 基础配置

### 单管理端配置

```js
import { createDux } from '@duxweb/dvha-core'

const app = createDux({
  // 默认管理端
  defaultManage: 'admin',

  // 管理端配置
  manages: [
    {
      name: 'admin',
      title: '管理后台',
      copyright: '© 2024 My Company',
      description: '企业管理系统',

      // 功能开关
      register: false,
      forgotPassword: true,
      updatePassword: true,

      // API 配置
      apiUrl: '/api/admin',

      // 路由配置
      routePrefix: '/admin',

      // 认证提供者
      authProvider: adminAuthProvider,

      // 数据提供者
      dataProvider: adminDataProvider,

      // 菜单配置
      menus: [
        // 菜单项...
      ],

      // 主题配置
      theme: {
        logo: '/logo.png',
        banner: '/banner.jpg'
      }
    }
  ]
})
```

### 多管理端配置

```js
const app = createDux({
  // 全局配置
  title: 'DVHA 框架',
  copyright: '© 2024 DVHA',
  apiUrl: 'https://api.example.com',

  // 默认管理端
  defaultManage: 'admin',

  // 管理端配置
  manages: [
    // 系统管理端
    {
      name: 'admin',
      title: '系统管理',
      routePrefix: '/admin',
      authProvider: adminAuthProvider,
      dataProvider: adminDataProvider,
      theme: {
        logo: '/admin-logo.png'
      }
    },

    // 用户中心
    {
      name: 'user',
      title: '用户中心',
      routePrefix: '/user',
      authProvider: userAuthProvider,
      dataProvider: userDataProvider,
      theme: {
        logo: '/user-logo.png'
      }
    },

    // 商家后台
    {
      name: 'merchant',
      title: '商家后台',
      routePrefix: '/merchant',
      authProvider: merchantAuthProvider,
      dataProvider: merchantDataProvider,
      register: true,
      forgotPassword: true
    }
  ]
})
```

## 配置继承机制

### 全局配置与管理端配置

DVHA 支持全局配置和管理端配置的继承机制：

```js
const app = createDux({
  // 全局配置
  title: 'DVHA 系统',
  copyright: '© 2024 DVHA',
  apiUrl: 'https://api.example.com',

  // 全局认证提供者
  authProvider: globalAuthProvider,

  // 全局数据提供者
  dataProvider: globalDataProvider,

  // 全局主题
  theme: {
    logo: '/global-logo.png',
    banner: '/global-banner.jpg'
  },

  manages: [
    {
      name: 'admin',
      title: '管理后台',  // 最终标题: "管理后台 - DVHA 系统"

      // 继承全局 authProvider
      // 继承全局 dataProvider

      // 覆盖全局主题
      theme: {
        logo: '/admin-logo.png'  // 覆盖全局 logo
        // banner 继承全局配置
      }
    }
  ]
})
```

### 配置合并规则

1. **字符串字段**: 管理端配置覆盖全局配置
2. **对象字段**: 深度合并，管理端配置优先
3. **标题字段**: 特殊处理，格式为 "管理端标题 - 全局标题"
4. **API地址**: 拼接处理，格式为 "全局API/管理端API"

## 管理端功能配置

### 认证功能配置

```js
{
  name: 'admin',
  title: '管理后台',

  // 认证功能开关
  register: true,           // 启用注册功能
  forgotPassword: true,     // 启用忘记密码
  updatePassword: true,     // 启用修改密码

  // 认证提供者
  authProvider: {
    login: async (params, manage) => {
      // 登录逻辑
    },
    logout: async (params, manage) => {
      // 登出逻辑
    },
    register: async (params, manage) => {
      // 注册逻辑
    },
    forgotPassword: async (params, manage) => {
      // 忘记密码逻辑
    },
    updatePassword: async (params, manage) => {
      // 修改密码逻辑
    }
  }
}
```

### 数据源配置

```js
{
  name: 'admin',
  title: '管理后台',

  // API 配置
  apiUrl: '/api/admin',

  // 数据提供者
  dataProvider: {
    getList: async (options, manage, auth) => {
      // 获取列表数据
    },
    getOne: async (options, manage, auth) => {
      // 获取单条数据
    },
    create: async (options, manage, auth) => {
      // 创建数据
    },
    update: async (options, manage, auth) => {
      // 更新数据
    },
    deleteOne: async (options, manage, auth) => {
      // 删除数据
    },
    custom: async (options, manage, auth) => {
      // 自定义请求
    }
  }
}
```

### 路由和菜单配置

```js
{
  name: 'admin',
  title: '管理后台',

  // 路由前缀
  routePrefix: '/admin',

  // 静态路由配置
  routes: [
    {
      path: 'login',
      name: 'admin.login',
      component: () => import('./pages/Login.vue'),
      meta: { authorization: false }
    }
  ],

  // 菜单配置
  menus: [
    {
      name: 'dashboard',
      label: '仪表盘',
      path: 'dashboard',
      icon: 'dashboard',
      component: () => import('./pages/Dashboard.vue')
    }
  ],

  // 远程菜单
  apiRoutePath: '/api/admin/menus'
}
```

### 布局组件配置

```js
{
  name: 'admin',
  title: '管理后台',

  // 布局组件配置
  components: {
    authLayout: () => import('./layouts/AdminLayout.vue'),
    noAuthLayout: () => import('./layouts/LoginLayout.vue'),
    notFound: () => import('./pages/404.vue'),
    notAuthorized: () => import('./pages/403.vue'),
    error: () => import('./pages/500.vue')
  }
}
```

### 主题配置

```js
{
  name: 'admin',
  title: '管理后台',

  // 主题配置
  theme: {
    logo: '/admin-logo.png',           // 亮色主题 Logo
    darkLogo: '/admin-logo-dark.png',  // 暗色主题 Logo
    banner: '/admin-banner.jpg',       // 亮色主题横幅
    darkBanner: '/admin-banner-dark.jpg' // 暗色主题横幅
  }
}
```

## 实际应用示例

### 企业级多管理端配置

```js
import { createDux } from '@duxweb/dvha-core'

// 认证提供者
const createAuthProvider = (baseUrl) => ({
  login: async (params) => {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    return await response.json()
  },
  logout: async () => {
    await fetch(`${baseUrl}/auth/logout`, { method: 'POST' })
    return { success: true }
  }
})

// 数据提供者
const createDataProvider = (baseUrl) => ({
  getList: async (options) => {
    const response = await fetch(`${baseUrl}${options.path}`)
    return await response.json()
  },
  // 其他方法...
})

const app = createDux({
  // 全局配置
  title: '企业管理平台',
  copyright: '© 2024 Enterprise Corp',
  apiUrl: 'https://api.enterprise.com',

  defaultManage: 'admin',

  manages: [
    // 系统管理端
    {
      name: 'admin',
      title: '系统管理',
      description: '企业系统管理后台',
      routePrefix: '/admin',

      authProvider: createAuthProvider('/api/admin'),
      dataProvider: createDataProvider('/api/admin'),

      register: false,
      forgotPassword: true,

      menus: [
        {
          name: 'dashboard',
          label: '系统概览',
          path: 'dashboard',
          icon: 'dashboard',
          component: () => import('./admin/Dashboard.vue')
        },
        {
          name: 'users',
          label: '用户管理',
          path: 'users',
          icon: 'users',
          component: () => import('./admin/Users.vue')
        }
      ],

      theme: {
        logo: '/logos/admin-logo.png',
        banner: '/banners/admin-banner.jpg'
      },

      components: {
        authLayout: () => import('./layouts/AdminLayout.vue'),
        noAuthLayout: () => import('./layouts/AdminLogin.vue')
      }
    },

    // 用户中心
    {
      name: 'user',
      title: '用户中心',
      description: '用户个人管理中心',
      routePrefix: '/user',

      authProvider: createAuthProvider('/api/user'),
      dataProvider: createDataProvider('/api/user'),

      register: true,
      forgotPassword: true,
      updatePassword: true,

      menus: [
        {
          name: 'profile',
          label: '个人资料',
          path: 'profile',
          icon: 'user',
          component: () => import('./user/Profile.vue')
        },
        {
          name: 'settings',
          label: '账户设置',
          path: 'settings',
          icon: 'settings',
          component: () => import('./user/Settings.vue')
        }
      ],

      theme: {
        logo: '/logos/user-logo.png',
        banner: '/banners/user-banner.jpg'
      },

      components: {
        authLayout: () => import('./layouts/UserLayout.vue'),
        noAuthLayout: () => import('./layouts/UserLogin.vue')
      }
    },

    // 商家后台
    {
      name: 'merchant',
      title: '商家后台',
      description: '商家店铺管理后台',
      routePrefix: '/merchant',

      authProvider: createAuthProvider('/api/merchant'),
      dataProvider: createDataProvider('/api/merchant'),

      register: true,
      forgotPassword: true,
      updatePassword: true,

      apiRoutePath: '/api/merchant/menus', // 动态菜单

      menus: [
        {
          name: 'dashboard',
          label: '店铺概览',
          path: 'dashboard',
          icon: 'dashboard',
          component: () => import('./merchant/Dashboard.vue')
        }
      ],

      theme: {
        logo: '/logos/merchant-logo.png',
        banner: '/banners/merchant-banner.jpg'
      },

      components: {
        authLayout: () => import('./layouts/MerchantLayout.vue'),
        noAuthLayout: () => import('./layouts/MerchantLogin.vue')
      }
    }
  ]
})
```

### 使用管理端配置

```vue
<script setup>
import { useManage } from '@duxweb/dvha-core'

// 获取当前管理端配置
const manage = useManage()

console.log('管理端名称:', manage.config.name)
console.log('管理端标题:', manage.config.title)
console.log('API地址:', manage.config.apiUrl)

// 生成路由路径
const dashboardPath = manage.getRoutePath('dashboard')
console.log('仪表盘路径:', dashboardPath)

// 生成API地址
const usersApiUrl = manage.getApiUrl('users')
console.log('用户API地址:', usersApiUrl)
</script>
```

## 管理端切换

### 程序化切换

```js
import { useRouter } from 'vue-router'
import { useManage } from '@duxweb/dvha-core'

const router = useRouter()

// 切换到不同管理端
const switchToAdmin = () => {
  const adminManage = useManage('admin')
  router.push(adminManage.getRoutePath(''))
}

const switchToUser = () => {
  const userManage = useManage('user')
  router.push(userManage.getRoutePath('profile'))
}
```

### 管理端选择器组件

```vue
<template>
  <div class="manage-selector">
    <select v-model="currentManage" @change="switchManage">
      <option value="admin">系统管理</option>
      <option value="user">用户中心</option>
      <option value="merchant">商家后台</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useManage } from '@duxweb/dvha-core'

const router = useRouter()
const currentManage = ref('admin')

const switchManage = () => {
  const manage = useManage(currentManage.value)
  router.push(manage.getRoutePath(''))
}
</script>
```

## 最佳实践

1. **管理端命名**: 使用简洁明确的名称，避免特殊字符
2. **路由前缀**: 确保路由前缀唯一，避免冲突
3. **配置复用**: 合理使用全局配置减少重复代码
4. **主题统一**: 保持同系列管理端的视觉一致性
5. **权限隔离**: 确保不同管理端的权限完全隔离
6. **数据隔离**: 不同管理端使用独立的数据源和API
7. **错误处理**: 为每个管理端配置适当的错误页面

## 注意事项

- **唯一性**: 管理端名称必须全局唯一
- **路由冲突**: 确保路由前缀不冲突
- **资源路径**: 主题资源路径应使用绝对路径
- **配置顺序**: 配置项的加载顺序会影响继承效果
- **内存管理**: 多管理端会增加内存占用，合理配置
- **SEO考虑**: 不同管理端可能需要不同的SEO配置