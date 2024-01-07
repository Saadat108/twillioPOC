async function getMessages(startDate="", endDate="", to="", from="", deliveryStatus="", byMsgId="", limit="", smsId=""){
    // this function is to get messages, but default all the params have empty strings

    console.log('inside AJAX',startDate, endDate, to, from)
    const callUrl = "http://localhost:8080/sms"
    // var data = {startDate:startDate, end};
    var res = $.ajax({
        url: callUrl, // Replace with the actual server URL
        type: "GET",
        data: {
          startDate: startDate,  
          endDate: endDate,
          to: to,
          from: from,
          // deliveryStatus: deliveryStatus,
          // byMsgId: byMsgId,
          // limit: limit,
          // smsId: smsId
        },
        success: function(response) {
          // Handle the successful response here
          // console.log('ajax data: ', data);
          console.log(response); // Log the response for debugging
          // return response;
          const labels = response.chartData.dates
          const dataPass = response.chartData.deliveredCountPerDateArray;
          const dataFail = response.chartData.undeliveredCountPerDateArray;
          const dataGoing = response.chartData.sentCountPerDateArray;
          console.log(labels, dataPass, dataFail, dataGoing)
          generateChart(labels, dataPass, dataFail, dataGoing)
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