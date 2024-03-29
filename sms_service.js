const accountSid = 'AC8de682d6be137b53ad0a1fef76a02d3e';
const authToken = 'ae65b8664e60259e4dac07e2d1506330'
const client = require('twilio')(accountSid, authToken);
const fromNumber = '+12059645723';
//done
async function sendSms(toNumber, msgBody){
  try {
    const smsDetail = await client.messages.create({
      body: msgBody,
      to: toNumber,
      from: fromNumber,
    });
    return smsDetail;
  } 
  catch (error) {
    return error 
  }
}
//done
async function sendBulkSms(toNumbers, msgBody){
  var result = []
  try{
    for (const toNumber of toNumbers) {
      var responseForNumber = await sendSms(toNumber,msgBody)
      result.push(responseForNumber);
    }
    return result;
  }
  catch(error){
    return error.messages;
  }
  

  
}
//testing
async function getSmsList(filterObject){
  try{
    let smsList =  await client.messages.list(filterObject);
    return smsList;
  }
  catch(error){
    return error.messages;
  }
}

module.exports={
  sendSms,
  sendBulkSms,
  getSmsList
}







