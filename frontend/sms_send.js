$(document).ready(function() {
    $("#import-button").click(function() {
      // Trigger file selection
      $("#file-input").click();
    });
  
    $("#file-input").change(function() {
      var file = this.files[0];
      var reader = new FileReader();
  
      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, { type: 'binary' });
        var sheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[sheetName];
        var tableData = XLSX.utils.sheet_to_json(worksheet);
  
        // Create the datatable
        $("#datatable").DataTable({
          data: tableData,
          columns: [
            { title: "Data" } // Adjust column title as needed
          ]
        });
      };
  
      reader.readAsBinaryString(file);
    });
  });