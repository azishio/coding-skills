---
name: anti-overengineering-help
description: >
  Quick-reference card for the anti-overengineering skills and how the
  always-on rules are applied. One-shot display, not a persistent mode.
  Trigger: /anti-overengineering-help, "anti-overengineering help", "what
  anti-overengineering commands", "how do I use anti-overengineering".
---

# Anti-overengineering Help

Display this reference card when invoked. One-shot, change nothing and persist
nothing.

## Always on

The plugin's lifecycle hooks inject `skills/anti-overengineering/SKILL.md` at
`SessionStart` and into every subagent at `SubagentStart`. There are no
intensity levels, no toggle, and no state file: the rules are either installed
or not. To stop them, disable or uninstall the plugin (Claude Code: `/plugin`,
Codex: `codex plugin remove coding-skills`).

## Skills

| Skill | Claude Code | Codex | What it does |
|-------|-------------|-------|--------------|
| **anti-overengineering** | `/coding-skills:anti-overengineering` | `$anti-overengineering` | The rules themselves. Simplest solution that works. |
| **anti-overengineering-review** | `/coding-skills:anti-overengineering-review` | `$anti-overengineering-review` | Over-engineering review of a diff: `L42: yagni: factory, one product. Inline.` |
| **anti-overengineering-audit** | `/coding-skills:anti-overengineering-audit` | `$anti-overengineering-audit` | Whole-repo over-engineering audit: ranked list of what to delete. |
| **anti-overengineering-debt** | `/coding-skills:anti-overengineering-debt` | `$anti-overengineering-debt` | Harvest `anti-overengineering:` shortcut comments into a tracked ledger. |
| **anti-overengineering-gain** | `/coding-skills:anti-overengineering-gain` | `$anti-overengineering-gain` | Upstream benchmark scoreboard: less code, less cost, more speed. |
| **anti-overengineering-help** | `/coding-skills:anti-overengineering-help` | `$anti-overengineering-help` | This card. |

## Update

Claude Code: `/plugin marketplace update coding-skills`, then `/reload-plugins`.
Codex: `codex plugin marketplace upgrade coding-skills`, then start a new thread.

## More

Full docs: https://github.com/azishio/coding-skills
