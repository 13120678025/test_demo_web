// 分享页面逻辑
document.addEventListener('DOMContentLoaded', function() {
    loadShareContent();
    
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const downloadImageBtn = document.getElementById('downloadImageBtn');
    const shareWechatBtn = document.getElementById('shareWechatBtn');
    
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', copyShareLink);
    }
    if (downloadImageBtn) {
        downloadImageBtn.addEventListener('click', downloadAsImage);
    }
    if (shareWechatBtn) {
        shareWechatBtn.addEventListener('click', shareToWechat);
    }
});

// 加载分享内容
function loadShareContent() {
    // 从sessionStorage获取最新的占卜结果
    const savedResults = JSON.parse(localStorage.getItem('divinationResults') || '[]');
    
    if (savedResults.length === 0) {
        return; // 显示默认内容
    }
    
    const latestResult = savedResults[0];
    const sharePreview = document.getElementById('sharePreview');
    const shareOptions = document.getElementById('shareOptions');
    
    // 显示分享内容
    sharePreview.innerHTML = createShareCard(latestResult);
    shareOptions.style.display = 'block';
}

// 创建分享卡片
function createShareCard(result) {
    const hexagram = getHexagramByName(result.hexagram);
    
    return `
        <div class="share-card" id="shareCard">
            <div class="share-card-header">
                <div class="share-logo">
                    <span class="logo-icon">☯</span>
                    <span>易经占卜</span>
                </div>
                <div class="share-time">${result.timestamp}</div>
            </div>
            
            <div class="share-card-body">
                <h2 class="share-hexagram-name">${result.hexagram}</h2>
                
                ${result.question ? `
                <div class="share-question">
                    <strong>占问：</strong>${result.question}
                </div>
                ` : ''}
                
                <div class="share-hexagram-display">
                    ${renderShareHexagram(result.lines)}
                </div>
                
                <div class="share-interpretation">
                    <p><strong>卦辞：</strong>${hexagram ? hexagram.description : ''}</p>
                    <p>${hexagram ? hexagram.interpretation : ''}</p>
                </div>
                
                ${result.changingLines && result.changingLines.length > 0 ? `
                <div class="share-changing">
                    <span class="changing-badge">✨ 有${result.changingLines.length}个变爻</span>
                </div>
                ` : ''}
            </div>
            
            <div class="share-card-footer">
                <p>扫码体验易经占卜</p>
                <div class="share-qr">📱</div>
            </div>
        </div>
    `;
}

// 渲染分享用的卦象
function renderShareHexagram(lines) {
    let html = '<div class="share-hexagram-lines">';
    for (let i = 5; i >= 0; i--) {
        const value = lines[i];
        html += '<div class="share-line">';
        if (value % 2 === 1) {
            html += '<div class="share-yang"></div>';
        } else {
            html += '<div class="share-yin"><span></span><span></span></div>';
        }
        html += '</div>';
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

// 复制分享链接
function copyShareLink() {
    const url = window.location.origin + window.location.pathname.replace('fenxiang.html', 'index.html');
    
    // 尝试使用现代API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('链接已复制到剪贴板！');
        }).catch(() => {
            fallbackCopyText(url);
        });
    } else {
        fallbackCopyText(url);
    }
}

// 备用复制方法
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('链接已复制到剪贴板！');
    } catch (err) {
        showToast('复制失败，请手动复制链接');
    }
    
    document.body.removeChild(textArea);
}

// 下载为图片
function downloadAsImage() {
    showToast('图片下载功能需要引入html2canvas库，这里仅做演示');
    
    // 实际项目中需要引入html2canvas库
    // html2canvas(document.getElementById('shareCard')).then(canvas => {
    //     const link = document.createElement('a');
    //     link.download = 'yijing-divination.png';
    //     link.href = canvas.toDataURL();
    //     link.click();
    // });
}

// 分享到微信
function shareToWechat() {
    showToast('请保存图片后，在微信中发送给好友');
    // 实际项目中可以生成二维码
}

// 显示提示信息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}
