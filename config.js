/**
 * 易经占卜网站配置文件
 * 
 * ⚠️ 重要提示：
 * 1. 请勿将此文件提交到Git仓库
 * 2. 请将您的真实API Key填入下方
 * 3. 生产环境建议使用环境变量或后端代理
 */

const CONFIG = {
    // DeepSeek AI 配置
    DEEPSEEK: {
        apiKey: 'sk-0779a3742cd64274a9d3f01e72407b42',
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
        temperature: 0.8,
        maxTokens: 1000,
        stream: false
    }
};

// 导出配置（兼容不同模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
