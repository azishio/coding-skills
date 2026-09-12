# Coding Skills

[English](README.md) | [日本語](ja.md)

Coding Skillsは、Claude CodeとCodex向けのagent skillとpluginを保守・公開するrepositoryです。実装するskillは[`skills/`](skills/)に置き、plugin manifestとlifecycle hookによってrepository rootをそのままinstall可能なpluginにしています。repository全体の利用方法と保守手順はこのREADMEとGitHub Actionsに集約します。

## 収録skill

### `write-idiomatic-rust`

Rustコードの実装、修正、レビュー、リファクタリングで、公開APIと内部実装を同じ品質基準で扱うskillです。Rust API Guidelines、Microsoft Pragmatic Rust Guidelines、Rust Design Patternsから変更に該当する規則を参照し、命名、関数とmethodの配置、型・所有権・error設計、可読性、予測可能性を確認します。strict Clippy runnerはproject固有のClippyを置き換えず、追加のreview基準として実行します。

参照routeは設計判断ごとに最初に読むguideを定め、未解決の問いがある場合だけ補足資料を開きます。vendor済みreferenceは完全な状態を保ち、必要な部分を選んで読みます。

Dependency selection guideは依存数よりも総保守コストを重視します。標準libraryと既存依存を確認し、汎用的な基盤を自作する前に、要件を満たす保守されたcrateを調べます。候補はserialization、CLI解析、validation、builder、async utilityなど繰り返し必要になる機能に絞り、許可listとしては扱いません。小さなdomain固有のlogicは必要に応じてproject内に置きます。crateを採用するときは、registryの最新releaseと選定versionの公式documentationを確認し、API、feature、MSRV、互換性をprojectの要件と照合します。

### `anti-overengineering`

すべての変更を、正しさを保てる範囲で最小に抑えるためのskill群です。中核skillは[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)の`ultra`強度を単一の常時有効なruleに簡略化したforkです。コードを書く前に、最初に成立する段で止まります（そもそも必要か、codebaseに既にあるか、標準libraryやplatformが提供しているか、導入済み依存で解決できるか、1行で書けるか）。そのうえで動作する最小限だけを書きます。信頼境界でのvalidation、データ損失を防ぐerror処理、security、accessibility、編集前の問題理解は決して省略しません。

pluginとしてinstallすると、[`hooks/hooks.json`](hooks/hooks.json)が`SessionStart`で中核skillを注入し、`SubagentStart`ですべてのsubagentにも注入します。強度level、切り替え、状態fileはありません。意図的な簡略化には、上限とupgrade pathを記した`anti-overengineering:` commentを付けます。

補助skill: `anti-overengineering-review`（diffの過剰設計review）、`anti-overengineering-audit`（repository全体の監査）、`anti-overengineering-debt`（`anti-overengineering:` commentの台帳化）、`anti-overengineering-gain`（upstream benchmarkのscoreboard）、`anti-overengineering-help`（quick reference）。

## セットアップ

### Claude Code plugin

```
/plugin marketplace add azishio/coding-skills
```
```
/plugin install coding-skills@coding-skills
```

2つのcommandは別々のpromptとして送信し、続けて`/reload-plugins`を実行します。skillは`/coding-skills:<skill>`という名前空間で呼び出します。hookは`node`を実行するため、非対話shellのPATHに`node`が必要です。無い場合でもskill自体は動作し、常時有効なruleの注入だけが無効になります。

### Codex plugin

```bash
codex plugin marketplace add azishio/coding-skills
codex plugin add coding-skills@coding-skills
```

`codex`を起動して`/hooks`を開き、2つのlifecycle hookを確認して信頼したうえで、新しいthreadを開始します。skillは`$<skill>`で呼び出します。

### skillのみ

```bash
npx skills add azishio/coding-skills --skill write-idiomatic-rust
npx skills add azishio/coding-skills --skill anti-overengineering
```

`skills` CLIは`skills/`配下の各skillを検出し、必要なreferenceを含む追跡済みsupport fileをすべてinstallします。全projectで利用する場合は`--global`、特定agentを指定する場合は`--agent <agent>`、symlinkを使えない場合は`--copy`を指定します。この経路ではskill fileだけがinstallされ、常時有効なhookは上記のplugin installが必要です。

## Maintainer向けセットアップ

repositoryを通常どおりcloneしてください。追跡済みreferenceはそのままlocal validationに使用でき、`skills add`によるinstallにも含まれます。`node --test hooks/`を実行すると、hook、plugin manifest、skill名を検証できます。

## 参照資料の更新

GitHub Actionsは毎週月曜日にRust API Guidelines、Microsoft Pragmatic Rust Guidelines、Rust Design Patternsから必要な`src/` directoryとlicense textをvendorします。差分がある場合は、正確なsource commitを[`reference-sources.json`](reference-sources.json)へ記録して自動commit・pushします。必要に応じてActionsの`workflow_dispatch`で手動実行してください。

## 構成

- `skills/`: 配布するagent向けskill。各skillには実行指示、agentが参照する資料、補助scriptだけを置く。
- `hooks/`: 状態を持たないrule注入hookと、その設定およびtest。
- `.claude-plugin/`、`.codex-plugin/`、`.agents/plugins/`: Claude CodeとCodex向けのpluginおよびmarketplace manifest。
- `.github/workflows/update-references.yml`: 毎週実行するreference更新自動化。
- `.github/workflows/test.yml`: hookとmanifestのtest。
- `README.md` と `ja.md`: 英語版・日本語版の人間向け導入・保守情報。

## License

このrepositoryで作成したfileは、[MIT License](LICENSE-MIT) または [Apache License, Version 2.0](LICENSE-APACHE) のいずれかを、利用者の選択で適用できるdual licenseとします。contributionも、明示的に別条件を指定しない限り同じ条件で受け入れます。

`skills/write-idiomatic-rust/references/` 配下のvendor済みreferenceは独立したupstream projectであり、上記licenseの対象外です。`anti-overengineering` skill群と`hooks/`はponytail（MIT）を改変した派生物であり、そのnoticeを[`skills/anti-overengineering/LICENSE-ponytail`](skills/anti-overengineering/LICENSE-ponytail)に保持しています。配布時は[Third-party notices](THIRD_PARTY_NOTICES.md)と各referenceに保持したlicense textを確認してください。

## Upstream references

- `rust-lang/api-guidelines` (`master`): Rust API Guidelines。Apache-2.0 または MIT。
- `microsoft/rust-guidelines` (`main`): Pragmatic Rust Guidelines。MIT。
- `rust-unofficial/patterns` (`main`): Rust Design Patterns。MPL-2.0。
- `DietrichGebert/ponytail` (v4.9.0): `anti-overengineering` skillとhookの派生元。MIT。vendorではなくforkして改変。

それぞれのvendor済みrevision、source、license、含めるpathは[`reference-sources.json`](reference-sources.json)に記録します。
