require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderNumber = process.env.MY_PHONE_NUMBER
const twilio = require('twilio')(accountSid, authToken);

const sendText = ({list, eventName, date, host}) => {
  list.forEach((guest)=>{
    const eventDate = new Date(date)
    twilio.messages
    .create({
      from: senderNumber,
      body: `${host} is inviting you to their ${eventName} event! It's on ${eventDate.toLocaleDateString()}.`, // to do: make this sound better
      to: "+18572254162" // change to guest.phoneNumber eventually
    }).then((data)=> console.log('message sent!'))
  }) 
}

module.exports = { sendText }