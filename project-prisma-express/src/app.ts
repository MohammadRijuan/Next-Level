import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import httpStatus from "http-status";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.routes";
import { postRoutes } from "./modules/post/post.route";
import { commentRoutes } from "./modules/comment/comment.route";
import { notFound } from "./middlewares/notFound";
import { error } from "node:console";
import { golbalErrorHandler } from "./middlewares/globalErrorHandler";
import { subscriptionRoutes } from "./modules/subscription/subscription.route";
import { stripe } from "./lib/stripe";
import { premiumRoutes } from "./modules/premium/premium.route";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);


const endpointSecret = config.stripe_webhook_secret


// settiing up the stripe webhook
// app.post("/api/subscription/webhook",express.raw({type: 'application/json'}),(request,response)=>{
//   let event = request.body;
//   // Only verify the event if you have an endpoint secret defined.
//   // Otherwise use the basic event deserialized with JSON.parse
//   if (endpointSecret) {
//     // Get the signature sent by Stripe
//     const signature = request.headers['stripe-signature']!;
//     try {
//       event = stripe.webhooks.constructEvent(
//         request.body,
//         signature,
//         endpointSecret
//       );
//     } catch (err : any) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       return response.status(400).json({
//         message : err.message
//       });
//     }
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       break;
//     case 'payment_method.attached':
//       const paymentMethod = event.data.object;
//       // Then define and call a method to handle the successful attachment of a PaymentMethod.
//       // handlePaymentMethodAttached(paymentMethod);
//       break;
//     default:
//       // Unexpected event type
//       console.log(`Unhandled event type ${event.type}.`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// })

// best practice for settiing up the stripe webhook
app.use("/api/subscription/webhook",express.raw({type: 'application/json'}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// all api

app.get("/", (req: Request, res: Response) => {
  res.send("hello mamma ki obosta???");
});




// user api middleware
app.use("/api/user", userRoutes);

// auth api middleware
app.use("/api/auth", authRoutes);

// posts api middleware
app.use("/api/posts", postRoutes);

// comment api middleware
app.use("/api/comments", commentRoutes);

// subscription
app.use("/api/subscription",subscriptionRoutes)

// premium 
app.use("/api/premium",premiumRoutes)





// not found middleware
app.use(notFound);

// global error middleware
app.use(golbalErrorHandler);

export default app;
