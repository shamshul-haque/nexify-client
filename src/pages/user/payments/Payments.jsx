import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";
import Container from "../../../components/shared/Container";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_paymentPK);
const Payments = () => {
  return (
    <div>
      <Helmet>
        <title>Make Payment | Nexify</title>
      </Helmet>
      <Container>
        <div className="bg-emerald-500 shadow-xl min-h-screen m-5 md:m-10">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </Container>
    </div>
  );
};

export default Payments;
