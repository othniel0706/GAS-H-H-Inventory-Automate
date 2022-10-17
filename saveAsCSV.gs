function exportCsv(){

  var idfolder = "1URq9e54zrtdEzkCV0AINQ6l65gvlaFiE"
  // emptyFolder(idfolder) // Delete previous files in the Flat File Folder

  var lst_csv = ["BIintransit", "BIonhand", "FIbalances"];

  for(i=0;i<3;i++){
    saveAsCSV(lst_csv[i])
  }
}

function emptyFolder(folderId) {

    const folder = DriveApp.getFolderById(folderId);
  
    while (folder.getFiles().hasNext()) {
      const file = folder.getFiles().next();
      //file.setTrashed(true);
      // Delete File
      // Drive.Files.remove(file.getId())
  }

}

//////////////////////////

function saveAsCSV(fName) {
  var idfolder = "1URq9e54zrtdEzkCV0AINQ6l65gvlaFiE"
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1sd-eNzPiIHrN5nbtaUissbxNzExXbVhd8Qv70lPTx98/edit#gid=0"); 
  var sheet = ss.getSheetByName(fName);
  // create a folder from the name of the spreadsheet
  var folder = DriveApp.getFolderById(idfolder);  

  chkFileExits(idfolder,fName)

  // var folder = DriveApp.createFolder(ss.getName().toLowerCase().replace(/ /g,'_') + '_csv_' + new Date().getTime());
  // append ".csv" extension to the sheet name
  fileName = sheet.getName() + ".csv";
  // convert all available sheet data to csv format
  var csvFile = convertRangeToCsvFile_(fileName, sheet);
  // create a file in the Docs List with the given name and the csv data
  var file = folder.createFile(fileName, csvFile);
}

function chkFileExits(idfolder, fName){
  // Check if file exists already in folder
  var files = DriveApp.getFolderById(idfolder).searchFiles('title != "nothing"');
  while(files.hasNext()){
    
    var xFile = files.next();
    var name = xFile.getName();
    var find = fName
    if (find.indexOf(name) !== -1){ 
      console.log("found", name)
      var mainGsheetBFile = xFile.getId()
      // Drive.Files.remove(mainGsheetBFile);
    }
  }
}




