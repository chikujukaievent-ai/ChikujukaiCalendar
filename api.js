/**
 * カレンダーデータ取得API
 * @returns {Object} カレンダーデータと設定情報のオブジェクト
 */
function getCalendarData() {
  logger.info('getCalendarData invoked');
  try {
    const calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
    if (!calendar) {
      logger.error('Calendar not found: ' + CONFIG.CALENDAR_ID);
      throw new Error("カレンダーが見つかりません");
    }

    const now = new Date();
    const endDate = new Date();
    endDate.setMonth(now.getMonth() + CONFIG.CALENDAR_MONTHS_AHEAD);

    const events = calendar.getEvents(now, endDate);
    let schedule = {};

    events.forEach(event => {
      const dateKey = Utilities.formatDate(
        event.getStartTime(),
        CONFIG.TIMEZONE,
        CONFIG.DATE_FORMAT
      );

      // 時間のフォーマット (例 10:00) ※終日の場合は「終日」
      let timeStr = "";
      if (event.isAllDayEvent()) {
        timeStr = CONFIG.ALL_DAY_TEXT;
      } else {
        timeStr = Utilities.formatDate(
          event.getStartTime(),
          CONFIG.TIMEZONE,
          CONFIG.TIME_FORMAT
        );
      }

      // 場所の取得
      const location = event.getLocation();

      if (!schedule[dateKey]) schedule[dateKey] = [];

      schedule[dateKey].push({
        time: timeStr,
        title: event.getTitle(),
        location: location ? `${CONFIG.LOCATION_PIN_MARKER}${location}` : "" // 場所があればピンマークを付ける
      });
    });

    logger.info(`Retrieved ${events.length} events`);

    return {
      schedule,
      today: Utilities.formatDate(now, CONFIG.TIMEZONE, CONFIG.DATE_FORMAT),
      config: {
        calendarId: CONFIG.CALENDAR_ID,
        timezone: CONFIG.TIMEZONE,
        events: CONFIG.EVENTS
      }
    };
  } catch (e) {
    logger.error('Error in getCalendarData: ' + e.message);
    throw e;
  }
}

/**
 * カレンダーに予定を作成するAPI
 * @param {string} dateStr - 日付（YYYY-MM-DD形式）
 * @param {string} eventType - 予定タイプ（'KAWAHIGASHI' or 'NAGAZUMI'）
 * @returns {Object} 作成結果
 */
function createEvent(dateStr, eventType) {
  logger.info(`createEvent invoked: date=${dateStr}, type=${eventType}`);
  try {
    const calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
    if (!calendar) {
      logger.error('Calendar not found: ' + CONFIG.CALENDAR_ID);
      return { success: false, error: "カレンダーにアクセスできません" };
    }

    const eventConfig = CONFIG.EVENTS[eventType];
    if (!eventConfig) {
      logger.warn('Invalid event type: ' + eventType);
      return { success: false, error: "不正な予定タイプです" };
    }

    // 日付と時刻を組み合わせてDateオブジェクトを作成
    const [year, month, day] = dateStr.split("-").map(Number);
    const [startH, startM] = eventConfig.startTime.split(":").map(Number);
    const [endH, endM] = eventConfig.endTime.split(":").map(Number);

    const startTime = new Date(year, month - 1, day, startH, startM);
    const endTime = new Date(year, month - 1, day, endH, endM);

    // 予定を作成
    const event = calendar.createEvent(
      eventConfig.title,
      startTime,
      endTime,
      { location: eventConfig.location }
    );

    logger.info(`Created event: ${eventConfig.title} at ${dateStr}`);

    // ログシートに記録
    const logRow = createLogRow('INFO', `予約作成: ${eventConfig.title} (${dateStr})`);
    appendRows(CONFIG.LOG_SHEET_NAME, [logRow]);

    return {
      success: true,
      eventId: event.getId(),
      title: eventConfig.title,
      date: dateStr
    };
  } catch (e) {
    logger.error('Error in createEvent: ' + e.message);
    return { success: false, error: e.message };
  }
}
