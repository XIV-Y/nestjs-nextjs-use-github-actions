フロントエンド（Next.js 15 + React 19）とバックエンド（NestJS）を組み合わせたフルスタックWebアプリケーション。
包括的なテスト環境とCI/CDパイプラインを含みます。

### CI/CD
- **GitHub Actions**
- **Discord通知**
- **Husky**
- **lint-staged**

## 環境構築
```bash
# 全体を起動
docker-compose up --build

# アクセス
# フロントエンド: http://localhost:3000
# バックエンド: http://localhost:3001
```

## テスト実行

### フロントエンド
```bash
cd frontend

# 単体テスト
npm test

# E2Eテスト
npm run test:e2e
```

### バックエンド
```bash
cd backend

# 単体テスト
npm run test:unit

# 統合テスト
npm run test:integration

# E2Eテスト
npm run test:e2e

# 全テスト
npm test
```

## デプロイ

GitHub Actionsによる自動デプロイが設定されています：

- `main`・`develop`ブランチへのプッシュで自動テスト実行
- テスト結果はDiscordに通知
- フロントエンド・バックエンド・E2Eテストが並列実行

## GitHub Actions Cache 検証手順

1. **GitHub Actionsのワークフローを実行する**
   - このリポジトリで指定されたワークフローをトリガーします。
   - 手動実行する場合、GitHubのリポジトリ画面で「Actions」タブをクリックし、該当するワークフローを選択して手動で実行します。

2. **ログを確認する**
   - 実行が完了したら、ワークフローのログを確認します。
   - 「Restore Cache」または関連するセクションを探します。

3. **キャッシュの復元確認**
   - ログ内に以下のメッセージが表示されていることを確認してください：
     ```
     Cache restored successfully
     ```

   - このメッセージが表示されている場合、キャッシュが正常に復元されていることを意味します。
