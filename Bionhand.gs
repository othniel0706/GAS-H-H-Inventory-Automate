function biionhand() {
  var spreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1sd-eNzPiIHrN5nbtaUissbxNzExXbVhd8Qv70lPTx98/edit#gid=0")
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('BIonhand'), true);

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

  var oCalday = String(year)+String(month)+String(lastDayOfMonth.getDate());
  spreadsheet.getRange('R2').setValue(oCalday);
  spreadsheet.getRange('R2').autoFill(spreadsheet.getRange('R2:R6'), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);

  var oCalmonth = String(year)+String(month)+String(lastDayOfMonth.getDate());
  spreadsheet.getRange('B2').setValue(oCalmonth);
  spreadsheet.getRange('B2').autoFill(spreadsheet.getRange('B2:B6'), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);

  spreadsheet.getRange('G2').setValue(String(year));
  spreadsheet.getRange('G2').autoFill(spreadsheet.getRange('G2:G6'), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);

// ---------------------------------------------------------------------
// Copy the on hand values from master data file and paste it as per SKU .
// ---------------------------------------------------------------------
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

  var rowNums_src = [lastCol+"3",lastCol+"4",lastCol+"5",lastCol+"6",lastCol+"7"]
  var rowNums_trg = ["V2","V3","V4","V5","V6"]
  var lstdata_values = []

  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Ha9ZcUyEEmyyk6T4NLUmsj6pfQ90HPO3e-4tUxwBpas/edit#gid=1289838104");
  var target = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1sd-eNzPiIHrN5nbtaUissbxNzExXbVhd8Qv70lPTx98/edit#gid=0")
  var source_sheet = ss.getSheetByName("BI Data Upload");
  var target_sheet = target.getSheetByName("BIonhand");
  
  for(i=0; i<5; i++){
      lstdata_values.push(source_sheet.getRange(rowNums_src[i]).getValue());
      if (String(lstdata_values[i]) == ''){
        lstdata_values[i]=0
      }
      target_sheet.getRange(rowNums_trg[i]).setValue(lstdata_values[i]);
    }

  console.log("Test-----", lstdata_values)

// ------------------------------------------
  // Change valuation class it with 0901.
// -------------------------------------------

  var valuation_data = "0901"
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('BIonhand'), true);

  spreadsheet.getRange('BT2').setValue(valuation_data);
  spreadsheet.getRange('BT2').autoFill(spreadsheet.getRange('BT2:BT6'), SpreadsheetApp.AutoFillSeries.ALTERNATE_SERIES);

  var fileName = "BIonhand";
  saveAsCSV(fileName);

}
