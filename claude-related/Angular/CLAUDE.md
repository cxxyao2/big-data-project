# Angular Project Workflow for Claude Code

## Project Basic Info

- Project Type: Angular (TypeScript)
- Package Manager: npm (可替换为yarn/pnpm)
- Build Tool: Angular CLI
- Test Tool: Playwright (E2E测试)

## Workflow Triggers (核心触发规则)

### Trigger Keyword: "build"

When I say "build" or "run build" or "build and test", you must:

1. First execute the Angular build command defined in package.json
2. After the build succeeds, execute the Playwright test command
3. Return the full command sequence (copy-paste ready) and explain each step

## Command Definitions (命令定义，和package.json保持一致)

### 1. Angular Build Command

- Command: `npm run build` (对应package.json中的"build"脚本)
- Purpose: Compile Angular project to production-ready static files (dist/目录)
- Success Criterion: No error output, dist/ directory generated

### 2. Playwright Test Command

- Command: `npm run test:playwright` (需确保package.json中有此脚本)
- Purpose: Run Playwright E2E tests against the built Angular app
- Precondition: Angular build must succeed first
- Alternative (若未配置脚本): `npx playwright test`

## Package.json Scripts Reference (你的实际脚本示例，替换为自己的)

```json
{
  "scripts": {
    "build": "ng build --configuration production", // Angular生产构建
    "test:playwright": "playwright test" // Playwright测试（可根据你的配置调整）
  }
}
```
