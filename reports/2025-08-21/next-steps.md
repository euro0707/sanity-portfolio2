# 次回作業計画 - Neo Portfolio 2

## 🚀 次回セッションでやること

### 1. Vercel デプロイ（優先度: 最高）
```bash
# 必要な手順
1. Vercel アカウント連携
2. GitHub リポジトリ接続
3. 環境変数設定:
   - NEXT_PUBLIC_SANITY_PROJECT_ID
   - NEXT_PUBLIC_SANITY_DATASET
   - GITHUB_TOKEN (オプション)
4. デプロイ確認
5. カスタムドメイン設定（必要に応じて）
```

### 2. GitHub API トークン設定（優先度: 高）
```bash
# GitHub での作業
1. Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Scopes: public_repo
4. .env.local に追加: GITHUB_TOKEN=ghp_xxxxx
5. API制限確認: 60回/時 → 5000回/時
```

### 3. Sanity Studio 問題解決（優先度: 中）
```bash
# 技術的修正が必要
1. fdir 依存関係問題調査
2. Sanity Studio 起動修正
3. CMS管理画面アクセス確認
4. プロジェクトスキーマ動作確認
```

## 📋 段階的実装計画

### Phase 1: デプロイ & 基本設定
- [ ] Vercel デプロイ完了
- [ ] GitHub API トークン設定
- [ ] 本番環境動作確認
- [ ] パフォーマンス測定

### Phase 2: コンテンツ管理
- [ ] Sanity Studio 修復
- [ ] 実際のプロジェクトデータ入力
- [ ] Mock データから実データへ切り替え
- [ ] GitHub統合テスト

### Phase 3: 機能拡張
- [ ] About ページ作成
- [ ] スキルセクション追加
- [ ] お問い合わせフォーム
- [ ] ブログ機能（オプション）

### Phase 4: 最適化
- [ ] SEO 設定完了
- [ ] Google Analytics 統合
- [ ] パフォーマンス最適化
- [ ] アクセシビリティ最終確認

## 🔧 準備しておくもの

### アカウント・サービス
- [ ] Vercel アカウント
- [ ] GitHub Personal Access Token
- [ ] Sanity プロジェクト設定確認
- [ ] ドメイン（カスタムドメイン使用時）

### 環境変数リスト
```env
# 必須
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# オプション（推奨）
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

## 📊 予想作業時間

| タスク | 予想時間 | 優先度 |
|--------|----------|---------|
| Vercel デプロイ | 30分 | 最高 |
| GitHub API 設定 | 15分 | 高 |
| Sanity Studio 修復 | 45分 | 中 |
| 実データ入力 | 60分 | 中 |
| 機能拡張 | 2-3時間 | 低 |

**合計見積もり:** 次回セッション 1-2時間で主要機能完了予想

## 🎯 成功指標

### 次回セッション終了時の目標
✅ **ライブサイト稼働中**（Vercel）  
✅ **GitHub API データ表示**（リアルタイム）  
✅ **CMS管理可能**（Sanity Studio）  
✅ **実際のプロジェクト表示**（Mock データ卒業）

### 長期目標
🚀 **プロフェッショナルポートフォリオ完成**  
📈 **高パフォーマンス＆SEO最適化**  
🎨 **美しいUX＆アクセシビリティ準拠**  
🔧 **簡単コンテンツ管理**

---

**現在の進捗: 75% 完了**  
**次回で: 90% 完了予定**  
**最終完成まで: あと2-3セッション**