import { CheckCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { createPayment } from "@/Redux/Payment/Action";
const SubscriptionCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleUpgrade = () => {
    dispatch(createPayment(data.planType));
  };
  return (
    <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#]14173b] shadow-2xl card p-5 space-y-5 w-[18rem]">
      <p>{data.planName}</p>
      <p>
        <span className="text-xl font-semibold">Rs. {data.price}/ </span>
        <span>{data.planType}</span>
      </p>
      {data.planType == "ANNUALY" && <p className="text-green-500">30% Off</p>}
      <Button onClick={handleUpgrade} className="w-full">
        {data.buttonName}
      </Button>
      <div>
        {data.features.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircledIcon></CheckCircledIcon> <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;