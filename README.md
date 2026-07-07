# RuyiBigScreen 如意数据大屏

一个基于 Vue 3、Vite、TypeScript 和 Apache ECharts 实现的纯前端数据可视化大屏项目。项目当前使用本地 mock 数据驱动，已预留 `mock/api` 数据源切换机制，后续可以平滑接入真实后端接口。

## 功能概览

- 深色科技风 1920x1080 数据大屏布局
- 核心指标卡：交易额、订单数、活跃用户、设备在线率、告警数量、渠道健康度
- 城市运营态势分析：城市节点、飞线流动、节点悬停详情、运营摘要排行
- 实时趋势图：访问量、订单数、交易额滚动更新
- 区域业务排行 Top 8
- 业务类型占比环图
- 实时告警列表与告警摘要
- 统一数据源抽象 `RuyiDataProvider`
- MSW mock API
- 前端 logger 日志系统
- Vitest 单元测试与 Playwright E2E smoke 测试
- ESLint、Stylelint、Prettier、TypeScript strict 工程质量配置

## 技术栈

- Vue 3
- Vite
- TypeScript
- Pinia
- Vue Router
- Apache ECharts
- MSW
- Vitest
- Playwright
- ESLint
- Stylelint
- Prettier
- SCSS

## 快速开始

当前项目使用 npm。首次运行请先安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认访问地址：

```text
http://127.0.0.1:5173/
```

## 常用命令

```bash
# 启动开发服务
npm run dev

# 类型检查
npm run typecheck

# ESLint 检查
npm run lint

# Stylelint 检查
npm run stylelint

# 单元测试
npm run test:unit

# E2E 测试
npm run test:e2e

# 单元测试 + E2E 测试
npm run test

# 生产构建
npm run build

# 综合检查：typecheck + lint + stylelint + unit test + build
npm run check

# 预览生产构建
npm run preview
```

## 项目结构

```text
.
├── public/                     # 静态资源与 MSW worker
├── src/
│   ├── app/                    # 应用入口、路由、Provider
│   ├── features/               # 业务模块
│   │   ├── alarm/              # 告警模块
│   │   ├── distribution/       # 业务占比模块
│   │   ├── overview/           # 核心指标与城市态势模块
│   │   ├── ranking/            # 区域排行模块
│   │   └── trend/              # 实时趋势模块
│   ├── logs/                   # 前端 logger 与 transport
│   ├── mocks/                  # mock handlers 与 fixtures
│   ├── pages/                  # 页面级组件
│   ├── services/               # data-provider 与 http client
│   ├── shared/                 # 公共常量、工具、样式、类型
│   ├── tests/                  # Vitest setup
│   └── widgets/                # 通用 UI/图表组件
├── tests/e2e/                  # Playwright E2E 测试
├── eslint.config.js
├── playwright.config.ts
├── stylelint.config.js
├── vitest.config.ts
└── vite.config.ts
```

## 数据源设计

项目通过统一接口 `RuyiDataProvider` 获取业务数据，组件层不关心数据来自 mock 还是真实 API。

核心文件：

- `src/services/data-provider/provider.types.ts`
- `src/services/data-provider/mock.provider.ts`
- `src/services/data-provider/api.provider.ts`
- `src/services/data-provider/index.ts`

接口方法：

- `getOverviewMetrics()`
- `getTrendData()`
- `getRegionRanking()`
- `getBusinessDistribution()`
- `getRealtimeAlarms()`
- `getOperationSummary()`

## Mock API

MSW mock 接口集中在 `src/mocks/handlers`，mock 数据集中在 `src/mocks/fixtures`。

已实现接口：

- `GET /api/overview/metrics`
- `GET /api/trend/hourly`
- `GET /api/ranking/regions`
- `GET /api/distribution/business`
- `GET /api/alarms/realtime`
- `GET /api/operation/summary`

开发环境默认启动 MSW。若需要关闭：

```bash
VITE_ENABLE_MSW=false npm run dev
```

Windows PowerShell 可使用：

```powershell
$env:VITE_ENABLE_MSW="false"; npm run dev
```

## 从 mock 切换到真实 API

创建 `.env.local`：

```env
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=http://your-api-host
```

切换后，数据会通过 `api.provider.ts` 和 `httpClient` 请求真实接口；业务组件无需修改。

恢复 mock：

```env
VITE_DATA_SOURCE=mock
```

## 日志系统

日志统一通过 `src/logs/logger.ts` 输出，业务代码不直接使用 `console.log`。

支持级别：

- `debug`
- `info`
- `warn`
- `error`

日志结构：

```ts
{
  level: 'info',
  message: '...',
  timestamp: '...',
  module: '...',
  payload: {}
}
```

开发环境输出到 console，并保留 remote transport 缓冲；生产环境预留远程上报扩展点。

## 测试说明

单元测试覆盖：

- mock provider 数据返回
- 趋势数据转换
- 区域排行排序
- logger 结构化日志
- 图表 option 生成

运行：

```bash
npm run test:unit
```

E2E smoke 覆盖：

- 页面正常打开
- 中文标题可见
- 英文标识可见
- 指标卡可见
- 图表容器可见
- 告警列表可见
- 实时趋势区域在目标视口内可见

运行：

```bash
npm run test:e2e
```

如果 Playwright 浏览器未安装：

```bash
npx playwright install chromium
```

## 质量检查

建议提交或交付前执行：

```bash
npm run check
```

该命令包含：

- TypeScript 类型检查
- ESLint
- Stylelint
- Vitest 单元测试
- Vite 生产构建

## 开发约定

- 页面组件只负责布局
- 展示组件只负责渲染
- 业务组件不直接调用 `fetch` 或 `axios`
- 数据访问统一经过 `services/data-provider`
- mock 数据集中放在 `src/mocks/fixtures`
- mock handler 集中放在 `src/mocks/handlers`
- 图表 option 独立封装在 feature service 中
- 日志统一经过 `src/logs/logger.ts`
- 样式变量集中在 `src/shared/styles/variables.scss`

## 浏览器支持

建议使用现代 Chromium 内核浏览器访问。页面按 1920x1080 数据大屏优先设计，同时兼容常见窗口缩放。
