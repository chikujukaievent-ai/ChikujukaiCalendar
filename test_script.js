// index.js（GAS想定 / テスト用エントリポイント）
// TODO: 動作確認後は削除またはリネームを検討

/**
 * 動作確認用メイン関数
 */
function testMain() {
    logger.info('テスト処理開始');

    const rows = [
        createLogRow('INFO', 'テストメッセージ'),
        createLogRow('WARN', '注意メッセージ')
    ];

    appendRows(CONFIG.LOG_SHEET_NAME, rows);

    logger.info('テスト処理終了');
}
