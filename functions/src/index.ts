const admin = require("firebase-admin");
const express = require("express");
// const cors = require("cors")({ origin: ['http://localhost:3000','https://williamharry.com'] });
const cors = require("cors")({ origin: true });
const Razorpay = require("razorpay");
import type { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
const { onRequest } = require("firebase-functions/v2/https");

admin.initializeApp();
const router = express();
router.use(cors);

// Add your razorpay key and secret
const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

router.post("/checkIfAdmin", (req: Request, res: Response) => {
  res.send(req.body.adminPassword == process.env.ADMIN_PASSWORD ? true : false);
});

router.post("/sendEmail", async (req: Request, res: Response) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  try {
    await transporter.sendMail({
      from: "William And Harry", // sender address
      to: "simarbagga401@gmail.com, henryjboby@gmail.com", // list of receivers
      subject: "New Order From William and Harry", // Subject line
      html: `<b>New Order</b>
      <p>Customer Name: ${req.body.name}</p>
      <p>Customer Email: ${req.body.email}</p>
      <p>Customer Phone: ${req.body.mobileNo}</p>
      <p>Customer Address: ${req.body.address}</p>
      <p>Customer State: ${req.body.state}</p>
      <p>Customer District: ${req.body.district}</p>
      <p>Customer Town: ${req.body.town}</p>
      <p>Customer Address: ${req.body.address}</p>
      <p>Customer Pincode: ${req.body.pincode}</p>
      <p>Customer UserId: ${req.body.userId}</p>
      <p>OrderID: ${req.body.orderId}</p>
      <p>Amount:<b>${req.body.amount}</b></p>
      products: ${req.body.products.map((product: any) => {
        return `<p>${product.name} - ${product.quantity} - ${product.price} - ${product.coatSize} - ${product.pantSize} - ${product.piece}</p>`;
      })}
    `,
    });
    res.send("Email Sent");
  } catch (e) {
    res.send(e);
  }
});

router.post(
  "/createPayment",
  (req: Request, res: Response, next: NextFunction) => {
    return admin
      .firestore()
      .collection("payments")
      .add(req.body)
      .then((payment: { id: string }) => {
        var instance = new Razorpay({
          key_id: KEY_ID,
          key_secret: KEY_SECRET,
        });

        var options = {
          amount: req.body.amount * 100,
          currency: "INR",
          receipt: payment.id,
          payment_capture: 1,
        };
        instance.orders.create(options, function (err: string, order: any) {
          return res.status(201).send({ order, err });
        });
      })
      .catch((er: any) => {
        return res.status(400).send({ er });
      });
  }
);

// exports.api = onRequest({ cors: [/williamharry\.com$/, "williamharry.com",'localhost:3000'] }, router);
exports.api = onRequest({ cors: true }, router);
