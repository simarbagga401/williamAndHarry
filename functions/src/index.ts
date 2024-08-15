const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors")({ origin: true });
const Razorpay = require("razorpay");
import type { Request, Response, NextFunction } from "express";
const { onRequest } = require("firebase-functions/v2/https");

admin.initializeApp();
const router = express();
router.use(cors);

// Add your razorpay key and secret
const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

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

exports.api = onRequest({ cors: true }, router);
