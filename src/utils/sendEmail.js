import nodemailer from 'nodemailer'

export async function sendEmail  (){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "halamadi75@gmail.com",
            pass: "uehk cqrb forw xjsc",
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: '"Hi there , this is Hala 👻" <halamadi75@gmail.com>', // sender address
        to: "halamadi75@gmail.com", // list of receivers
        subject: "Hello ✔",
        text: "Hello world?", 
        html: "<b>Hello world?</b>", 
    });

}