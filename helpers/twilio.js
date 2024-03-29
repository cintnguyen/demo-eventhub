require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderNumber = process.env.MY_PHONE_NUMBER
const twilio = require('twilio')(accountSid, authToken);

const sendText = ({list, eventName, date, host, userText, photoboardURL}) => {
  list.forEach((guest)=>{
    console.log(`${process.env.BASE_URL}:${process.env.PORT}`)
    const eventDate = new Date(date)
    twilio.messages
    .create({
      from: senderNumber,
      body: `${host} is inviting you to their ${eventName}! It's on ${eventDate.toLocaleDateString()}. Find more information at photoboardURL. ${userText} `, // to do: make this sound better
      to: guest.phoneNumber //"+18572254162" 
    }).then((data)=> console.log('message sent!'))
      .catch((err) => console.log(err))
  }) 
}

module.exports = { sendText }

