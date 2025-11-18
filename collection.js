// 收藏页面逻辑
document.addEventListener('DOMContentLoaded', function() {
    loadCollection();
    
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllCollections);
    }
});

// 加载收藏列表
function loadCollection() {
    const savedResults = JSON.parse(localStorage.getItem('divinationResults') || '[]');
    const collectionList = document.getElementById('collectionList');
    const emptyState = document.getElementById('emptyState');
    
    if (savedResults.length === 0) {
        collectionList.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }
    
    collectionList.style.display = 'grid';
    emptyState.style.display = 'none';
    
    collectionList.innerHTML = '';
    
    savedResults.forEach((result, index) => {
        const card = createCollectionCard(result, index);
        collectionList.appendChild(card);
    });
}

// 创建收藏卡片
function createCollectionCard(result, index) {
    const card = document.createElement('div');
    card.className = 'collection-card';
    
    const hexagram = getHexagramByName(result.hexagram);
    const hasChanging = result.changingLines && result.changingLines.length > 0;
    
    card.innerHTML = `
        <div class="collection-header">
            <h3 class="collection-title">${result.hexagram}</h3>
            <button class="delete-btn" onclick="deleteCollection(${index})">🗑️</button>
        </div>
        <div class="collection-meta">
            <span class="collection-time">⏰ ${result.timestamp}</span>
            ${hasChanging ? '<span class="changing-badge">有变爻</span>' : ''}
        </div>
        ${result.question ? `<div class="collection-question">
            <strong>问题：</strong>${result.question}
        </div>` : ''}
        <div class="collection-hexagram">
            ${renderMiniHexagram(result.lines)}
        </div>
        <div class="collection-interpretation">
            ${hexagram ? hexagram.interpretation.substring(0, 80) + '...' : ''}
        </div>
        <button class="btn-secondary view-detail-btn" onclick="viewDetail(${index})">查看详情</button>
    `;
    
    return card;
}

// 渲染小卦象
function renderMiniHexagram(lines) {
    let html = '<div class="mini-hexagram">';
    for (let i = 5; i >= 0; i--) {
        const value = lines[i];
        if (value % 2 === 1) {
            html += '<div class="mini-yang"></div>';
        } else {
            html += '<div class="mini-yin"><span></span><span></span></div>';
        }
    }
    html += '</div>';
    return html;
}

// 根据卦名获取卦象信息
function getHexagramByName(name) {
    for (let id in HEXAGRAM_DATA) {
        if (HEXAGRAM_DATA[id].name === name) {
            return HEXAGRAM_DATA[id];
        }
    }
    return null;
}

// 查看详情
function viewDetail(index) {
    const savedResults = JSON.parse(localStorage.getItem('divinationResults') || '[]');
    const result = savedResults[index];
    
    if (!result) return;
    
    // 保存到临时存储，在占卜页面显示
    sessionStorage.setItem('viewingResult', JSON.stringify(result));
    window.location.href = 'zhanbu.html?view=true';
}

// 删除收藏
function deleteCollection(index) {
    if (!confirm('确定要删除这条收藏吗？')) {
        return;
    }
    
    let savedResults = JSON.parse(localStorage.getItem('divinationResults') || '[]');
    savedResults.splice(index, 1);
    localStorage.setItem('divinationResults', JSON.stringify(savedResults));
    
    loadCollection();
}

// 清空全部收藏
function clearAllCollections() {
    if (!confirm('确定要清空所有收藏吗？此操作不可恢复！')) {
        return;
    }
    
    localStorage.removeItem('divinationResults');
    loadCollection();
}
