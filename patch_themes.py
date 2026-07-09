import re

with open('src/App.css', 'r') as f:
    css = f.read()

themes_css = """
body {
  background-color: var(--bg-dark);
  color: var(--text-main);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.theme-cafe {
  --bg-dark: #161412;
  --bg-darker: #0e0d0b;
  --bg-darkest: #090807;
  --bg-activity: #1a1815;
  --text-main: #ffeed6;
  --text-muted: #827148;
  --accent: #e8a07c;
  --accent-hover: #ffeed6;
  --border: #827148;
  --tab-active: #161412;
  --tab-inactive: #0e0d0b;
  --item-hover: #29241f;
  --item-active: #827148;
  --status-bg: #827148;
  --status-fg: #ffeed6;
  --syntax-keyword: #e8a07c;
  --syntax-string: #a5af79;
  --syntax-comment: #827148;
  --syntax-func: #ffeed6;
  --syntax-var: #e8a07c;
  --syntax-num: #a5af79;
}

.theme-synthwave {
  --bg-dark: #120e18;
  --bg-darker: #0c0910;
  --bg-darkest: #070509;
  --bg-activity: #181220;
  --text-main: #cccccc;
  --text-muted: #8b8596;
  --accent: #e22f80;
  --accent-hover: #ff7873;
  --border: #4a2185;
  --tab-active: #120e18;
  --tab-inactive: #0c0910;
  --item-hover: #29124a;
  --item-active: #8140dc;
  --status-bg: #8140dc;
  --status-fg: #ffffff;
  --syntax-keyword: #ffca95;
  --syntax-string: #ff7873;
  --syntax-comment: #8140dc;
  --syntax-func: #ffca95;
  --syntax-var: #ff7873;
  --syntax-num: #ffca95;
}

.theme-green {
  --bg-dark: #121612;
  --bg-darker: #0c100c;
  --bg-darkest: #070907;
  --bg-activity: #181d18;
  --text-main: #cccccc;
  --text-muted: #859685;
  --accent: #8eca3c;
  --accent-hover: #bbdc12;
  --border: #276f27;
  --tab-active: #121612;
  --tab-inactive: #0c100c;
  --item-hover: #276f27;
  --item-active: #499a13;
  --status-bg: #499a13;
  --status-fg: #ffffff;
  --syntax-keyword: #bbdc12;
  --syntax-string: #8eca3c;
  --syntax-comment: #499a13;
  --syntax-func: #bbdc12;
  --syntax-var: #8eca3c;
  --syntax-num: #bbdc12;
}

.settings-panel {
  padding: 0 15px;
}

.theme-card {
  border: 1px solid var(--border);
  background: var(--bg-darker);
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 15px;
}
.theme-card:hover {
  border-color: var(--accent);
  background: var(--bg-dark);
}
.theme-card.active {
  border-color: var(--accent);
  border-width: 2px;
}

.theme-preview {
  display: flex;
  gap: 5px;
}
.theme-swatch {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
"""

# Replace the :root block with body and just define default in root
root_regex = r":root \{[\s\S]*?\n\}"
css = re.sub(root_regex, ":root { font-family: 'Inter', sans-serif; }\n" + themes_css, css)

with open('src/App.css', 'w') as f:
    f.write(css)

