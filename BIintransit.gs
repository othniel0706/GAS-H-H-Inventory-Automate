function biintransit() {
  var spreadsheet_BIinTransit = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1sd-eNzPiIHrN5nbtaUissbxNzExXbVhd8Qv70lPTx98/edit#gid=0"); 
  spreadsheet_BIinTransit.setActiveSheet(spreadsheet_BIinTransit.getSheetByName('BIintransit'), true);

  console.log(spreadsheet_BIinTransit.getActiveSheet().getName());

  var day = new Date();
  var lastDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 0);
  var month
  var year = day.getFullYear()

  if(String(day.getMonth()).length == 1){ // This block ensures that date is not undefined when month becomes 2 digit from 1 digit
    month = "0"+String(day.getMonth());
  }
  else {
    month = String(day.getMonth());
  }
  if(month == "00"){ // This block ensures that the month and year is not 00 after new year 
    year = day.getFullYear() - 1
    month = 12
  }

  var oCalday = String(year) + String(month) + String(lastDayOfMonth.getDate());
  spreadsheet_BIinTransit.getRange("D2").setValue(oCalday);
  spreadsheet_BIinTransit.getRange('D2').autoFill(spreadsheet_BIinTransit.getRange('D2:D6'), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);

  var oCalmonth = String(month)+"."+String(year);
  spreadsheet_BIinTransit.getRange('E2').setValue(oCalmonth);
  spreadsheet_BIinTransit.getRange('E2').autoFill(spreadsheet_BIinTransit.getRange('E2:E6'), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);

  // ---------------------------------------------------------------------
  // converting last column number into letter for easy identification
  // ------------------------------------------------------------------------ 
  
  var spreadsheet_BI_Data_Upload = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Ha9ZcUyEEmyyk6T4NLUmsj6pfQ90HPO3e-4tUxwBpas/edit#gid=1289838104");
  var sheet_cp = spreadsheet_BI_Data_Upload.setActiveSheet(spreadsheet_BI_Data_Upload.getSheetByName('BI Data Upload'), true);
  var lastCol =  String(sheet_cp.getLastColumn());

  // Column index to column letter
  function columnToLetter(column)
  {
    var temp, letter = '';
    while (column > 0)
    {
      temp = (column - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      column = (column - temp - 1) / 26;
    }
    return letter;
  }

  lastCol = columnToLetter(lastCol);

// ------------------------------------------------------------------
// Copy pasting values from "BI data Upload" to "BIinTransit"
// -----------------------------------------------------------------

  var rowNums_src = [lastCol+"9",lastCol+"10",lastCol+"11"]
  var rowNums_trg = ["F2","F3","F5"]
  var lstdata_values = []

  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Ha9ZcUyEEmyyk6T4NLUmsj6pfQ90HPO3e-4tUxwBpas/edit#gid=1289838104");
  var target = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1sd-eNzPiIHrN5nbtaUissbxNzExXbVhd8Qv70lPTx98/edit#gid=0");
  var source_sheet = ss.getSheetByName("BI Data Upload");
  var target_sheet = target.getSheetByName("BIintransit");

  for(i=0; i<3; i++){
    lstdata_values.push(source_sheet.getRange(rowNums_src[i]).getValue());
    if (String(lstdata_values[i]) == ''){
      lstdata_values[i]=0
    }
    target_sheet.getRange(rowNums_trg[i]).setValue(lstdata_values[i]);
  }

  console.log(lstdata_values)

// ----------------------------
  // Exporting function
// ------------------------------

  var fileName = "BIintransit";
  saveAsCSV(fileName);

};












