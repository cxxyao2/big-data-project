CLAUDE.md should be in the root directory (where package.json is located)

2, 核心原理
CLAUDE.md是 Claude Code 的 “项目上下文说明书”，放在项目根目录后，Claude 会自动读取其中的规则：你定义 “触发关键词（如 build）” 和 “对应要执行的命令”，Claude 就能识别指令并返回可直接运行的命令序列（甚至帮你解释执行步骤）