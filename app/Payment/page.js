'use client';
import React, { useEffect, useState, useRef } from "react";
import DetailsImages from "../_components/DetailsImages";
import Image from "next/image";
import { getProfile } from "../servicesApi/ProfileApi";
import { useSearchParams, useRouter } from "next/navigation";
import { getTripById } from "../servicesApi/GetTripById";
import Script from "next/script";
import { addPayment } from "../servicesApi/PaymentApi";
import { addReservation } from "../servicesApi/ReservationApi";
import Spinner from "../_components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

// Component منفصل بيستخدم useSearchParams و useRouter
function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tripId = searchParams.get("id");
  const total = Number(searchParams.get("total")) || 1;
  const persons = Number(searchParams.get("persons")) || 1;
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [userData, setUserData] = useState(null);
  const paypalButtonContainer = useRef(null);
  const [isPaypalLoaded, setIsPaypalLoaded] = useState(false);

  const fetchInitialData = async () => {
    try {
      const profileData = await getProfile();
      if (!profileData || !profileData.id) {
        throw new Error("No authentication token found. You must be logged in.");
      }
      setUserData(profileData);

      if (tripId) {
        const tripData = await getTripById(tripId);
        setTrip(tripData);
      }
    } catch (err) {
      setError(err.message || "Failed to load initial data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error('You must be logged in to proceed with payment.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        router.push("/LogIn");
      }, 2000);
    }
    if (paymentError) {
      toast.error(paymentError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error, paymentError]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (total / 100 / 51).toFixed(2),
            currency_code: "USD",
          },
          description: `Payment for Trip ID: ${tripId}, Persons: ${persons}`,
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      await actions.order.capture();
      const paymentData = {
        id: 0,
        type: "PayPal",
        amount: persons,
        processNumber: data.orderID,
        user_Id: userData.id,
        trip_Id: Number(tripId),
      };
      const paymentResponse = await addPayment(paymentData);
      const paymentId = paymentResponse.id;

      const reservationData = {
        user_Id: userData.id,
        trip_Id: Number(tripId),
        paymentId: paymentId,
        total_price: total,
        dateCreated: new Date().toISOString(),
      };
      await addReservation(reservationData);

      router.push("/Congratulation");
    } catch (error) {
      setPaymentError("Failed to process payment or save reservation. Please try again.");
    }
  };

  const onError = (err) => {
    setPaymentError("An error occurred during payment. Please try again.");
  };

  useEffect(() => {
    let timer;
    const checkPaypal = () => {
      if (
        typeof window !== "undefined" &&
        window.paypal &&
        paypalButtonContainer.current &&
        !isPaypalLoaded
      ) {
        window.paypal
          .Buttons({
            createOrder: createOrder,
            onApprove: onApprove,
            onError: onError,
          })
          .render(paypalButtonContainer.current);
        setIsPaypalLoaded(true);
        clearTimeout(timer);
      } else if (!isPaypalLoaded) {
        timer = setTimeout(checkPaypal, 500);
      }
    };

    if (userData && userData.id) {
      checkPaypal();
    }

    return () => clearTimeout(timer);
  }, [userData]);

  if (loading) return <Spinner />;

  if (!userData || !userData.id) {
    return (
      <p className="text-red-500 text-center">
        You must be logged in to proceed with payment.
      </p>
    );
  }

  const images = Array.isArray(trip?.images) ? trip.images : [];
  return (
    <div className="flex flex-col md:flex-row justify-start items-start min-h-screen bg-primary text-white p-6 md:pr-28">
      <ToastContainer />
      <DetailsImages images={images} />
      <div className="w-full md:pl-10 mt-28">
        <div className="relative bottom-12 text-center mr-24">
          <h1 className="text-secondry font-semibold text-4xl pb-7">Payment</h1>
          <p className="text-xl">Pay securely using PayPal</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between px-5 text-xl font-semibold bg-[#D9D9D9] backdrop-blur-sm p-3 rounded-lg sm:w-[80%]">
            <span className="text-black text-xl font-semibold flex gap-3 pl-5 items-center">
              <Image src="/gmailImg.png" alt="email" width={37} height={37} />
              {userData.email}
            </span>
          </div>
          <div className="flex items-center justify-between px-5 text-xl font-semibold bg-[#D9D9D9] backdrop-blur-sm p-3 rounded-lg sm:w-[80%]">
            <span className="text-black">Persons</span>
            <span className="text-black">{persons}</span>
          </div>
          <div className="flex items-center justify-between px-5 text-xl font-semibold bg-[#D9D9D9] backdrop-blur-sm p-3 rounded-lg sm:w-[80%]">
            <span className="text-black">Total</span>
            <span className="text-black">{total} EGP</span>
          </div>
          <div className="bg-[#FFFFFF70] sm:w-[50%] h-[2px] mt-3 ml-24"></div>
          <div
            ref={paypalButtonContainer}
            id="paypal-button-container"
            className="sm:w-[80%] mt-7"
          >
            {!isPaypalLoaded && (
              <p className="text-white">Loading PayPal button...</p>
            )}
          </div>
          <Script
            src={`https://www.paypal.com/sdk/js?client-id=AW1TdvpSGbIM5iP4HJNI5TyTmwpY9Gv9dYw8_8yW5lYIbCqf326vrkrp0ce9TAqjEGMHiV3OqJM_aRT0`}
            strategy="lazyOnload"
            onError={() => setPaymentError("Failed to load PayPal SDK.")}
          />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <BookingContent />
    </Suspense>
  );
}