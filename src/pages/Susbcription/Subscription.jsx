import React, { useEffect } from "react";
const paidPlan = [
  "Add unlimited project",
  "Access to live chat",
  "Add unlimited team member",
  "Advanced Reporting",
  "Priority Support",
  "Customization Options",
  "Integration Support",
  "Advanced Security",
  "Training and Resources",
  "Access Control",
  "Custom Workflows",
];

const annualPlan = [
  "Add unlimited project",
  "Access to live chat",
  "Add unlimited team member",
  "Advanced Reporting",
  "Priority Support",
  "Everything which montly plan has",
];

const freePlan = [
  "Add only 3 projects",
  "Basic Task Management",
  "Project Collaboration",
  "Basic Reporting",
  "Email Notifications",
  "Basic Access Control",
];
import SubscriptionCard from "./SubscriptionCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscription } from "@/Redux/Subscription/Action";
const Subscription = () => {
  const { subscription, auth } = useSelector((store) => store);
  console.log(subscription);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSubscription(auth.user.id));
  }, []);
  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard
          data={{
            planName: "Free",
            features: freePlan,
            planType: "FREE",
            price: 0,
            buttonName:
              subscription.subscription?.planType == "FREE"
                ? "Current Plan"
                : "Get Started",
          }}
        ></SubscriptionCard>
        <SubscriptionCard
          data={{
            planName: "Monthly Paid Plan",
            features: paidPlan,
            planType: "MONTHLY",
            price: 799,
            buttonName:
              subscription.subscription?.planType == "MONTHLY"
                ? "Current Plan"
                : "Get Started",
          }}
        ></SubscriptionCard>
        <SubscriptionCard
          data={{
            planName: "Annual Paid Plan",
            features: annualPlan,
            planType: "ANNUALY",
            price: 6711,
            buttonName:
              subscription.subscription?.planType == "ANNUALY"
                ? "Current Plan"
                : "Get Started",
          }}
        ></SubscriptionCard>
      </div>
    </div>
  );
};

export default Subscription;
