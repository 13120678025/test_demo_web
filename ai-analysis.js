/* ========================================
   易经占卜 - DeepSeek AI 智能分析
   ======================================== */

// API配置 - 从全局CONFIG对象获取
function getAIConfig() {
    if (typeof CONFIG === 'undefined') {
        throw new Error('配置文件未加载，请确保 config.js 已正确引入');
    }
    return CONFIG.DEEPSEEK;
}

// AI分析状态
let isAnalyzing = false;

/**
 * 调用DeepSeek AI进行卦象分析
 * @param {Object} divinationData - 占卜数据
 * @returns {Promise<string>} - AI分析结果
 */
async function getAIAnalysis(divinationData) {
    if (isAnalyzing) {
        return '正在分析中，请稍候...';
    }

    isAnalyzing = true;

    try {
        // 构建系统提示词
        const systemPrompt = `你是一位精通易经的占卜大师，拥有深厚的国学功底和丰富的人生阅历。
你的分析风格：
1. 专业严谨，但不失亲切
2. 结合现代心理学和传统智慧
3. 给出具体可行的建议
4. 语言优美，富有哲理
5. 每次分析约300-500字

请基于用户的问题和卦象，给出深入的分析和指导。`;

        // 构建用户消息
        const userMessage = buildUserMessage(divinationData);

        // 获取配置
        const aiConfig = getAIConfig();
        const { temperature, maxTokens, stream } = CONFIG.AI;
        
        // 调用API
        const response = await fetch(`${aiConfig.baseURL}${aiConfig.endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aiConfig.apiKey}`
            },
            body: JSON.stringify({
                model: aiConfig.model,
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: temperature,
                max_tokens: maxTokens,
                stream: stream
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // 提取AI回复
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            throw new Error('API返回数据格式错误');
        }

    } catch (error) {
        console.error('AI分析错误:', error);
        return getFallbackAnalysis(divinationData);
    } finally {
        isAnalyzing = false;
    }
}

/**
 * 构建发送给AI的用户消息
 */
function buildUserMessage(data) {
    const { question, originalHex, changedHex, lines, changingLines } = data;
    
    let message = `【占卜问题】\n${question}\n\n`;
    
    message += `【本卦】${originalHex.name}卦\n`;
    message += `卦辞：${originalHex.description}\n`;
    message += `解读：${originalHex.interpretation}\n\n`;
    
    if (changedHex && changingLines.length > 0) {
        message += `【变卦】${changedHex.name}卦\n`;
        message += `卦辞：${changedHex.description}\n`;
        message += `解读：${changedHex.interpretation}\n\n`;
        
        message += `【变爻】\n`;
        changingLines.forEach(lineNum => {
            const lineText = getLineText(lineNum, lines[lineNum - 1]);
            message += `第${lineNum}爻：${lineText}\n`;
        });
    } else {
        message += '【变爻】无变爻，为静卦\n';
    }
    
    message += '\n请作为易经大师，为我详细分析这个卦象，并给出具体的人生建议。';
    
    return message;
}

/**
 * 获取爻辞文本
 */
function getLineText(lineNum, lineValue) {
    const positions = ['初', '二', '三', '四', '五', '上'];
    const yinYang = lineValue === 6 || lineValue === 9 ? '变' : (lineValue === 7 ? '阳' : '阴');
    
    // 这里可以从hexagram-data.js获取真实爻辞
    // 暂时返回简化版本
    return `${positions[lineNum - 1]}${yinYang}`;
}

/**
 * 备用分析（当AI调用失败时）
 */
function getFallbackAnalysis(data) {
    const { originalHex, changedHex, changingLines } = data;
    
    let analysis = `【${originalHex.name}卦启示】\n\n`;
    analysis += `${originalHex.interpretation}\n\n`;
    
    if (changedHex && changingLines.length > 0) {
        analysis += `【变化趋势】\n\n`;
        analysis += `卦象从${originalHex.name}变为${changedHex.name}，`;
        analysis += `预示着事态将朝着新的方向发展。${changedHex.interpretation}\n\n`;
    }
    
    analysis += `【智慧建议】\n\n`;
    analysis += `1. 顺应自然规律，不可强求\n`;
    analysis += `2. 保持内心平和，静观其变\n`;
    analysis += `3. 积极行动，但要把握时机\n`;
    analysis += `4. 反思自身，完善不足\n\n`;
    
    analysis += `易经告诉我们：吉凶悔吝，生乎动。一切变化都在你的选择之中。`;
    
    return analysis;
}

/**
 * 流式输出AI分析（逐字显示效果）
 */
async function streamAIAnalysis(divinationData, displayCallback) {
    const fullText = await getAIAnalysis(divinationData);
    
    // 逐字显示
    let currentText = '';
    const chars = fullText.split('');
    
    for (let i = 0; i < chars.length; i++) {
        currentText += chars[i];
        displayCallback(currentText);
        
        // 控制显示速度
        await new Promise(resolve => setTimeout(resolve, 30));
    }
    
    return fullText;
}

/**
 * 显示AI分析加载状态
 */
function showAILoading(container) {
    const loadingHTML = `
        <div class="ai-loading">
            <div class="loading-spinner"></div>
            <p>🔮 AI大师正在解读卦象...</p>
            <p class="loading-hint">运用易经智慧，为您深度分析</p>
        </div>
    `;
    container.innerHTML = loadingHTML;
}

/**
 * 显示AI分析结果
 */
function displayAIResult(container, text) {
    const resultHTML = `
        <div class="ai-result-content">
            <div class="ai-badge">
                <span class="ai-icon">🤖</span>
                <span class="ai-label">DeepSeek AI 智能分析</span>
            </div>
            <div class="ai-text">${formatAIText(text)}</div>
        </div>
    `;
    container.innerHTML = resultHTML;
}

/**
 * 格式化AI文本（添加段落和样式）
 */
function formatAIText(text) {
    // 将换行转为段落
    return text
        .split('\n\n')
        .map(paragraph => {
            if (paragraph.trim().startsWith('【') || paragraph.trim().startsWith('##')) {
                return `<h4 class="ai-section-title">${paragraph.trim()}</h4>`;
            } else if (paragraph.trim()) {
                return `<p class="ai-paragraph">${paragraph.trim()}</p>`;
            }
            return '';
        })
        .join('');
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getAIAnalysis,
        streamAIAnalysis,
        showAILoading,
        displayAIResult
    };
}
