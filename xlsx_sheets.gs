function importXLS(url){  
  var id = url.match(/[-\w]{25,}/)[0];
  var excel = DriveApp.getFileById(id);

  var resource = {
    title : excel.getName(),
    mimeType : MimeType.GOOGLE_SHEETS,
    parents: [{id : "1ImxMnRd8XZ7CX5gF1NY7OCf84x9y3V8j"}],
  }

  Drive.Files.insert(resource, excel.getBlob());
  // Drive.Files.remove(id); // Delete copied HHR business file once operation is comleted

  var files = DriveApp.getFolderById('1ImxMnRd8XZ7CX5gF1NY7OCf84x9y3V8j').searchFiles('title != "nothing"');
  while(files.hasNext()){
    
    var xFile = files.next();
    var name = xFile.getName();
    var find = excel.getName()
    if (find.indexOf(name) !== -1){ 
      console.log("found", name)
      var mainGsheetBFile = xFile.getId()
      return mainGsheetBFile
    }
  }

}
