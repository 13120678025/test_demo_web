# 配置文件使用说明

## 📋 目录结构

```
yijin1.0/
├── config.js              # 实际配置文件（包含真实API Key，不提交到Git）
├── config.example.js      # 配置文件示例（提交到Git）
├── .gitignore            # Git忽略文件配置
└── README_CONFIG.md      # 本说明文档
```

## 🔧 配置步骤

### 1. 复制配置文件

```bash
# 将示例文件复制为实际配置文件
cp config.example.js config.js
```

### 2. 填入API Key

打开 `config.js`，将 `YOUR_DEEPSEEK_API_KEY_HERE` 替换为您的真实API Key：

```javascript
const CONFIG = {
    DEEPSEEK: {
        apiKey: 'sk-xxxxxxxxxxxxxxxxxxxx',  // 填入您的真实Key
        baseURL: 'https://api.deepseek.com',
        model: 'deepseek-chat',
        endpoint: '/chat/completions'
    },
    // ...
};
```

### 3. 验证配置

打开网站占卜页面，点击"获取AI分析"，如果成功则配置正确。

## ⚙️ 配置项说明

### DEEPSEEK 配置

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `apiKey` | DeepSeek API密钥 | 需要填写 |
| `baseURL` | API基础URL | https://api.deepseek.com |
| `model` | 使用的模型 | deepseek-chat |
| `endpoint` | API端点 | /chat/completions |

### SITE 配置

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `name` | 网站名称 | 易经占卜 |
| `version` | 版本号 | 3.6.0 |
| `maxSavedResults` | 最多保存占卜记录数 | 50 |

### AI 配置

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `temperature` | 创造性参数(0-2) | 0.8 |
| `maxTokens` | 最大生成字符数 | 1000 |
| `stream` | 是否流式输出 | false |

## 🔒 安全提示

### ⚠️ 重要事项

1. **永远不要**将 `config.js` 提交到Git仓库
2. **永远不要**在公开代码中硬编码API Key
3. **建议**生产环境使用后端代理服务器

### Git忽略配置

`.gitignore` 文件已自动包含：
```
config.js
```

### 验证是否被忽略

```bash
# 查看Git跟踪状态
git status

# config.js 不应出现在列表中
```

## 🚀 生产环境部署

### 方案1：环境变量（推荐）

1. 在服务器设置环境变量：
```bash
export DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxxxxxx"
```

2. 修改代码从环境变量读取（需要后端支持）

### 方案2：后端代理（最安全）

1. 搭建Node.js后端服务器
2. API Key保存在服务器环境变量
3. 前端调用自己的后端接口
4. 后端转发请求到DeepSeek

示例后端代码：
```javascript
// server.js
const express = require('express');
const app = express();

app.post('/api/ai-analysis', async (req, res) => {
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
});

app.listen(3000);
```

## 🐛 故障排除

### 问题1：提示"配置文件未加载"

**原因**：config.js 未正确引入

**解决**：检查HTML中是否有：
```html
<script src="config.js"></script>
```

### 问题2：提示"请配置有效的API Key"

**原因**：API Key未替换或为空

**解决**：
1. 打开 `config.js`
2. 确认 `apiKey` 已填入真实值
3. 刷新页面

### 问题3：API调用失败

**原因**：API Key无效或网络问题

**解决**：
1. 验证API Key是否正确
2. 检查网络连接
3. 查看浏览器控制台错误信息

## 📚 更多信息

- DeepSeek API文档：https://api.deepseek.com/docs
- 本项目README：README.md

---

**安全提醒**：请妥善保管您的API Key，避免泄露造成费用损失！
