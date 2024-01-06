numberArray = []
$(document).ready(function() {
    $('#csv-input').on('change', function() {
        console.log('hello from csv/excel');
        var file = this.files[0];
    
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = e.target.result;
        
            // Convert to JSON based on file type
            if (file.type === 'text/csv') {
                const data = e.target.result;
                const lines = data.split('\n');
                const phoneNumbers = [];
                // Skip the header row
                for (let i = 1; i < lines.length; i++) {
                    const row = lines[i].split(',');
                    const phoneNumber = row[0].trim(); // Extract the first column (phone number) and trim any extra spaces
                    console.log(phoneNumber);
                    phoneNumbers.push(phoneNumber);
                }
                console.log(phoneNumbers);
                numberArray = phoneNumbers

            } else   {
                console.log('this version only takes csv files');
            }
        
            // Use the JSON data (e.g., display it, send it to a server)
            // console.log(jsonData);
        };
    
        reader.readAsText(file);
    });
});


$(document).ready(function() {
    // Get the text when a button is clicked, form is submitted, etc.
    $('#sendSms').click(function() {
      const textFieldValue = $('#myTextbox').val();
      console.log("Text field value:", textFieldValue); // Example usage
      
      // Do something with the text value, e.g., send it to a server
      sendText(phoneNumber=numberArray, msg=textFieldValue);
    });
});
  