/**
 * 易经占卜网站配置文件示例
 * 
 * 使用说明：
 * 1. 将此文件复制为 config.js
 * 2. 在 config.js 中填入您的真实 API Key
 * 3. config.js 已被 .gitignore 忽略，不会提交到仓库
 */

const CONFIG = {
    // DeepSeek AI 配置
    DEEPSEEK: {
        apiKey: 'YOUR_DEEPSEEK_API_KEY_HERE',  // 请替换为您的真实API Key
        baseURL: 'https://api.deepseek.com',
        model: 'deepseek-chat',
        endpoint: '/chat/completions'
    },
    
    // 网站配置
    SITE: {
        name: '易经占卜',
        version: '3.6.0',
        maxSavedResults: 50  // 最多保存的占卜记录数
    },
    
    // AI分析配置
    AI: {
        temperature: 0.8,     // 创造性参数 (0-2)
        maxTokens: 1000,      // 最大生成字符数
        stream: false         // 是否流式输出
    }
};

// 导出配置（兼容不同模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
