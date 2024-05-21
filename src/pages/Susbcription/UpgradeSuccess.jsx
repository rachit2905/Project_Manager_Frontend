import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserSubscription,
  upgradeUserSubscription,
} from "@/Redux/Subscription/Action";

const UpgradeSuccess = () => {
  const navigate = useNavigate();
  const { subscription, auth } = useSelector((store) => store);
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("payment_id");
  const planType = queryParams.get("planType");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      upgradeUserSubscription({ userId: auth.user.id, planType: planType })
    );
    dispatch(getUserSubscription(auth.user.id));
  }, [planType]);

  return (
    <div className="flex justify-center">
      <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">
        <div
          className="flex items-center gap-4
        "
        >
          <CheckCircledIcon className="h-9 w-9 text-green-500"></CheckCircledIcon>
          <p className="text-xl">Plan Upgraded Successfully</p>
        </div>
        <div className="space-y-3">
          <p className="text-green-500">
            start date:{subscription.subscription?.startDate}
          </p>
          <p className="text-red-500">
            end date:{subscription.subscription?.endDate}
          </p>
          <p>Plan Type:{planType}</p>
        </div>
        <Button onClick={() => navigate("/")}>Go To Home</Button>
      </Card>
    </div>
  );
};

export default UpgradeSuccess;
