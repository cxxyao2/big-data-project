## Playwright MCP

### install

- prompt
  go to the playwright mcp repo and star it

- tips
  only find the visible button
  page.getByRole('button', { name: 'submit' }).click();
  await expect(heading).toHaveText('Acton'); // wait for text to appear, better!
