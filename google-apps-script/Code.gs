// Google Apps Script for the Halloween RSVP sheet.
// Paste this into Extensions > Apps Script of your Google Sheet,
// run setup() once, then deploy as Web App (see README).

var RESPONSES = 'Responses';
var SUMMARY = 'Summary';
var HEADERS = [
  'timestamp', 'adult_name',
  'kids_0_5', 'kids_6_10', 'kids_11_17', 'kids_total',
  'hamburgers_meat', 'hamburgers_veggie', 'alcohol_drinkers',
  'user_agent'
];

// Run this once from the editor. Safe to re-run: it rewrites headers and Summary,
// and keeps existing response rows.
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var responses = ss.getSheetByName(RESPONSES) || ss.insertSheet(RESPONSES);
  responses.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
  responses.setFrozenRows(1);

  var summary = ss.getSheetByName(SUMMARY) || ss.insertSheet(SUMMARY);
  summary.clear();
  var rows = [
    ['סיכום', ''],
    ['משפחות', '=COUNTA(Responses!B2:B)'],
    ['', ''],
    ['ילדים 0-5', '=SUM(Responses!C2:C)'],
    ['ילדים 6-10', '=SUM(Responses!D2:D)'],
    ['ילדים 11-17', '=SUM(Responses!E2:E)'],
    ['סה"כ ילדים (= שקיות ממתקים)', '=SUM(Responses!F2:F)'],
    ['', ''],
    ['מנות המבורגר (2 קציצות)', '=SUM(Responses!G2:G)'],
    ['המבורגר צמחוני', '=SUM(Responses!H2:H)'],
    ['מבוגרים שזקוקים לאלכוהול', '=SUM(Responses!I2:I)']
  ];
  summary.getRange(1, 1, rows.length, 2).setValues(rows);
  summary.getRange(1, 1).setFontWeight('bold');
  summary.setColumnWidth(1, 240);

  // Remove the old helper sheet if it exists from a previous version.
  var old = ss.getSheetByName('KidsAges');
  if (old) ss.deleteSheet(old);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(RESPONSES);
    if (!sheet) {
      setup();
      sheet = ss.getSheetByName(RESPONSES);
    }
    var row = HEADERS.map(function (h) {
      var v = data[h];
      return v === undefined || v === null ? '' : v;
    });
    sheet.appendRow(row);
    return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err).setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}
