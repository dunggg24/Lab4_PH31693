//import thư viện
const express = require('express');
const nodemailer = require('nodemailer');
const app = express(); // tạo đối tượng server

// tạo transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'senpai6868@gmail.com',
        pass: 'orco ggfg dckg bivi'
    }
});

// gửi mail
let mailOption = {
    from: 'senpai6868@gmail.com',
    to: 'nguyenduydung4124@gmail.com',
    subject: 'test email',
    text: 'Đây là email test'
};

// gửi email
transporter.sendMail(mailOption, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Đã gửi thành công: ' + info.messageId)
    }
});

// khởi động server
app.listen(3004, () => {
    console.log('Server đang chạy ở cổng 3000');
});
