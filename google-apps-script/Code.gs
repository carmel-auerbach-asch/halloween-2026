// Google Apps Script for the Halloween RSVP sheet.
// Paste this into Extensions > Apps Script of a new Google Sheet,
// run setup() once, then deploy as Web App (see README).

var RESPONSES = 'Responses';
var SUMMARY = 'Summary';
var HEADERS = [
  'timestamp', 'adult_name', 'phone', 'kids_ages', 'kids_count',
  'hamburgers_meat', 'hamburgers_veggie', 'candy_bags', 'alcohol_drinkers', 'user_agent'
];

// Run this once from the editor to create both sheets with headers and formulas.
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var responses = ss.getSheetByName(RESPONSES) || ss.insertSheet(RESPONSES);
  if (responses.getLastRow() === 0) {
    responses.appendRow(HEADERS);
    responses.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    responses.setFrozenRows(1);
  }

  var summary = ss.getSheetByName(SUMMARY) || ss.insertSheet(SUMMARY);
  summary.clear();
  var rows = [
    ['סיכום', ''],
    ['משפחות', '=COUNTA(Responses!B2:B)'],
    ['ילדים', '=SUM(Responses!E2:E)'],
    ['המבורגר בשר', '=SUM(Responses!F2:F)'],
    ['המבורגר צמחוני', '=SUM(Responses!G2:G)'],
    ['שקיות ממתקים', '=SUM(Responses!H2:H)'],
    ['שותי אלכוהול', '=SUM(Responses!I2:I)'],
    ['', ''],
    ['ילדים לפי גיל', ''],
    ['0-5',   '=COUNTIFS(KidsAges!A:A,">=0", KidsAges!A:A,"<=5")'],
    ['6-9',   '=COUNTIFS(KidsAges!A:A,">=6", KidsAges!A:A,"<=9")'],
    ['10-13', '=COUNTIFS(KidsAges!A:A,">=10",KidsAges!A:A,"<=13")'],
    ['14-18', '=COUNTIFS(KidsAges!A:A,">=14",KidsAges!A:A,"<=18")']
  ];
  summary.getRange(1, 1, rows.length, 2).setValues(rows);
  summary.getRange(1, 1).setFontWeight('bold');
  summary.getRange(9, 1).setFontWeight('bold');
  summary.setColumnWidth(1, 180);

  // Helper sheet: one age per row, flattened from the comma-separated kids_ages column.
  var kids = ss.getSheetByName('KidsAges') || ss.insertSheet('KidsAges');
  kids.clear();
  kids.getRange('A1').setFormula(
    '=IFERROR(ARRAYFORMULA(VALUE(TRIM(FLATTEN(SPLIT(FILTER(Responses!D2:D, Responses!D2:D<>""), ","))))), "")'
  );
  kids.hideSheet();
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

// Lets you open the web app URL in a browser to confirm it is deployed.
function doGet() {
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}
