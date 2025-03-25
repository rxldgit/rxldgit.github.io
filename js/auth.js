document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    const statusEl = document.getElementById('status');
    const resultEl = document.getElementById('result');
    
    if (error) {
        statusEl.textContent = '授权失败';
        resultEl.innerHTML = `<div class="error">错误: ${error}</div>`;
        return;
    }
    
    if (code) {
        // 在实际应用中，这里会将code发送到自己的服务器
        // 由服务器与Allegro交换获取访问令牌
        // 这里仅作演示
        statusEl.textContent = '授权成功';
        resultEl.innerHTML = `
            <div class="success">
                <p>授权码已获取，请将此页面关闭并返回应用。</p>
                <p>授权码: <code>${code}</code></p>
            </div>
        `;
        
        // 也可以自动将code发送到您的服务器
        // 例如: sendCodeToServer(code);
    } else {
        statusEl.textContent = '缺少授权码';
        resultEl.innerHTML = '<div class="error">未收到授权码，请重试</div>';
    }
});

// 实际应用中，使用此函数将授权码发送到您的服务器
function sendCodeToServer(code) {
    // 这里应该是您的后端服务地址
    const serverUrl = 'https://您的服务器地址/auth/callback';
    
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
