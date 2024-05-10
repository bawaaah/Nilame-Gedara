const express = require('express')
const router = express.Router()
const order = require('../models/order')
const {v4 : uuidv4} = require('uuid')
const nodemailer = require('nodemailer')



let mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bhawanrandunu@gmail.com',
        pass: 'eoewdtrvqxebtzdo'
    }
})


router.route('/sendOrderMail').post((req,res)=>{
    const { to, id , pname, total } = req.body
    text =  `Dear Customer, Your ${pname} (OrderID: ${id}) order is placed.\nPlease pay your payment...\nTotal: RS:${total}`
    const emailMessage = () => {
        return `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        color: #333;
                    }
                    .content {
                        padding: 20px;
                        background-color: #f4f4f4;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        text-align: center;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="content">
                    <h1>Order Confirmation</h1>
                    <p>Dear Customer,</p>
                    <p>Thank you for your order. Your order details are as follows:</p>
                    <ul>
                        <li><strong>Product Name:</strong>${pname}</li>
                        <li><strong>Product ID:</strong>${id}</li>
                        <li><strong>Total Amount:</strong>${total}</li>
                    </ul>
                    <p>Please make the payment at your earliest convenience to confirm your order.</p>
                    <p>We appreciate your promptness in this matter and look forward to serving you.</p>
                </div>
                <div class="footer">
                    <p>Thank you for shopping with us!</p>
                </div>
            </body>
        </html>
        `;
    };
    
    
    const mailOptions = {
        from: 'bhawanrandunu@gmail.com',
        to: to,
        subject: "Nilame Gedara",
        text: text,
        html: emailMessage()
    }

    mailer.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email')
        } else {
            console.log('Email sent: ' + info.response)
            res.status(200).send('Email sent')
        }
    })
})

router.route('/updateOrderMail').post((req,res)=>{
    const { to, id , pname, total } = req.body
    text =  `Dear Customer, Your ${pname} (OrderID: ${id}) order is placed.\nPlease pay your payment...\nTotal: RS:${total}`
    const emailMessage = () => {
        return `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        color: #333;
                    }
                    .content {
                        padding: 20px;
                        background-color: #f4f4f4;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        text-align: center;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="content">
                    <h1>Order Confirmation</h1>
                    <p>Dear Customer,</p>
                    <p>Thank you for your order. Your order <b>UPDATED</b> details are as follows:</p>
                    <ul>
                        <li><strong>Product Name:</strong>${pname}</li>
                        <li><strong>Product ID:</strong>${id}</li>
                        <li><strong>Total Amount:</strong>${total}</li>
                    </ul>
                    <p>Please make the payment at your earliest convenience to confirm your order.</p>
                    <p>We appreciate your promptness in this matter and look forward to serving you.</p>
                </div>
                <div class="footer">
                    <p>Thank you for shopping with us!</p>
                </div>
            </body>
        </html>
        `;
    };
    
    
    const mailOptions = {
        from: 'bhawanrandunu@gmail.com',
        to: to,
        subject: "Nilame Gedara",
        text: text,
        html: emailMessage()
    }

    mailer.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email')
        } else {
            console.log('Email sent: ' + info.response)
            res.status(200).send('Email sent')
        }
    })
})


router.route('/add').post((req,res) => {
    const orderId = uuidv4()
    const productName = req.body.productName
    const count = Number(req.body.count)
    const unitPrice = Number(req.body.unitPrice)
    const date = (req.body.date)
    const total = (count)*unitPrice
    const iID = req.body.iID
    const email = req.body.email
    const phone = Number(req.body.phone)

    const newOrder = new order({
        orderId,
        productName,
        count,
        unitPrice,
        date,
        total,
        iID,
        email,
        phone
    })

    newOrder.save()
    .then(()=>{
        res.json("Order added ");
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json("Error: Order not added ");
    })
})

module.exports = router