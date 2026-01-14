/**
 * メインエントリーポイント
 */

function doGet(e) {
  logger.info('doGet invoked');

  // パラメータが含まれていても無視してHTMLを返す設定
  var output = HtmlService.createTemplateFromFile('index').evaluate();

  return output
    .setTitle(CONFIG.APP_TITLE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // LINE内表示を許可
}
