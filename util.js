async function getDatesInRange(startDate, endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const dates = [];
    const deliveredCountPerDateArray = [];
    const sentCountPerDateArray = [];
    const undeliveredCountPerDateArray = [];
    if (startDateObj <= endDateObj) {
        let currentDate = startDateObj;
        while (currentDate <= endDateObj) {
            dates.push(currentDate.toISOString().split('T')[0]);
            deliveredCountPerDateArray.push(0);
            sentCountPerDateArray.push(0);
            undeliveredCountPerDateArray.push(0);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    var dateAndData = {
        dates,
        deliveredCountPerDateArray,
        sentCountPerDateArray,
        undeliveredCountPerDateArray
    }

    return dateAndData;
}

async function getChartData(twilioData, dateRangeAndData){

    var totalDelivered = 0;
    var totalSent = 0;
    var totalUndelivered=0;

    for (let i = 0; i < twilioData.length; i++) {
        const data = twilioData[i];
        
        console.log(data.dateSent.toString())
        // var date = data.dateSent.toString().split('T')[0];
        var dateObj = new Date(data.dateSent);
        
        var year = dateObj.getFullYear();
       
        var month =  String(dateObj.getMonth() + 1).padStart(2, '0'); 

        var day = String(dateObj.getDate()).padStart(2, '0');

        var date = year+"-"+month+"-"+day


        var status = data.status;
        var indexOfDateInDateRangeArray = dateRangeAndData.dates.indexOf(date);
        if(status==='delivered'){
            dateRangeAndData.dadeliveredCountPerDateArray[indexOfDateInDateRangeArray]++;
            totalDelivered++;
        }
        if(status==='undelivered'){
            dateRangeAndData.undeliveredCountPerDateArray[indexOfDateInDateRangeArray]++;
            totalUndelivered++;
        }
        if(status==="sent"){
            dateRangeAndData.sentCountPerDateArray[indexOfDateInDateRangeArray]++;
            totalSent++;
        }
    }

    dateRangeAndData['totalSent'] = totalSent
    dateRangeAndData['totalDelivered'] = totalDelivered
    dateRangeAndData['totalUndelivered'] = totalUndelivered

    console.log(dateRangeAndData)
    return dateRangeAndData;
}






module.exports={
    getDatesInRange,
    getChartData
}