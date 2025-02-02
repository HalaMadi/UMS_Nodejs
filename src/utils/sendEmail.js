import nodemailer from 'nodemailer'

export async function sendEmail  (to,subject,html){
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
        to, // list of receivers
        subject,
        text: "Hello world?", 
        html, 
    });

}