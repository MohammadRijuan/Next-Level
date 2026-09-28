import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { SubscriptionStatus } from "../../../generated/prisma/enums";
import { handleChangeSubscription, handleCheckoutCompleted } from "./subscription.utils";

const createCheckoutSession = async (userId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    });

    // old subscriber
    let stripeCustomerId = user.subscription?.stripeCustomerId;

    // new subscriber
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId,
        },
      });

      stripeCustomerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: config.stripe_product_price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      success_url: `${config.app_url}/premium?success=true`,
      cancel_url: `${config.app_url}/payment?success=false`,
      metadata: { userId: user.id },
    });

    return session.url;
  });

  return {
    paymentUrl: transactionResult,
  };
};

const handleWebhook = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret;

  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret,
  );

  switch (event.type) {
    case "checkout.session.completed":
      // console.log(event.data.object);
      // const session: Stripe.Checkout.Session = event.data.object;
      // const userId = session.metadata?.userId;

      // const stripeCustomerId = session.customer as string;
      // const stripeSubscriptionId = session.subscription as string;

      // if (!userId || !stripeSubscriptionId || !stripeCustomerId) {
      //   throw new Error("webhook failed");
      // }

      // const stripeSubscription = await stripe.subscriptions.retrieve(
      //   stripeSubscriptionId as string,
      // );

      // console.log("sub info ", stripeSubscription.items.data[0]);

      // // const currentPeriodStart = stripeSubscription.items.data[0]?.current_period_start
      // const currentPeriodEndInMilliSeconds =
      //   stripeSubscription.items.data[0]?.current_period_end!;

      // const currentPeriodEnd = new Date(currentPeriodEndInMilliSeconds * 1000);

      // console.log(currentPeriodEnd, "End");

      // await prisma.subscription.upsert({
      //   where: {
      //     userId,
      //   },
      //   create: {
      //     userId,
      //     stripeCustomerId,
      //     stripeSubscriptionId,
      //     status: "ACTIVE",
      //     currentPeriodEnd,
      //   },
      //   update: {
      //     stripeCustomerId,
      //     stripeSubscriptionId,
      //     status: "ACTIVE",
      //     currentPeriodEnd,
      //   },
      // });

      await handleCheckoutCompleted(event.data.object);

      break;
    case "customer.subscription.updated":
      // const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);

      await handleChangeSubscription(event.data.object);
      break;

    case "customer.subscription.deleted":
      // const

      await handleChangeSubscription(event.data.object);
      break;
    default:
      // Unexpected event type
      console.log(`No events matched ... Unhandled event type ${event.type}.`);
      break;
  }
};


const getSubscriptionStatus = async(userId : string) =>{
  const isSubscriptionExist = await prisma.subscription.findUniqueOrThrow({
    where :{
      userId
    }
  });

  const isActive = isSubscriptionExist.status === "ACTIVE" && isSubscriptionExist.currentPeriodEnd && new Date(isSubscriptionExist.currentPeriodEnd) > new Date();

  return {
    status : isSubscriptionExist.status,
    isSubscribed : isActive,
    currentPeriodEnd : isSubscriptionExist.currentPeriodEnd
  }
}


export const subscriptionService = {
  createCheckoutSession,
  handleWebhook,
  getSubscriptionStatus
};
