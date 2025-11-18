# 📦 上传文件检查清单

## ✅ HTML文件（4个）
- [ ] index.html
- [ ] zhanbu.html
- [ ] shoucang.html
- [ ] fenxiang.html

## ✅ CSS文件（3个）
- [ ] styles-apple-mystical.css
- [ ] hero-apple.css
- [ ] cosmic-bg.css

## ✅ JavaScript文件（3个）
- [ ] hexagram-data.js
- [ ] divination.js
- [ ] ai-analysis.js

## ✅ 配置文件（5个）
- [ ] config.example.js （模板，必须上传）
- [ ] package.json
- [ ] vercel.json
- [ ] .gitignore
- [ ] README.md

## ✅ 文档文件（2个）
- [ ] README_CONFIG.md
- [ ] DEPLOYMENT.md

## ✅ 图片文件夹
- [ ] images/coin-qianlong-front.svg
- [ ] images/coin-qianlong-back.svg
- [ ] images/（其他SVG文件）

## ❌ 不要上传
- [ ] config.js （包含真实API Key）
- [ ] node_modules/
- [ ] .DS_Store
- [ ] *.log

---

## 快速命令

### 检查文件
```bash
# 查看Git将要提交的文件
git status

# 确认config.js被忽略
git check-ignore config.js
# 输出: config.js （说明已被忽略）
```

### 提交到Git
```bash
git add .
git commit -m "易经占卜网站 v3.7.0"
git push origin main
```

### 部署到Vercel
```bash
vercel --prod
```

---

**总文件数**: 约 18-20 个文件（不含images内的多个SVG）
