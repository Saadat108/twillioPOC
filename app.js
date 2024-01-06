const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// const moment = require('moment');
const {sendSms, sendBulkSms, getSmsList} = require("./sms_service");
const {getDatesInRange, getChartData} = require('./util');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(express.static('./frontend'));
app.use(cors());



// ================================== END-POINTS ============================================

/*
    1. Genaral get function for testing server availability status
*/
app.get('/',async function(req, res){
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/dashboard',async function(req, res){
  res.sendFile(path.join(__dirname, 'frontend/textShaman.html'));
});

app.get('/test-api', async function(req, res){
  var responseObj={
    "data" : "api is working"
  }
  res.status(200).send(responseObj)
});


app.post("/",async function(req, res){
  console.log(req.body)
  var respondObj = {
    data : " post api is up and running and body parser working "+req.body.msg
  }
  // console.log(respondObj)
  res.status(200).send(respondObj);
});


/*
  for sending bulk sms
 */
app.post("/sms",async function(req, res){
  try{
    var toNumbers = req.body.toNumbers;
    var msgBody = req.body.msgBody;
    var result = await sendBulkSms(toNumbers, msgBody);
    // var result = "uncomment the code in previous line, code blocked for saving money during testing"
    console.log(result)
    res.status(200).send(result);
  }
  catch(error){
    console.log(error)
    res.status(500).send(error.msg)
  }
});

app.get("/sms", async function(req, res){
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const toNumber = req.query.toNumber;
  const fromNumber = req.query.fromNumber;
  const filterObject = {}
  if(startDate){
    const dateSentAfterArray = startDate.split('-');
    const dateSentAfter = new Date(Date.UTC(dateSentAfterArray[0], dateSentAfterArray[1]-1, dateSentAfterArray[2], 0, 0, 0))
    filterObject['dateSentAfter'] = dateSentAfter;
  }

  if(endDate){
    const dateSentBeforeArray = endDate.split('-');
    const dateSentBefore =  new Date(Date.UTC(dateSentBeforeArray[0], dateSentBeforeArray[1]-1, dateSentBeforeArray[2], 24, 0, 0))
    filterObject['dateSentBefore'] = dateSentBefore
  }

  if(fromNumber){
    filterObject['from'] = fromNumber;
  }

  if(toNumber){
    filterObject['to'] = toNumber;
  }


  var twilioData = await getSmsList(filterObject);

  var dateRangeAndData = await getDatesInRange(filterObject.dateSentAfter,filterObject.dateSentBefore)
  
  var chartData = await getChartData(twilioData, dateRangeAndData);
  
  var result = {twilioData, chartData}

  res.status(200).send(result)
});


// =================================== PORT-CONFIG =========================================
const ipAddress = '0.0.0.0';
const port = 8080;
app.listen(port,ipAddress,()=>{
    console.log("server started successfully at port " + port);
});