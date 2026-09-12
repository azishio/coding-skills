'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const script = path.join(__dirname, 'inject-rules.js');
const pluginName = 'coding-skills';

function run(scriptPath, ...args) {
  return spawnSync(process.execPath, [scriptPath, ...args], { encoding: 'utf8' });
}

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), 'utf8'));
}

for (const event of ['SessionStart', 'SubagentStart']) {
  test(`${event} emits the skill body as hook context`, () => {
    const result = run(script, event);
    assert.equal(result.status, 0, result.stderr);
    const output = JSON.parse(result.stdout).hookSpecificOutput;
    assert.equal(output.hookEventName, event);
    assert.ok(output.additionalContext.startsWith('ANTI-OVERENGINEERING RULES ACTIVE'));
    assert.doesNotMatch(output.additionalContext, /^name: /m, 'frontmatter must be stripped');
    assert.match(output.additionalContext, /## The ladder/);
    assert.match(output.additionalContext, /anti-overengineering:/);
    assert.doesNotMatch(output.additionalContext, /ponytail/i);
  });
}

test('a missing skill file stays silent and exits 0', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'inject-rules-'));
  try {
    const copy = path.join(temp, 'inject-rules.js');
    fs.copyFileSync(script, copy);
    const result = run(copy, 'SessionStart');
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout, '');
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});

test('hooks.json registers only the two stateless events', () => {
  const { hooks } = readJson('hooks/hooks.json');
  assert.deepEqual(Object.keys(hooks).sort(), ['SessionStart', 'SubagentStart']);
  for (const [event, groups] of Object.entries(hooks)) {
    for (const group of groups) {
      for (const hook of group.hooks) {
        assert.equal(hook.type, 'command');
        const match = hook.command.match(/^node "\$\{CLAUDE_PLUGIN_ROOT\}\/hooks\/([\w.-]+)" (\w+)$/);
        assert.ok(match, `unexpected command: ${hook.command}`);
        assert.ok(fs.existsSync(path.join(__dirname, match[1])), `${match[1]} must exist in hooks/`);
        assert.equal(match[2], event);
      }
    }
  }
});

test('plugin manifests agree on name and version', () => {
  const claude = readJson('.claude-plugin/plugin.json');
  const codex = readJson('.codex-plugin/plugin.json');
  const claudeMarket = readJson('.claude-plugin/marketplace.json');
  const codexMarket = readJson('.agents/plugins/marketplace.json');
  const names = [
    claude.name,
    codex.name,
    claudeMarket.name,
    codexMarket.name,
    ...claudeMarket.plugins.map((p) => p.name),
    ...codexMarket.plugins.map((p) => p.name),
  ];
  assert.deepEqual([...new Set(names)], [pluginName]);
  assert.equal(claude.version, codex.version);
  assert.equal(codex.hooks, './hooks/hooks.json');
});

test('anti-overengineering skills are named after their directories', () => {
  const skillsDir = path.join(root, 'skills');
  const dirs = fs.readdirSync(skillsDir).filter((d) => d.startsWith('anti-overengineering'));
  assert.deepEqual(dirs.sort(), [
    'anti-overengineering',
    'anti-overengineering-audit',
    'anti-overengineering-debt',
    'anti-overengineering-gain',
    'anti-overengineering-help',
    'anti-overengineering-review',
  ]);
  for (const dir of dirs) {
    const text = fs.readFileSync(path.join(skillsDir, dir, 'SKILL.md'), 'utf8');
    assert.match(text, new RegExp(`^name: ${dir}$`, 'm'));
    if (dir !== 'anti-overengineering-gain') {
      assert.doesNotMatch(text, /ponytail/i, `${dir} still mentions the upstream name`);
    }
  }
});
