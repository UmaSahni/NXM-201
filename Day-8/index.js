//! What all we need to send email ?

/**
 * suject,
 * To,
 * from, 
 * body/content
 */

const nodemailer = require("nodemailer")

/**
 * Transpoter - Something where we send
 * All the configurations goes inside this.
 * https://ethereal.email/
 */
const transporter = nodemailer.createTransport({
 host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'amie.daugherty66@ethereal.email',
        pass: '6q3xhz68xMHrB2yJex'
    }
})

transporter.sendMail({
    to:"amie.daugherty66@ethereal.email",
    from : "umasahni@gmail.com",
    subject : "1st email from nodejs.",
    text : "Hey it's my first node.js email from our first mail using a fake smtp mail service",
    html:"<h2>Template html</h2>"
})

.then(()=>{
    console.log("Mail sent successfully")
})
.catch((err)=>{
    console.log("error", err)
})