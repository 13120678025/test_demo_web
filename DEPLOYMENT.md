# Vercel 部署指南

## 📦 需要上传的文件清单

### ✅ 必须上传的文件

```
yijin1.0/
├── index.html                    # 首页
├── zhanbu.html                   # 占卜页
├── shoucang.html                 # 收藏页
├── fenxiang.html                 # 分享页
├── styles-apple-mystical.css     # 主样式
├── hero-apple.css                # 首页封面样式
├── cosmic-bg.css                 # 宇宙背景样式
├── hexagram-data.js              # 卦象数据
├── divination.js                 # 占卜逻辑
├── ai-analysis.js                # AI分析
├── config.example.js             # 配置模板（必须）
├── package.json                  # 项目配置
├── vercel.json                   # Vercel配置
├── README.md                     # 项目说明
├── README_CONFIG.md              # 配置说明
├── .gitignore                    # Git忽略文件
    ├── coin-qianlong-front.svg
    ├── coin-qianlong-back.svg
    └── ...其他图片
```

### ❌ 不要上传的文件

```
❌ config.js                      # 包含真实API Key，已被.gitignore
❌ node_modules/                  # 依赖包
❌ .DS_Store                      # 系统文件
❌ *.log                          # 日志文件
```

---

## 🚀 部署步骤

### 1. 准备Git仓库

```bash
# 初始化Git（如果还没有）
git init

# 添加所有文件（.gitignore会自动排除config.js）
git add .

# 提交
git commit -m "Initial commit: 易经占卜网站 v3.7.0"

# 关联远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/你的用户名/yijing-divination.git

# 推送到GitHub
git push -u origin main
```

### 2. 部署到Vercel

#### 方法A：通过Vercel网站（推荐）

1. 访问 https://vercel.com
2. 登录并点击 "New Project"
3. 导入您的GitHub仓库
4. Vercel会自动检测为静态网站
5. 点击 "Deploy"

#### 方法B：使用Vercel CLI

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel
```

### 3. 配置环境变量（重要）

在Vercel项目设置中添加环境变量：

1. 进入项目 Settings > Environment Variables
2. 添加变量：
   - Name: `DEEPSEEK_API_KEY`
   - Value: `sk-0779a3742cd64274a9d3f01e72407b42`
   - Environment: `Production`, `Preview`, `Development`

### 4. 创建config.js（在Vercel中）

由于config.js不会上传，您需要：

**选项1：使用config.example.js作为模板**
- 部署后，在Vercel的文件系统中不需要config.js
- API Key通过环境变量管理

**选项2：修改代码使用环境变量**
- 需要创建API路由来调用DeepSeek
- 推荐用于生产环境

---

## ⚠️ 重要安全提示

### 当前方案（客户端调用）
```javascript
// config.js 在前端直接调用API
// ⚠️ API Key会暴露在浏览器中
```

**风险**：任何人都可以查看源代码获取API Key

### 推荐方案（后端代理）

创建 `api/ai-analysis.js`：
```javascript
export default async function handler(req, res) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.json(data);
}
```

然后修改前端调用：
```javascript
// 不直接调用DeepSeek，而是调用自己的API
fetch('/api/ai-analysis', {...})
```

---

## 📋 部署后检查清单

- [ ] 网站能正常访问
- [ ] 首页显示正常
- [ ] 占卜功能可用
- [ ] 铜钱动画正常
- [ ] AI分析可用（需要配置API Key）
- [ ] 收藏功能正常
- [ ] 响应式设计正常（手机/平板/电脑）

---

## 🔧 常见问题

### Q1: 部署后AI分析不可用？
**A**: 检查环境变量是否正确配置DEEPSEEK_API_KEY

### Q2: 图片不显示？
**A**: 确保images文件夹完整上传

### Q3: 样式错乱？
**A**: 检查所有CSS文件是否都已上传

### Q4: config.js not found错误？
**A**: 这是正常的，因为config.js不应该上传。考虑使用后端API路由

---

## 📞 技术支持

如有问题，请检查：
1. Vercel构建日志
2. 浏览器控制台错误
3. Network面板API调用

---

**祝部署顺利！** 🚀

