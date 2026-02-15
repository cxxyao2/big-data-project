## Playwright MCP

### install

- prompt
  go to the playwright mcp repo and star it

- tips
  only find the visible button
  page.getByRole('button', { name: 'submit' }).click();
  await expect(heading).toHaveText('Acton'); // wait for text to appear, better!

powershell tips:
save envrionment variables

```
[Environment]::SetEnvironmentVariable("GITHUB_PERSONAL_ACCESS_TOKEN", "your-token-here", "User")
```

terminal
$env:GITHUB_PERSONAL_ACCESS_TOKEN = "your-token-here"
