---
components: タイポグラフィ
---

# タイポグラフィ

<p class="description">タイポグラフィを使用して、デザインとコンテンツをできるだけ明確かつ効率的に表現します。</p>

文字サイズとスタイルが多すぎると、レイアウトが損なわれます。 [typographic scale](https://material.io/design/typography/#type-scale) は、レイアウトグリッドとともに適切に機能する限られたタイプサイズのセットがあります。

## 基本設定

*Roboto*フォントは、Material-UIによって自動的にロード**されません** 。 開発者は、アプリケーションで使用されるすべてのフォントをロードする責任があります。 Roboto Fontには、簡単に開始できる方法がいくつかあります。 より高度な設定については、[テーマのカスタマイズセクション](/customization/typography/)チェックしてください 。

## Roboto Font CDN

以下に、CDNからRobotoフォントをロードするために使用されるリンクマークアップのサンプルを示します。

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Install with npm

端末で次のコマンドを入力すると、[インストール](https://www.npmjs.com/package/typeface-roboto)できます。

`npm install typeface-roboto --save`

その後、エントリポイントにインポートできます。

```js
import 'typeface-roboto';
```

詳細については、 [typeface](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto) プロジェクトをご覧ください。

⚠️このアプローチを使用する場合は注意してください。 バンドラーがすべてのフォントバリエーション（100/300/400/500/700/900、イタリック/レギュラー、SVG / woff）を積極的に読み込まないようにしてください。 すべてのフォントファイルをインライン化すると、バンドルのサイズが大幅に増加する可能性があります。 Material-UIのデフォルトのタイポグラフィ構成は、300、400、500、および700のフォントウェイトのみに依存しています。

## Component

{{"demo": "pages/components/typography/Types.js"}}

## テーマ

状況によっては、 `Typography` コンポーネントを使用できない場合があります。 このテーマのe [`typography`](/customization/default-theme/?expend-path=$.typography)キーを活用できることを願っています。

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## セマンティック要素の変更

Typographyコンポーネントは、 `variantMapping` プロパティを使用して、UIバリアントをセマンティック要素に関連付けます。 It’s important to realize that the style of a typography is independent from the semantic underlying element.

- You can change the underlying element for a one time occasion with the `component` property:

```jsx
{/* There is already an h1 in the page, let's not duplicate it. */}
<Typography variant="h1" component="h2">
  h1. Heading
</Typography>
```

- 以下のようにテーマ使用して、[マッピング をグローバルに](/customization/globals/#default-props)変更できます。

```js
const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});
```