function fibalances() {
  var spreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1sd-eNzPiIHrN5nbtaUissbxNzExXbVhd8Qv70lPTx98/edit#gid=0")
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('FIbalances'), true);

// -----------------------------------------------------
// Change the 0FISCPER with last month
// -------------------------------------------------------

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

  var oCalmonth = month+String(year);
  spreadsheet.getRange("F2").setValue(oCalmonth);
  spreadsheet.getRange("F2").autoFill(spreadsheet.getRange('F2:F14'), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);

// -----------------------------------------------
// copy GL values
// ----------------------------------------------

  var spreadsheet_FI_data = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Ha9ZcUyEEmyyk6T4NLUmsj6pfQ90HPO3e-4tUxwBpas/edit#gid=1289838104");
  spreadsheet_FI_data.setActiveSheet(spreadsheet_FI_data.getSheetByName('FI data'), true);
  
  var lastCol =  String(spreadsheet_FI_data.getLastColumn());

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

  var lastCol_letter = columnToLetter(lastCol);  
  var lst_data1 = []

  for(i=0;i<13;i++){
    lst_data1.push(spreadsheet_FI_data.getRange(lastCol_letter+(3+i)).getValue())
  }

  console.log(lst_data1)

  function paste_master_fi(){

      for(i=0;i<13;i++){
        spreadsheet.getRange("L"+(2+i)).setValue(lst_data1[i])
      }
  }

  paste_master_fi()

  var fileName = "FIbalances";
  saveAsCSV(fileName);

}
