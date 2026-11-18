# OpenFigma 上游链接清理记录

> 目的：记录我们把 OpenPencil 上游入口从界面和邮件里移除的位置、原地址和后续替换计划。
> 这份文档面向“以后换成自己的网站”，不是代码 diff 的替代品。
>
> 维护人：内部项目组
> 最后更新：2026-11-19
> 当前分支：`branding/openfigma`

## 1. 背景与原则

- 本项目是 OpenPencil 的 fork，内部自托管，不希望成员在界面、邮件或网络面板里看到 `openpencil.dev` / `open-pencil` 仓库。
- 优先做**前端隐藏**：能隐藏的入口不删除后端逻辑，方便以后换成自有站点时恢复。
- 后端只在必要处做最小改动：邮件品牌通过替换服务器 bundle + 配置完成，不改镜像、不改数据库。
- 每移除一个入口，都在本文档登记：原位置、原文案、原地址、处理方式、代码位置、以后替换成什么。
- 本文档仅内部使用，不要随 fork 公开发布。

当前部署地址：

| 服务 | 地址 |
|---|---|
| OpenFigma 设计工具 | `https://openfigma.43.128.130.54.sslip.io/` |
| 团队门户 | `https://portal.43.128.130.54.sslip.io/` |
| HTML 静态托管 | `https://html.43.128.130.54.sslip.io/` |

## 2. 已完成清理

### 2.1 登录 / 公共页

| 位置 | 原入口 | 原地址 | 处理 | 代码位置 |
|---|---|---|---|---|
| 登录页页脚 | 帮助 | `https://openpencil.dev/cloud/` | 删除链接，页脚只保留服务器域名和语言选择 | `src/components/cloud-portal/layout/PortalFooter.vue` |

验证：无痕浏览器打开 `/auth/login`，页脚无链接，页面 HTML 不含 `openpencil.dev`。

### 2.2 编辑器「帮助」菜单

**整个「帮助」按钮已从前端菜单栏隐藏**，因此以下入口一并不可见：

| 原入口 | 原地址 | 处理 |
|---|---|---|
| OpenFigma 文档 | `https://openpencil.dev/getting-started` | 随整个帮助菜单隐藏 |
| 键盘快捷键 | `https://openpencil.dev/reference/keyboard-shortcuts` | 随整个帮助菜单隐藏 |
| 新功能 | GitHub releases | 随整个帮助菜单隐藏 |
| 报告问题 | GitHub issue | 随整个帮助菜单隐藏 |
| GitHub 上的 OpenFigma | `https://github.com/open-pencil/open-pencil` | 随整个帮助菜单隐藏 |
| Discord 社区 | `https://discord.gg/4wXc9fuZfm` | 随整个帮助菜单隐藏 |

代码位置：

- `src/app/shell/menu/schema/index.ts`：注释掉 `HELP_MENU` 的导入和注册（**主开关**，恢复时改这里即可）。
- `src/app/shell/menu/schema/help.ts`：帮助菜单项只保留「打开导览 / 诊断 / 支持 OpenFigma」。
- `src/app/shell/menu/help.ts`：只保留本地动作，移除外部跳转。
- `src/app/shell/menu/app-menu.ts`：移除对应标签映射。

验证：打开文档后顶部菜单栏为「文件 / 编辑 / 视图 / 对象 / 文本 / 排列」，无「帮助」。

### 2.3 设置页与使用统计提示

| 位置 | 原入口 | 原地址 | 处理 | 代码位置 |
|---|---|---|---|---|
| 设置 → 隐私 | 发送哪些内容 | `https://openpencil.dev/overview/privacy` | 删除链接，保留隐私设置说明 | `src/components/settings/privacy/PrivacySettingsPanel.vue` |
| 设置 → MCP → 本地服务器 | 了解更多 | `https://openpencil.dev/programmable/mcp-server` | 删除链接 | `src/components/settings/mcp/MCPSettingsPanel.vue` |
| 设置 → MCP → WebMCP | 了解更多 | `https://openpencil.dev/programmable/mcp-server#webmcp` | 删除链接 | `src/components/settings/mcp/WebMCPSettingsPanel.vue` |
| 设置 → MCP → MCP 连接 | 了解更多 | `https://openpencil.dev/programmable/ai-chat#external-mcp-connections` | 删除链接 | `src/components/settings/mcp/MCPConnectionsSection.vue` |
| 设置 → AI/Pi | 了解更多 | `https://openpencil.dev/programmable/coding-agents#pi` | 删除链接 | `src/components/settings/agents/PiSetup.vue` |
| 使用统计询问弹窗 | 发送哪些内容 | `https://openpencil.dev/overview/privacy` | 删除链接，保留同意/拒绝按钮 | `src/components/sharing/UsageStatsQuestion.vue` |
| 设置 → MCP → 获取桌面应用 | 获取桌面应用 | `https://github.com/open-pencil/open-pencil/releases/latest` | 删除链接，只保留提示文案 | `src/components/settings/mcp/MCPSettingsPanel.vue` |

验证：设置弹窗的「隐私」「MCP」页无 `openpencil.dev` 锚点，MCP 页无外链。

### 2.4 条件页 / 公共页脚

| 位置 | 原入口 | 原地址 | 处理 | 代码位置 |
|---|---|---|---|---|
| 不支持浏览器提示 | System requirements | `https://openpencil.dev/getting-started#system-requirements` | 删除链接 | `src/app/shell/support/guidance.ts` |
| 社区画廊页头 | 帮助（自托管回退） | `https://openpencil.dev/getting-started` | 自托管且未配置 `branding.helpURL` 时不显示 | `src/components/cloud-portal/site/SiteHeader.vue` |
| 社区画廊页脚 | 文档 / 源代码 / Powered by | `openpencil.dev` + GitHub | 删除文档和源码链接，保留「由 OpenFigma 提供」文字和语言选择 | `src/components/cloud-portal/site/SiteFooterCompact.vue` |

### 2.5 网络请求

| 位置 | 原行为 | 处理 | 代码位置 |
|---|---|---|---|
| 首页加载 | 请求 `https://cloud.openpencil.dev/.well-known/openpencil` | 自托管 Cloud 不再请求官方服务器；仅官方部署保留 | `src/app/cloud/availability.ts` |

验证：登录后打开首页及文档，网络面板无 `openpencil.dev` 请求。

### 2.6 其它前端文本

| 位置 | 原文 | 处理 | 代码位置 |
|---|---|---|---|
| 管理后台指标 | `openpencil.dev` / `app.openpencil.dev` | 改为 `OpenFigma` / `app.openfigma` | `src/components/metrics/MetricsDashboard.vue` |
| Bug 报告平台字段 | `Web (app.openpencil.dev)` | 改为 `Web (OpenFigma)` | `src/app/shell/support/guidance.ts` |

### 2.7 后端邮件

所有验证、邀请、重置、通知邮件：

| 项目 | 原值 | 新值 | 处理 |
|---|---|---|---|
| 发件人 | `OpenPencil Cloud <cloud@localhost>` | `OpenFigma <cloud@localhost>` | 修改服务器 TOML |
| 邮件页脚链接 | `https://openpencil.dev` | `https://openfigma.43.128.130.54.sslip.io` | 替换服务器 bundle |
| 邮件页脚文案 | `openpencil.dev` | `OpenFigma` | 替换服务器 bundle |
| 邮件 Logo | `https://openpencil.dev/brand/app-icon-1024.png` | `https://openfigma.43.128.130.54.sslip.io/brand/app-icon-1024.png` | 替换服务器 bundle |
| 正文品牌 | `OpenPencil` / `OpenPencil Cloud` | `OpenFigma` | 替换服务器 bundle（全局品牌字符串） |

实现方式（无需重建镜像）：

- 服务器文件：`/opt/openpencil/self-hosted/openfigma-server.mjs`（原镜像 `/app/server.mjs` 的补丁副本）。
- compose 增加只读挂载：`./self-hosted/openfigma-server.mjs:/app/server.mjs:ro`。
- 配置：`/opt/openpencil/self-hosted/openpencil-cloud.toml`
  - `[authentication.passkeys] rp_name = "OpenFigma"`
  - `[email] from = "OpenFigma <cloud@localhost>"`
- 原始文件备份在 `/opt/openpencil/backups/`（compose、toml）。

验证：实际触发重置密码邮件，发件人为 `OpenFigma`，页脚链接和 Logo 均为 `openfigma` 域名，HTML 中 `openpencil` 出现 0 次。

## 3. 代码定位汇总

| 文件 | 改动 |
|---|---|
| `src/components/cloud-portal/layout/PortalFooter.vue` | 移除页脚帮助链接 |
| `src/app/shell/menu/schema/index.ts` | 注释掉整个 `HELP_MENU` 注册 |
| `src/app/shell/menu/schema/help.ts` | 帮助菜单只保留本地项 |
| `src/app/shell/menu/help.ts` | 移除外部跳转动作 |
| `src/app/shell/menu/app-menu.ts` | 移除对应标签映射 |
| `src/components/settings/privacy/PrivacySettingsPanel.vue` | 移除隐私说明链接 |
| `src/components/settings/mcp/MCPSettingsPanel.vue` | 移除 MCP 文档链接和桌面应用链接 |
| `src/components/settings/mcp/WebMCPSettingsPanel.vue` | 移除 WebMCP 文档链接 |
| `src/components/settings/mcp/MCPConnectionsSection.vue` | 移除 MCP 连接文档链接 |
| `src/components/settings/agents/PiSetup.vue` | 移除 Pi 指南链接 |
| `src/components/sharing/UsageStatsQuestion.vue` | 移除使用统计隐私链接 |
| `src/app/shell/support/guidance.ts` | 移除 System requirements 链接，改 Bug 平台字段 |
| `src/components/cloud-portal/site/SiteHeader.vue` | 自托管页头不再回退到上游帮助 |
| `src/components/cloud-portal/site/SiteFooterCompact.vue` | 移除文档/源码/Powered by 链接 |
| `src/app/cloud/availability.ts` | 自托管不请求官方 Cloud 探测接口 |
| `src/components/metrics/MetricsDashboard.vue` | 指标标签改为 OpenFigma |

> 早前已完成的全量 UI 白标（文字、Logo、Fi 图标等）见提交：
> `354a6e7b1 brand: rebrand UI layer to OpenFigma (white-label)`
> `94899242f brand: complete OpenFigma UI strings and Fi mark`

## 4. 以后替换成自有网站时的映射

现在这些入口是“隐藏”状态。等自有文档/隐私页准备好后，按这张表恢复：

| 功能 | 原上游地址 | 建议自有地址 | 状态 |
|---|---|---|---|
| 登录页页脚帮助 | `https://openpencil.dev/cloud/` | `https://portal.43.128.130.54.sslip.io/`（或新建 `/help`） | 待建 |
| 编辑器帮助菜单 | 整个菜单 | 恢复 `HELP_MENU`，把各项指向自有文档 | 待建 |
| 编辑器帮助 → 文档 | `https://openpencil.dev/getting-started` | `https://portal.43.128.130.54.sslip.io/docs` | 待建 |
| 编辑器帮助 → 键盘快捷键 | `https://openpencil.dev/reference/keyboard-shortcuts` | `https://portal.43.128.130.54.sslip.io/docs/shortcuts` | 待建 |
| 设置 → 隐私说明 | `https://openpencil.dev/overview/privacy` | `https://portal.43.128.130.54.sslip.io/privacy` | 待建 |
| 设置 → MCP 文档 | `https://openpencil.dev/programmable/mcp-server` | `https://portal.43.128.130.54.sslip.io/docs/mcp` | 待建 |
| 设置 → WebMCP 文档 | `https://openpencil.dev/programmable/mcp-server#webmcp` | `https://portal.43.128.130.54.sslip.io/docs/mcp#webmcp` | 待建 |
| 设置 → MCP 连接文档 | `https://openpencil.dev/programmable/ai-chat#external-mcp-connections` | `https://portal.43.128.130.54.sslip.io/docs/mcp-connections` | 待建 |
| 设置 → Pi 指南 | `https://openpencil.dev/programmable/coding-agents#pi` | `https://portal.43.128.130.54.sslip.io/docs/agents` | 待建 |
| 邮件页脚 | `https://openpencil.dev` | 已替换为 OpenFigma 应用地址 | 已完成 |
| 邮件 Logo | `https://openpencil.dev/brand/app-icon-1024.png` | 已替换为 OpenFigma 品牌图 | 已完成 |

建议后续在门户里集中维护 `/docs` 与 `/privacy`，所有入口统一指向那里。

## 5. 尚未处理 / 有意保留

| 位置 | 现状 | 说明 |
|---|---|---|
| `X-OpenPencil-Editor-Version` | 协议头仍保留 | 桌面端使用的版本协商头；网页端不发送。改名需同时改后端 chunk 和桌面端，暂不动 |
| 小写内部标识 | 保留 | `openpencil` 数据库名、S3 bucket、环境变量、包名等内部标识，不对外展示；改动有数据迁移风险 |
| 官方站页脚组件 `SiteFooterColumns` | 保留 | 仅 `deployment === official` 时渲染，自托管不显示 |
| 桌面应用 / 官方更新器 | 保留 | 当前只使用 Web 端；桌面端品牌化未做 |
| 邮件模板多语言细节 | 已全局替换品牌词 | 如后续发现个别语言仍有残留，按同一方式补 |

## 6. 为什么保留这份 MD，而不只看 diff / git 记录

- **diff 只说明代码怎么变，不说明为什么变**：例如注释掉 `HELP_MENU`，看不出它原来包含哪些外部入口、以后要恢复成什么。
- **当前改动还没提交**：只靠 `git diff` 或版本对比，一旦工作区被清理或重装就丢了。
- **这份文档是替换清单**：以后自有站点上线，按第 4 节逐项恢复，不用重新翻代码找入口。
- **diff 仍然保留**：提交后可用 `git show <commit>` / `git diff <old>..<new>` 审查代码细节；本文档负责产品层面的“入口台账”。

建议每次新增/删除入口时：

1. 先在本文档登记一行；
2. 再改代码；
3. 构建部署后写验证结果；
4. 提交时把文档和代码放在同一个 commit。

## 7. 部署与验证记录

- 前端构建：`bun run build:cloud`
- 前端部署目录：`/opt/openpencil/site`
- 前端站点备份：
  - `/opt/openpencil/backups/site-20261118-1432.tgz`
  - `/opt/openpencil/backups/site-20261118-1446.tgz`
  - `/opt/openpencil/backups/site-20261118-1619.tgz`
  - `/opt/openpencil/backups/site-20261118-2351.tgz`
- 后端补丁：`/opt/openpencil/self-hosted/openfigma-server.mjs`
- 后端配置备份：`/opt/openpencil/backups/compose.self-hosted.yml.*`、`openpencil-cloud.toml.*`

已验证：

- 登录页页脚无链接、无 `openpencil.dev`
- 顶部菜单栏无「帮助」
- 设置 → 隐私 / MCP 无 `openpencil.dev` 锚点、无 GitHub 外链
- 首页与文档页网络请求无 `openpencil.dev`
- 重置密码邮件发件人为 `OpenFigma`，页脚链接、Logo 均为 OpenFigma
- 登录、工作区列表、文档列表、对象存储下载、CLI `whoami` 均正常

## 8. 维护约定

- 新增代码不要硬编码 `openpencil.dev`；统一走内部常量或本文档第 4 节的映射。
- 如果必须暂时保留上游入口，在本文档标为「保留」并写原因。
- 自有站点上线后，把第 4 节状态从「待建」改为「已替换」，并记录上线日期。
- 后端 bundle 补丁是临时方案：升级镜像后需要重新生成 `openfigma-server.mjs` 并重启。
