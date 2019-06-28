var aws = require("aws-sdk");
var nodemailer = require("nodemailer");

var ses = new aws.SES();
var s3 = new aws.S3();

exports.handler = async (event) => {
    // TODO implement
    
   // event.emailAddress = JSON.parse(event.emailAddress);


    var mailOptions = {
        from: "gmzjohn7@gmail.com",
        subject: "Resonance Products Description!",
        html: `${event.desc}`,
        to: "techpirates@resonance.nyc"
        // bcc: Any BCC address you want here in an array,
    };

    // create Nodemailer SES transporter
    var transporter = nodemailer.createTransport({
        SES: ses
    });
    
    const resp = await transporter.sendMail(mailOptions);
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(resp)
    }
    
    return resp;
};
