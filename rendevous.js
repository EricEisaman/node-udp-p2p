/*
 Peer Connect
 =======================
 Notes:
  1) Google STUN Server for Dev/Testing
  2) Outside mechanism must be used to obtain peer's secret key
  3) Outside mechanism must be used to know when peer is ready to connect
*/

const stun  = require('stun')
const fetch = require('node-fetch')

var api = {
 stunPort : 19302,
 stunHost : 'stun.l.google.com',
 myPublicIP : null,
 myPublicPort : null,
 mySecretKey : 'node-rulz',
 rendevousURL : 'http://192.168.1.193:3000',
 peerIP : null,
 peerPort : null,
 peerSecretKey : null,
 start : start,
 config : cfg=>Object.assign(api,cfg)
}

// Clear console
process.stdout.write('\033c')

function start(){
  // Connect to STUN Server
  var client = stun.connect(api.stunPort, api.stunHost);

  client.request(()=>console.log('Requesting UDP packet from STUN server.'))

  client.on('response',packet=>{
    api.myPublicIP = packet.attrs['32'].address
    api.myPublicPort = packet.attrs['32'].port
    console.log('Response from STUN server: ')
    //console.log(`My Public IP: ${api.myPublicIP}`)
    console.log(`My Public IP: XXX.XXX.XXX.XXX`)
    console.log(`My Public Port: ${api.myPublicPort}`)
    rendevous()
  })
}

function rendevous(){
  console.log('Sending data to Rendevous server.')
  let url = `${api.rendevousURL}/${api.mySecretKey}/${api.myPublicIP}/${api.myPublicPort}`
  fetch(url)
    .then(function(res) {
      if (!res.ok) {
        throw Error(response.statusText);
      }
      return res.json()
    })
    .then(function(json) {
      console.log('Response from Rendevous server: ')
      console.log(json.result);
      getPeerLocation()
    })
    .catch(err=>{
      console.log('Error interacting with Rendevous server.')
      console.log(err)
    })
}

function getPeerLocation(){
  var cron = setInterval(()=>{
    console.log('Requesting peer location from Rendevous server.')
    let url = `${api.rendevousURL}/get/${api.peerSecretKey}`
    fetch(url)
      .then(function(res) {
        if (!res.ok) {
          throw Error(response.statusText);
        }
        return res.json()
      })
      .then(function(json) {
        if(json.result=="access denied"){
          console.log("failed attempt")
        }else{
          api.peerIP = json.ip
          api.peerPort = json.port
          console.log('Response from Rendevous server: ')
          //console.log(`Peer IP: ${json.result.ip}`)
          console.log(`Peer IP: XXX.XXX.XXX.XXX`)
          console.log(`Peer Port: ${json.result.port}`)
          clearInterval(cron)
        }
      })
      .catch(err=>{
        console.log('Error interacting with Rendevous server.')
        console.log(err)
        clearInterval(cron)
      })
  },2000)
}

module.exports = api
