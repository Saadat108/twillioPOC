function getMessages(startDate="", endDate="", to="", from="", deliveryStatus="", byMsgId="", limit="", smsId=""){
    // this function is to get messages, but default all the params have empty strings

    console.log(startDate, endDate, to, from, deliveryStatus, byMsgId, limit, smsId)

    const callUrl = "http://localhost:8080/sms?startDate=2024-01-01&endDate=2024-01-06&fromNumber=&toNumber=+16788706116"

    $.ajax({
        url: callUrl, // Replace with the actual server URL
        type: "GET",
        data: {
          startDate: startDate,  
          endDate: endDate,
          to: to,
          from: from,
          deliveryStatus: deliveryStatus,
          byMsgId: byMsgId,
          limit: limit,
          smsId: smsId
        },
        success: function(response) {
          // Handle the successful response here
          console.log(response); // Log the response for debugging
          // You can process and display the response data as needed
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // Handle any errors that occur
          console.error("AJAX error:", textStatus, errorThrown);
          alert("An error occurred while fetching data. Please try again later.");
        }
      });


}

function sendText(phoneNumbers=[], msg=""){
    console.log('inside sendText func');
    $.ajax({
        url: 'http://localhost:8080/sms', // Replace with the actual URL of your server endpoint
        type: 'POST',
        data: {
          toNumbers: phoneNumbers,
          msgBody: msg
        },
        success: function(response) {
          // Handle successful response here
          console.log(response.data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // Handle error here
          console.error('AJAX error:', textStatus, errorThrown);
        }
      });
}
 

// module.exports = {getMessages}