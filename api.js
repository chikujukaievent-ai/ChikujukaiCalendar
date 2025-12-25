/**
 * カレンダーデータ取得API
 */

function getCalendarData() {
  const calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
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

  return { 
    schedule, 
    today: Utilities.formatDate(now, CONFIG.TIMEZONE, CONFIG.DATE_FORMAT),
    config: {
      calendarId: CONFIG.CALENDAR_ID,
      timezone: CONFIG.TIMEZONE,
      defaultStartTime: CONFIG.DEFAULT_START_TIME,
      defaultEndTime: CONFIG.DEFAULT_END_TIME,
      defaultEventTitle: CONFIG.DEFAULT_EVENT_TITLE,
      defaultLocation: CONFIG.DEFAULT_LOCATION
    }
  };
}
