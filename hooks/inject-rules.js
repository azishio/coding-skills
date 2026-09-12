#!/usr/bin/env node
// Emits the anti-overengineering rules as hook context for SessionStart and
// SubagentStart on Claude Code and Codex. Stateless: no flag file, no config,
// no stdin. Never fails the session: any error exits 0 with empty output.
'use strict';

const fs = require('fs');
const path = require('path');

const event = process.argv[2] || 'SessionStart';
const skillPath = path.join(__dirname, '..', 'skills', 'anti-overengineering', 'SKILL.md');

try {
  const body = fs.readFileSync(skillPath, 'utf8').replace(/^---[\s\S]*?---\s*/, '');
  const additionalContext = 'ANTI-OVERENGINEERING RULES ACTIVE\n\n' + body;
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: event, additionalContext },
  }));
} catch (_) {
  // A missing skill file means a broken install; a closed stdout means the host
  // is gone. Neither is worth failing the hook over.
}
