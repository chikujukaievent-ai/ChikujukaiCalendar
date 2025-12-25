/**
 * 定数定義
 */

// カレンダー設定
const CONFIG = {
  // カレンダー取得期間（月数）
  CALENDAR_MONTHS_AHEAD: 2,
  
  // タイムゾーン
  TIMEZONE: "Asia/Tokyo",

  // 参照・作成対象のカレンダーID
  CALENDAR_ID: "chikujukai.event@gmail.com",

  // デフォルト予定時間（24h表記, JST）
  DEFAULT_START_TIME: "09:30",
  DEFAULT_END_TIME: "11:30",
  
  // デフォルト予定タイトル
  DEFAULT_EVENT_TITLE: "稽古日",
  
  // デフォルト予定場所
  DEFAULT_LOCATION: "川東コミュニティセンター",
  
  // 日付フォーマット
  DATE_FORMAT: "yyyy-MM-dd",
  TIME_FORMAT: "HH:mm",
  
  // 表示テキスト
  ALL_DAY_TEXT: "終日",
  APP_TITLE: "稽古日カレンダー",
  
  // 場所表示の設定
  LOCATION_PIN_MARKER: "📍"
};
