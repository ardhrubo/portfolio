import re

with open('src/App.css', 'r') as f:
    css = f.read()

# Change main git line
css = css.replace('background-color: var(--border);', 'background-color: var(--accent);')
# (Wait, if I replace all var(--border), it will break other things. Let me be specific)

with open('src/App.css', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '.git-line {' in line:
        for j in range(i, i+10):
            if 'background-color: var(--border);' in lines[j]:
                lines[j] = lines[j].replace('var(--border)', 'var(--accent)')
                break
    if '.git-branch-curve {' in line:
        for j in range(i, i+10):
            if 'border-left:' in lines[j] or 'border-bottom:' in lines[j]:
                lines[j] = lines[j].replace('var(--border)', 'var(--syntax-string)')
    if '.git-merge-curve {' in line:
        for j in range(i, i+10):
            if 'border-right:' in lines[j] or 'border-top:' in lines[j]:
                lines[j] = lines[j].replace('var(--border)', 'var(--syntax-string)')
                
with open('src/App.css', 'w') as f:
    f.writelines(lines)

print("Updated timeline colors")
