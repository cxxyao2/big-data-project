# CLAUDE.md tips

open playwright.dev, search for locators and check that the doc is available for each language. take screenshots of each of the language docs

## check how much context usage

/init
/context

## Claude code , plan mode vs edit mode

for new feature, plan mode is better

## clear context

/clear
default : claude opus

/model
cost sensitive: claude sonnet, claude haiku

/exit
/resume
/mcp
/help
git status
/rewind

## four composability primitives

skills, commands, MCPs, Subagents.
How they work together separates casuals from power users.

### skills

basically a recurring workflow taht you can just

e.g.

- fetch latest news from hackernews
- save it to Claude.md in my local claude directory

### never create commands manually.

create a command that does x: let claude
manage the file structure.

in plan mode, talk:
why not extend the website to facebook ?

### commands

interchangable with skills

### MCPs = external service docs

structured documentation for database, browsers,
systems

talk to xxx

- find me a good FIGMA MCP.
- why dont install the MCP for me?

### sub agent

for do things in parallel

### run multiple instances

command + d, split,
have multiple tabs, switch between them,

### powerful for debugging

navigate, click, fill forms, read console,
'fix the error in console', one flow

### hooks & automation
