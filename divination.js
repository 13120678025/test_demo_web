// 占卜状态管理
let currentThrow = 0;
let lines = []; // 存储六爻结果
let changingLines = []; // 存储变爻位置
let currentQuestion = '';

// 爻位名称和引导语
const LINE_NAMES = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];
const THROW_GUIDES = [
    '初爻为基，万物始生，请投掷第一爻',
    '二爻承上，阴阳交替，请投掷第二爻',
    '三爻连贯，内卦将成，请投掷第三爻',
    '四爻起势，外卦始现，请投掷第四爻',
    '五爻居中，君位显耀，请投掷第五爻',
    '上爻终结，卦象将成，请投掷第六爻'
];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    const prepareBtn = document.getElementById('prepareBtn');
    const startBtn = document.getElementById('startBtn');
    const throwBtn = document.getElementById('throwBtn');
    const resetBtn = document.getElementById('resetBtn');
    const saveBtn = document.getElementById('saveBtn');
    const getAIAnalysisBtn = document.getElementById('getAIAnalysis');
    
    if (prepareBtn) {
        prepareBtn.addEventListener('click', showQuestionSection);
    }
    if (startBtn) {
        startBtn.addEventListener('click', startDivination);
    }
    if (throwBtn) {
        throwBtn.addEventListener('click', throwCoins);
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', resetDivination);
    }
    if (saveBtn) {
        saveBtn.addEventListener('click', saveResult);
    }
    if (getAIAnalysisBtn) {
        getAIAnalysisBtn.addEventListener('click', getAIAnalysis);
    }
    
    // 预设问题按钮事件
    const presetBtns = document.querySelectorAll('.preset-btn');
    presetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            document.getElementById('questionInput').value = question;
            
            // 视觉反馈
            presetBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// 显示问题输入区
function showQuestionSection() {
    const prepareSection = document.getElementById('prepareSection');
    const questionSection = document.getElementById('questionSection');
    
    prepareSection.style.opacity = '0';
    prepareSection.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        prepareSection.style.display = 'none';
        questionSection.style.display = 'block';
        setTimeout(() => {
            questionSection.style.opacity = '1';
            questionSection.style.transform = 'scale(1)';
        }, 50);
    }, 300);
}

// 开始占卜
function startDivination() {
    currentQuestion = document.getElementById('questionInput').value;
    const questionSection = document.getElementById('questionSection');
    const coinSection = document.getElementById('coinSection');
    
    // 淡出问题区
    questionSection.style.opacity = '0';
    questionSection.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        questionSection.style.display = 'none';
        coinSection.style.display = 'block';
        
        // 淡入投币区
        setTimeout(() => {
            coinSection.style.opacity = '1';
            coinSection.style.transform = 'scale(1)';
        }, 50);
    }, 300);
    
    currentThrow = 0;
    lines = [];
    changingLines = [];
    updateProgress();
    updateThrowGuide();
}

// 投掷铜钱
function throwCoins() {
    if (currentThrow >= 6) return;
    
    // 禁用按钮防止重复点击
    const throwBtn = document.getElementById('throwBtn');
    throwBtn.disabled = true;
    throwBtn.style.opacity = '0.6';
    
    // 模拟三枚铜钱投掷
    // 正面(字)=2, 反面(背)=3
    const coin1 = Math.random() < 0.5 ? 2 : 3;
    const coin2 = Math.random() < 0.5 ? 2 : 3;
    const coin3 = Math.random() < 0.5 ? 2 : 3;
    const sum = coin1 + coin2 + coin3;
    
    // 显示投掷动画
    animateCoins([coin1, coin2, coin3]);
    
    // 记录结果
    lines.push(sum);
    
    // 记录变爻
    if (sum === 6 || sum === 9) {
        changingLines.push(currentThrow);
    }
    
    // 更新显示
    setTimeout(() => {
        updateLineDisplay(currentThrow, sum);
        currentThrow++;
        updateProgress();
        updateThrowGuide();
        
        // 重新启用按钮
        setTimeout(() => {
            throwBtn.disabled = false;
            throwBtn.style.opacity = '1';
        }, 500);
        
        if (currentThrow >= 6) {
            throwBtn.style.display = 'none';
            document.getElementById('throwHint').textContent = '✨ 卦象已成，正在为您解读...';
            setTimeout(showResultWithRitual, 1500);
        }
    }, 1200);
}

// 铜钱动画（增强版，支持SVG图片）
function animateCoins(coins) {
    const coinDisplay = document.getElementById('coinDisplay');
    const coinElements = coinDisplay.querySelectorAll('.coin');
    
    // 先让所有铜钱上升
    coinElements.forEach((coin) => {
        coin.style.transform = 'translateY(-30px) scale(1.1)';
    });
    
    // 延迟后开始翻转
    setTimeout(() => {
        coinElements.forEach((coin, index) => {
            coin.classList.add('flipping');
            coin.style.transform = '';
            
            const coinImg = coin.querySelector('.coin-img');
            setTimeout(() => {
                // 根据结果切换图片
                if (coins[index] === 2) {
                    coinImg.src = 'images/coin-qianlong-front.svg';  // 正面（字）
                    coinImg.alt = '乾隆通宝-正面';
                } else {
                    coinImg.src = 'images/coin-qianlong-back.svg';   // 背面
                    coinImg.alt = '乾隆通宝-背面';
                }
                
                coin.classList.remove('flipping');
                
                // 结果显示后的闪光效果
                coin.classList.add('coin-result');
                setTimeout(() => {
                    coin.classList.remove('coin-result');
                }, 500);
            }, 600);
        });
    }, 200);
}

// 更新进度
function updateProgress() {
    const throwCount = document.getElementById('throwCount');
    const progressFill = document.getElementById('progressFill');
    
    if (currentThrow < 6) {
        throwCount.textContent = `${LINE_NAMES[currentThrow]} · 第 ${currentThrow + 1} 次投掷`;
        progressFill.style.width = `${(currentThrow / 6) * 100}%`;
    } else {
        throwCount.textContent = '✨ 六爻已成 · 卦象圆满';
        progressFill.style.width = '100%';
        progressFill.classList.add('progress-complete');
    }
}

// 更新投掷引导语
function updateThrowGuide() {
    const throwGuide = document.getElementById('throwGuide');
    const throwBtnText = document.getElementById('throwBtnText');
    
    if (currentThrow < 6) {
        throwGuide.textContent = THROW_GUIDES[currentThrow];
        throwBtnText.textContent = `投掷${LINE_NAMES[currentThrow]}`;
    }
}

// 更新爻的显示
function updateLineDisplay(index, value) {
    const lineElement = document.getElementById(`line${index + 1}`);
    const span = lineElement.querySelector('span');
    
    let symbol = '';
    let className = '';
    
    switch(value) {
        case 6: // 老阴（变）
            symbol = '⚋⚋ 💫';
            className = 'changing-yin';
            break;
        case 7: // 少阳
            symbol = '⚊';
            className = 'yang';
            break;
        case 8: // 少阴
            symbol = '⚋⚋';
            className = 'yin';
            break;
        case 9: // 老阳（变）
            symbol = '⚊ 💫';
            className = 'changing-yang';
            break;
    }
    
    span.textContent = symbol;
    span.className = className;
    lineElement.classList.add('active');
}

// 带仪式感的结果展示
function showResultWithRitual() {
    const coinSection = document.getElementById('coinSection');
    const resultSection = document.getElementById('resultSection');
    
    // 淡出投币区
    coinSection.style.opacity = '0';
    coinSection.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        coinSection.style.display = 'none';
        resultSection.style.display = 'block';
        resultSection.style.opacity = '0';
        resultSection.style.transform = 'scale(0.95)';
        
        // 淡入结果区
        setTimeout(() => {
            resultSection.style.opacity = '1';
            resultSection.style.transform = 'scale(1)';
            showResult();
        }, 100);
    }, 500);
}

// 显示结果
function showResult() {
    
    // 获取本卦信息
    const originalHexagram = getHexagramInfo(lines);
    displayHexagram('originalHexagram', lines);
    document.getElementById('originalName').textContent = originalHexagram.name;
    
    // 显示变卦（如果有变爻）
    if (changingLines.length > 0) {
        const changedLines = getChangedHexagram(lines, changingLines);
        const changedHexagram = getHexagramInfo(changedLines);
        
        document.getElementById('changedHexagramColumn').style.display = 'block';
        displayHexagram('changedHexagram', changedLines);
        document.getElementById('changedName').textContent = changedHexagram.name;
    }
    
    // 显示解读
    displayInterpretation(originalHexagram);
}

// 显示卦象
function displayHexagram(elementId, lines) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    // 从上往下显示（但数组是从下往上存储的）
    for (let i = 5; i >= 0; i--) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'hexagram-line';
        
        const value = lines[i];
        if (value % 2 === 1) { // 阳爻
            lineDiv.innerHTML = '<div class="yang-line"></div>';
        } else { // 阴爻
            lineDiv.innerHTML = '<div class="yin-line"><span></span><span></span></div>';
        }
        
        container.appendChild(lineDiv);
    }
}

// 显示解读
function displayInterpretation(hexagram) {
    const interpretationDiv = document.getElementById('interpretation');
    interpretationDiv.innerHTML = `
        <h5>${hexagram.name}</h5>
        <p><strong>卦辞：</strong>${hexagram.description}</p>
        <p><strong>解释：</strong>${hexagram.interpretation}</p>
    `;
    
    // 显示变爻的爻辞
    const lineInterpretationDiv = document.getElementById('lineInterpretation');
    if (changingLines.length > 0) {
        let lineText = '<p><strong>变爻：</strong></p><ul>';
        changingLines.forEach(index => {
            const lineName = ['初', '二', '三', '四', '五', '上'][index];
            lineText += `<li>${lineName}爻变动，表示此爻对占卜结果有重要影响</li>`;
        });
        lineText += '</ul>';
        lineInterpretationDiv.innerHTML = lineText;
    } else {
        lineInterpretationDiv.innerHTML = '<p>无变爻，以本卦卦辞为准。</p>';
    }
}

// AI分析 - 使用DeepSeek真实API
async function getAIAnalysis() {
    const button = document.getElementById('getAIAnalysis');
    const resultDiv = document.getElementById('aiResult');
    
    button.disabled = true;
    button.textContent = '🤖 AI大师分析中...';
    
    // 显示加载状态
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="ai-loading">
            <div class="loading-spinner"></div>
            <p class="loading-text">🔮 DeepSeek AI 正在解读卦象...</p>
            <p class="loading-hint">运用易经智慧与现代AI，为您深度分析</p>
        </div>
    `;
    
    try {
        // 准备占卜数据
        const originalHexagram = getHexagramInfo(lines);
        const changedHexagram = changingLines.length > 0 ? getChangedHexagram(lines, changingLines) : null;
        
        const divinationData = {
            question: currentQuestion,
            originalHex: {
                name: originalHexagram.name,
                description: originalHexagram.description,
                interpretation: originalHexagram.interpretation
            },
            changedHex: changedHexagram ? {
                name: changedHexagram.name,
                description: changedHexagram.description,
                interpretation: changedHexagram.interpretation
            } : null,
            lines: lines,
            changingLines: changingLines
        };
        
        // 调用AI分析
        const analysis = await callDeepSeekAI(divinationData);
        
        // 显示结果
        displayAIAnalysis(resultDiv, analysis);
        button.style.display = 'none';
        
    } catch (error) {
        console.error('AI分析失败:', error);
        
        // 显示备用分析
        const fallbackAnalysis = generateFallbackAnalysis();
        resultDiv.innerHTML = `
            <div class="ai-error">
                <p class="error-msg">⚠️ AI分析暂时不可用，为您提供传统解读</p>
            </div>
            ${fallbackAnalysis}
        `;
        
        button.disabled = false;
        button.textContent = '重试AI分析';
    }
}

// 调用DeepSeek API
async function callDeepSeekAI(data) {
    // 检查配置是否加载
    if (typeof CONFIG === 'undefined') {
        throw new Error('配置文件未加载，请确保 config.js 已正确引入');
    }
    
    // 从配置文件获取API配置
    const { apiKey, baseURL, model } = CONFIG.DEEPSEEK;
    const { temperature, maxTokens, stream } = CONFIG.AI;
    
    // 验证API Key
    if (!apiKey || apiKey === 'YOUR_DEEPSEEK_API_KEY_HERE') {
        throw new Error('请在 config.js 中配置有效的 API Key');
    }
    
    // 构建提示词
    const systemPrompt = `你是一位精通易经的占卜大师，拥有深厚的国学功底和丰富的人生阅历。
你的分析风格：
1. 专业严谨，但语言亲切易懂
2. 结合现代心理学和传统智慧
3. 给出具体可行的建议
4. 语言优美，富有哲理
5. 分析约300-500字

请基于用户的问题和卦象，给出深入的分析和人生指导。`;
    
    const userMessage = buildAIPrompt(data);
    
    const response = await fetch(`${baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            temperature: temperature,
            max_tokens: maxTokens,
            stream: stream
        })
    });
    
    if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.choices && result.choices.length > 0) {
        return result.choices[0].message.content;
    } else {
        throw new Error('API返回数据格式错误');
    }
}

// 构建AI提示词
function buildAIPrompt(data) {
    let prompt = `【占卜问题】\n${data.question}\n\n`;
    
    prompt += `【本卦】${data.originalHex.name}卦\n`;
    prompt += `卦辞：${data.originalHex.description}\n`;
    prompt += `解读：${data.originalHex.interpretation}\n\n`;
    
    if (data.changedHex) {
        prompt += `【变卦】${data.changedHex.name}卦\n`;
        prompt += `卦辞：${data.changedHex.description}\n`;
        prompt += `解读：${data.changedHex.interpretation}\n\n`;
        
        if (data.changingLines.length > 0) {
            prompt += `【变爻】第${data.changingLines.join('、')}爻\n\n`;
        }
    } else {
        prompt += '【变爻】无变爻，为静卦\n\n';
    }
    
    prompt += '请作为易经大师，为我详细分析这个卦象的含义，并结合我的问题给出具体的人生建议和行动指引。';
    
    return prompt;
}

// 显示AI分析结果
function displayAIAnalysis(container, text) {
    const formattedText = text
        .split('\n\n')
        .map(para => {
            if (para.trim().startsWith('【') || para.trim().startsWith('##')) {
                return `<h4 class="ai-section-title">${para.trim()}</h4>`;
            } else if (para.trim()) {
                return `<p class="ai-paragraph">${para.trim()}</p>`;
            }
            return '';
        })
        .join('');
    
    container.innerHTML = `
        <div class="ai-result-content">
            <div class="ai-badge">
                <span class="ai-icon">🤖</span>
                <span class="ai-label">DeepSeek AI 智能分析</span>
            </div>
            <div class="ai-text">
                ${formattedText}
            </div>
            <p class="ai-footer">💡 本分析由DeepSeek AI结合易经智慧生成，仅供参考</p>
        </div>
    `;
}

// 备用分析（AI不可用时）
function generateFallbackAnalysis() {
    const originalHexagram = getHexagramInfo(lines);
    
    return `<div class="ai-analysis-content">
        <h4>【${originalHexagram.name}卦启示】</h4>
        <p>${originalHexagram.interpretation}</p>
        
        <h4>【智慧建议】</h4>
        <p>1. 顺应自然规律，不可强求事物发展</p>
        <p>2. 保持内心平和，静观事态变化</p>
        <p>3. 积极行动准备，把握时机而动</p>
        <p>4. 反思自身不足，完善提升自我</p>
        
        <p class="ai-note">易经告诉我们：吉凶悔吝，生乎动。一切变化都在你的选择之中。</p>
    </div>`;
}

// 保存结果
function saveResult() {
    const originalHexagram = getHexagramInfo(lines);
    const timestamp = new Date().toLocaleString('zh-CN');
    
    const result = {
        id: Date.now(),
        question: currentQuestion,
        hexagram: originalHexagram.name,
        lines: lines,
        changingLines: changingLines,
        timestamp: timestamp
    };
    
    // 保存到localStorage
    let savedResults = JSON.parse(localStorage.getItem('divinationResults') || '[]');
    savedResults.unshift(result);
    
    // 最多保存指定条数记录（从配置读取）
    const maxResults = (typeof CONFIG !== 'undefined' && CONFIG.SITE) 
        ? CONFIG.SITE.maxSavedResults 
        : 50;
    
    if (savedResults.length > maxResults) {
        savedResults = savedResults.slice(0, maxResults);
    }
    
    localStorage.setItem('divinationResults', JSON.stringify(savedResults));
    
    alert('占卜结果已保存到收藏！');
}

// 重新占卜
function resetDivination() {
    const resultSection = document.getElementById('resultSection');
    const prepareSection = document.getElementById('prepareSection');
    
    // 淡出结果区
    resultSection.style.opacity = '0';
    resultSection.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        resultSection.style.display = 'none';
        prepareSection.style.display = 'block';
        
        // 淡入准备区
        setTimeout(() => {
            prepareSection.style.opacity = '1';
            prepareSection.style.transform = 'scale(1)';
        }, 50);
        
        // 重置所有状态
        document.getElementById('questionInput').value = '';
        document.getElementById('throwBtn').style.display = 'block';
        document.getElementById('throwHint').textContent = '* 每一爻都承载着天地之意，请用心感受';
        
        // 重置爻显示
        for (let i = 1; i <= 6; i++) {
            const lineElement = document.getElementById(`line${i}`);
            const span = lineElement.querySelector('span');
            span.textContent = '-';
            span.className = '';
            lineElement.classList.remove('active');
        }
        
        // 重置进度条
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = '0';
        progressFill.classList.remove('progress-complete');
        
        currentThrow = 0;
        lines = [];
        changingLines = [];
        currentQuestion = '';
    }, 300);
}
