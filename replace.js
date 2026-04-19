const fs = require('fs');

let html = fs.readFileSync('superme.html', 'utf8');

// 1. Specifically replace the existing Vertora logo img tag (in the nav) with our newly placed superme-logo.png
html = html.replace(/<img[^>]*alt="Vertora-white-logo"[^>]*>/gi, '<img alt="Super Me Logo" src="superme-logo.png" loading="lazy" class="rt-nav-logo" style="height: auto; max-height: 48px; object-fit: contain;" />');

// Protect src, href attributes
html = html.replace(/(src|href)="([^"]*)"/gi, (match, attr, val) => {
    return `${attr}="===___${Buffer.from(val).toString('base64')}___==="`;
});

// Protect url(&quot;...&quot;) 
html = html.replace(/url\(&quot;(.*?)&quot;\)/gi, (match, val) => {
    return `url(&quot;===___${Buffer.from(val).toString('base64')}___===&quot;)`;
});

// Protect fully qualified https:// links
html = html.replace(/https:\/\/[a-zA-Z0-9\-\.\/\?\_=&%]+/g, (match) => {
    return `===___${Buffer.from(match).toString('base64')}___===`;
});

// Replace "Vertora", "vertora", "VERTORA" mappings
html = html.replace(/Vertora/g, 'Superme');
html = html.replace(/vertora/g, 'superme');
html = html.replace(/VERTORA/g, 'SUPERME');

// Restore src, href attributes
html = html.replace(/(src|href)="===___([a-zA-Z0-9+/=]+)___==="/gi, (match, attr, b64) => {
    return `${attr}="${Buffer.from(b64, 'base64').toString('utf8')}"`;
});

// Restore url(&quot;...&quot;)
html = html.replace(/url\(&quot;===___([a-zA-Z0-9+/=]+)___===&quot;\)/gi, (match, b64) => {
    return `url(&quot;${Buffer.from(b64, 'base64').toString('utf8')}&quot;)`;
});

// Restore https links
html = html.replace(/===___([a-zA-Z0-9+/=]+)___===/g, (match, b64) => {
    return Buffer.from(b64, 'base64').toString('utf8');
});

fs.writeFileSync('superme.html', html, 'utf8');
console.log("Replacement logic successfully safely applied to superme.html!");
