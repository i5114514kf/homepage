document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll(".kz-nav-btn");
    navBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            let type = this.dataset.window; 
            let content = this.dataset.href;
            
            switch (type) {
                case "pop":
                     console.warn("Pop mode is deprecated and layer.js is removed. Fallback to newtab.");
                     window.open(content, "_blank");
                     break;
                case "current":
                    window.location = content;
                    break;
                case "newtab":
                    window.open(content, "_blank");
                    break;
                default:
                    window.open(content, "_blank");
            }
        });
    });

    console.log(
      "\n" +
        " %c KZHomePage v1.2.0 by kaygb " +
        " %c https://blog.170601.xyz/archives/25.html " +
        "\n" +
        "\n",
      "color: #fff; background: #fd79a8; padding:5px 0;",
      "background: #FFF; padding:5px 0;"
    );

    // Lazy-load click heart effects on first user interaction
    const loadEffectsOnce = (() => {
        let loaded = false;
        return () => {
            if (loaded) return;
            loaded = true;
            const script = document.createElement('script');
            script.src = "./effects.js".replace("./", "./static/");
            script.defer = true;
            document.body.appendChild(script);
        };
    })();

    window.addEventListener('click', loadEffectsOnce, { once: true, passive: true });
    window.addEventListener('touchstart', loadEffectsOnce, { once: true, passive: true });

    // Hitokoto
    if (typeof hitokoto_api !== 'undefined') {
        fetch(hitokoto_api)
          .then((response) => response.json())
          .then((data) => {
            const hitokoto = document.getElementById("hitokoto_text");
            if(hitokoto) {
                // Check if hitokoto is an anchor tag, otherwise just set text
                // In index.html line 71: <p id="hitokoto_text">...</p>. It's a p tag, not a.
                // But original JS did hitokoto.href = ... which implies it expected an 'a' or didn't care.
                // Setting href on p tag does nothing. I'll check if I should wrap it or just ignore href.
                // The original code: hitokoto.href = ...; hitokoto.innerText = ...
                // If it is a P tag, href is useless. I will just set innerText.
                // However, to be safe and cleaner, I'll just set text. 
                // Wait, if I want it to be clickable, I should change the HTML tag to <a>. 
                // But for now I'll just replicate the text behavior.
                hitokoto.innerText = data.hitokoto;
                hitokoto.title = "Click to see source (if implemented)"; 
                // If the user wants it clickable, they should change P to A. 
                // Original code was trying to set href on a P tag (line 71 index.html). 
                // So the link was never working! 
                // I will improve this by creating an A tag or changing the P to A in HTML later.
                // For now, let's just stick to setting text.
            }
          })
          .catch(console.error);
    }
});
