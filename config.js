/**
 * 定数定義
 * @typedef {Object} Config
 * @property {number} CALENDAR_MONTHS_AHEAD カレンダー取得期間（月数）
 * @property {string} TIMEZONE タイムゾーン
 * @property {string} CALENDAR_ID 参照・作成対象のカレンダーID
 * @property {Object} EVENTS 予定タイプ設定
 * @property {string} DATE_FORMAT 日付フォーマット
 * @property {string} TIME_FORMAT 時刻フォーマット
 * @property {string} ALL_DAY_TEXT 終日表示テキスト
 * @property {string} APP_TITLE アプリタイトル
 * @property {string} LOCATION_PIN_MARKER 場所表示のピンマーク
 * @property {boolean} DEBUG デバッグ出力有無
 * @property {string} LOG_SPREADSHEET_ID ログ出力先スプレッドシートID
 * @property {string} LOG_SHEET_NAME ログ出力先シート名
 */

/** @type {Config} */
const CONFIG = {
  // カレンダー取得期間（月数）
  CALENDAR_MONTHS_AHEAD: 4,

  // タイムゾーン
  TIMEZONE: "Asia/Tokyo",

  // 参照・作成対象のカレンダーID
  CALENDAR_ID: "chikujukai.event@gmail.com",

  // 予定タイプ設定
  EVENTS: {
    // 川東の予定
    KAWAHIGASHI: {
      label: "川東",
      title: "川東_稽古日",
      location: "川東コミュニティセンター",
      startTime: "09:30",
      endTime: "11:30"
    },
    // 長炭の予定
    NAGAZUMI: {
      label: "長炭",
      title: "長炭_稽古日",
      location: "長炭公民館",
      startTime: "13:30",
      endTime: "15:30"
    }
  },

  // 日付フォーマット
  DATE_FORMAT: "yyyy-MM-dd",
  TIME_FORMAT: "HH:mm",

  // 表示テキスト
  ALL_DAY_TEXT: "終日",
  APP_TITLE: "稽古日カレンダー",

  // 場所表示の設定
  LOCATION_PIN_MARKER: "📍",

  // デバッグ・ログ設定
  DEBUG: true,
  LOG_SPREADSHEET_ID: "1-9yQA1PYeBua23qJDqVDg1uHFGXOra_8KQTdrEgS-pw",
  LOG_SHEET_NAME: "Status"
};
