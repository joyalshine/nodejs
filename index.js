const http = require('http');
const PORT = 3000;

const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(cors());


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'vithostelapp@gmail.com',
    pass: 'tdqeazftlgfuxyyj'
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.get('/', async (req, res) => {
  res.send("Request Sucessful")
})


app.post('/verify/:email/:name', async (req, res) => {
  let email = req.params.email
  var otp = Math.floor(1000 + Math.random() * 9000);
  try{
    const info = await transporter.sendMail({
      from: '"VIT Hostel Department" <vithostelapp@gmail.com>', // sender address
      to: email, 
      subject: "Email Verification",
      html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">VIT Hostel Department</a>
          </div>
          <p style="font-size:1.1em">Hi, ${req.params.name}</p>
          <p>This is a auto generated Email. Use the following OTP to verify your Email. OTP is valid for 5 minutes. If you didn't request this, you can ignore this email or let us know.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />VIT Hostel Department</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          </div>
        </div>
      </div>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    res.send({status : true, otp: otp})
  }
  catch(err){
    res.send({status : false, error:err})
  }
})

app.get('/cronjob', async (req, res) => {
  res.send("Request Sucessful")
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
