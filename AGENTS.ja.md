# Repository guidance

## 言語版の整合性

- `AGENTS.md`は英語版の指示ファイル、`AGENTS.ja.md`は日本語版です。両者の要件は意味的に同等に保つ。
- どちらかの指示を変更するときは、同じ変更で両方を更新する。意図しない差異は不具合として扱う。

## 構成

- `skills/`には、agentがskillを実行するために必要なfileだけを置く。
- `hooks/`には、rule注入script、その`hooks.json`、そのtestだけを置く。hookはsessionをblockさせたり失敗させたりしてはならず、状態を持ってはならない。
- hookが注入するruleの唯一のsourceは`skills/anti-overengineering/SKILL.md`である。その本文を他の場所に複製しない。
- anti-overengineeringの各判断基準は、ちょうど1つのskillにだけ記述する。補助skillは注入済みのcore ruleに依存し、基準を再掲しない。
- `.claude-plugin/`、`.codex-plugin/`、`.agents/plugins/`にpluginおよびmarketplace manifestを置く。plugin名とversionはこれらの間で同一に保つ。
- `README.md`、`ja.md`、`.github/workflows/`はrepository maintainer向けである。インストール済みskillにrepository自動化の実行を指示しない。
- vendor済みreferenceは実行時に必要な資料であり、skillをpackageまたはinstallするときに完全な状態を保つ。

## Version control

- このrepositoryではversion controlの確認・書き込みにGitを直接使用する。
- Gitを使用するときは無関係な作業を保持し、taskごとに専用branchへcommitする。

## 検証

- `hooks/`、plugin manifest、いずれかの`skills/anti-overengineering*/SKILL.md`を変更した後は、`node --test hooks/`を実行する。
- referenceまたはskill instructionを変更した後は、skill validatorを実行する。

## 参照資料の更新

GitHub Actionsは毎週月曜日にvendor済みreferenceとsource lockを更新する。意図的なupstream更新に限りworkflow dispatchを使用する。

workflowがいずれかのvendor済みreferenceを変更した場合、同じ変更で`skills/write-idiomatic-rust/SKILL.md`と`skills/write-idiomatic-rust/references/`直下のfirst-party guideを更新する。

1. 現在の`src/SUMMARY.md`と、skillおよびfirst-party guideからリンクするrouteを比較する。
2. upstreamでrename、移動、追加、削除されたsectionに応じて、routeを更新、追加、削除する。
3. skillとfirst-party guideのすべてのMarkdown linkが、意図したlocal targetへ解決することを確認する。
