document.addEventListener('DOMContentLoaded', () => {
    // 导航按钮：data-window="current" 在当前页面打开，其余均在新标签页打开
    document.querySelectorAll('.kz-nav-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const href = btn.dataset.href;
            if (btn.dataset.window === 'current') {
                location.href = href;
            } else {
                window.open(href, '_blank', 'noopener');
            }
        });
    });

    // 首次交互（点击/触摸）时按需加载爱心特效，避免首屏多余请求
    let effectsLoaded = false;
    const loadEffects = () => {
        if (effectsLoaded) return;
        effectsLoaded = true;
        const script = document.createElement('script');
        script.src = './static/effects.js';
        document.body.appendChild(script);
    };
    window.addEventListener('click', loadEffects, { once: true, passive: true });
    window.addEventListener('touchstart', loadEffects, { once: true, passive: true });

    // 一言：展示句子，并附带出处
    if (typeof hitokoto_api !== 'undefined') {
        fetch(hitokoto_api)
            .then((res) => res.json())
            .then((data) => {
                const el = document.getElementById('hitokoto_text');
                if (el && data.hitokoto) {
                    el.textContent = data.from
                        ? `${data.hitokoto} —— ${data.from}`
                        : data.hitokoto;
                }
            })
            .catch(() => {
                const el = document.getElementById('hitokoto_text');
                if (el) el.textContent = '一言加载失败，请稍后再试';
            });
    }
});