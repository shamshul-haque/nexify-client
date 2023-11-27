import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { user } = useAuth();
  const paymentMoney = 20;

  useEffect(() => {
    axiosPrivate
      .post("/users/payment-intent", { price: paymentMoney })
      .then((res) => {
        setClientSecret(res?.data?.clientSecret);
      });
  }, [axiosPrivate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error?.message);
    } else {
      toast?.error(paymentMethod, {
        position: "top-right",
        theme: "colored",
      });
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous@gmail.com",
          },
        },
      });

    if (confirmError) {
      toast?.error(confirmError, {
        position: "top-right",
        theme: "colored",
      });
    } else {
      if (paymentIntent.status === "succeeded") {
        const payment = {
          email: user?.email,
          status: true,
        };
        const res = await axiosPrivate.post("/users/payment-history", payment);
        if (res?.data?.insertedId) {
          toast?.success("Subscription Successful!", {
            position: "top-right",
            theme: "colored",
          });
          navigate("/dashboard/user-profile");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="bg-yellow-600 disabled:bg-gray-300 px-3 py-1 rounded text-white"
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
    </form>
  );
};

export default CheckoutForm;
