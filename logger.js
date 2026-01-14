/**
 * ログ1行分
 * @typedef {Object} LogRow
 * @property {Date}   time
 * @property {string} level
 * @property {string} message
 */

/**
 * ロガー生成
 * @param {Object} config
 * @param {boolean} config.DEBUG デバッグ出力有無
 * @returns {{
 *   info: (msg: string) => void,
 *   warn: (msg: string) => void,
 *   error: (msg: string) => void
 * }}
 */
function createLogger(config) {
    /**
     * @param {string} level
     * @param {string} msg
     */
    function write(level, msg) {
        if (config.DEBUG) {
            console.log(`[${level}] ${msg}`);
        }
    }

    return {
        info: (msg) => write('INFO', msg),
        warn: (msg) => write('WARN', msg),
        error: (msg) => write('ERROR', msg)
    };
}

/**
 * ログ行を生成
 * @param {'INFO'|'WARN'|'ERROR'} level
 * @param {string} message
 * @returns {LogRow}
 */
function createLogRow(level, message) {
    return {
        time: new Date(),
        level,
        message
    };
}

/**
 * シートに行を追加
 * @param {string} sheetName
 * @param {LogRow[]} rows
 */
function appendRows(sheetName, rows) {
    let ss = SpreadsheetApp.getActive();

    if (!ss && CONFIG.LOG_SPREADSHEET_ID) {
        try {
            ss = SpreadsheetApp.openById(CONFIG.LOG_SPREADSHEET_ID);
        } catch (e) {
            console.error('スプレッドシートを開けませんでした: ' + e.message);
        }
    }

    if (!ss) {
        console.warn('スプレッドシートが見つからないか紐付いていないため、シートへのログ出力はスキップされました。');
        return;
    }

    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
        // シートがない場合はエラーにせず、ログ出力のみ留める（無限ループ回避）
        console.warn(`シートが存在しません: ${sheetName}`);
        return;
    }

    const values = rows.map(r => [r.time, r.level, r.message]);
    sheet.getRange(
        sheet.getLastRow() + 1,
        1,
        values.length,
        values[0].length
    ).setValues(values);
}

// グローバルなロガー初期化（CONFIGが読み込まれている前提）
const logger = createLogger(CONFIG);
