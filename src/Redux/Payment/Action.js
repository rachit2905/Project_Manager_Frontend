import api from "@/config/api"
import { CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_FAILURE } from "./ActionType"
export const createPayment = async (planType) => {

    try {

        const { data } = await api.post("/api/payment/" + planType)
        console.log(data)
        if (data.payment_link_url) { window.location.href = data.payment_link_url }
    } catch (error) {
        console.log(error);

    }
}
