
'use client'
import React, { useEffect, useState, useRef } from "react";
import DetailsImages from "../_components/DetailsImages";
import Image from "next/image";
import { getProfile } from '../servicesApi/ProfileApi';
import { useSearchParams, useRouter } from "next/navigation";
import { getTripById } from "../servicesApi/GetTripById";
import Script from "next/script";
import { addPayment } from '../servicesApi/PaymentApi';
import { addReservation } from '../servicesApi/ReservationApi'; // استيراد API الحجز

// Force client-side rendering
export const dynamic = 'force-dynamic';

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tripId = searchParams.get("id"); // e.g., "1071"
  const total = Number(searchParams.get("total")) || 1; // e.g., 7500
  const persons = Number(searchParams.get("persons")) || 1; // e.g., 2
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [userData, setUserData] = useState(null);
  const paypalButtonContainer = useRef(null);
  const [isPaypalLoaded, setIsPaypalLoaded] = useState(false);

  // جلب userData مباشرة في بداية الـ Component
  const fetchInitialData = async () => {
    try {
      const profileData = await getProfile();
      console.log("User Data from getProfile:", profileData);
      if (!profileData || !profileData.id) {
        throw new Error("User ID not found in profile data.");
      }
      setUserData(profileData);

      if (tripId) {
        const tripData = await getTripById(tripId);
        setTrip(tripData);
      }
    } catch (err) {
      setError(err.message || "Failed to load initial data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // استدعاء fetchInitialData مرة واحدة عند تحميل الـ Component
  useEffect(() => {
    fetchInitialData();
  }, []);

  // PayPal Button Configuration
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (total / 100).toFixed(2), // Convert EGP to USD (assuming 1 EGP = 0.01 USD for simplicity)
            currency_code: "USD" // PayPal requires USD for Sandbox
          },
          description: `Payment for Trip ID: ${tripId}, Persons: ${persons}`
        }
      ]
    });
  };

  const onApprove = async (data, actions) => {
    try {
      await actions.order.capture();
      const paymentData = {
        id: 0, // يولد من السيرفر
        type: "PayPal", // قيمة افتراضية
        amount: persons, // عدد الأشخاص
        processNumber: data.orderID, // معرف الطلب من PayPal
        user_Id: userData.id, // الـ User ID من userData
        trip_Id: Number(tripId) // معرف الرحلة
      };
      // استدعاء API الدفع
      const paymentResponse = await addPayment(paymentData);
      const paymentId = paymentResponse.id; // جلب paymentId من الاستجابة

      // إضافة الحجز بعد نجاح الدفع
      const reservationData = {
        user_Id: userData.id, // الـ User ID من userData
        trip_Id: Number(tripId), // معرف الرحلة
        paymentId: paymentId, // الـ paymentId من استجابة addPayment
        total_price: total, // السعر الكلي من searchParams
        dateCreated: new Date().toISOString() // تاريخ الحالي
      };
      await addReservation(reservationData);

      router.push("/Congratulation"); // Navigate on success
    } catch (error) {
      setPaymentError("Failed to process payment or save reservation. Please try again.");
      console.error("Payment or Reservation API error:", error);
    }
  };

  const onError = (err) => {
    setPaymentError("An error occurred during payment. Please try again.");
    console.error("PayPal error:", err);
  };


  useEffect(() => {
    let timer;
    const checkPaypal = () => {
      if (typeof window !== "undefined" && window.paypal && paypalButtonContainer.current && !isPaypalLoaded) {
        window.paypal
          .Buttons({
            createOrder: createOrder,
            onApprove: onApprove,
            onError: onError
          })
          .render(paypalButtonContainer.current);
        setIsPaypalLoaded(true);
        clearTimeout(timer); // Stop the timeout
      } else if (!isPaypalLoaded) {
        timer = setTimeout(checkPaypal, 500); // Retry every 500ms
      }
    };

    if (userData && userData.id) {
      checkPaypal(); // فقط لما userData جاهز
    }

    // Cleanup timeout on unmount
    return () => clearTimeout(timer);
  }, [userData]); // تعتمد على userData

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!userData || !userData.id) {
    return <p className="text-red-500 text-center">Failed to load user ID from profile data.</p>;
  }

  const images = Array.isArray(trip?.images) ? trip.images : [];
  return (
    <div className="flex flex-col md:flex-row justify-start items-start min-h-screen bg-primary text-white p-6 md:pr-28">
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

          {paymentError && <p className="text-red-500 text-center">{paymentError}</p>}

          <div className="bg-[#FFFFFF70] sm:w-[50%] h-[2px] mt-3 ml-24"></div>

          {/* PayPal Button */}
          <div ref={paypalButtonContainer} id="paypal-button-container" className="sm:w-[80%] mt-7">
            {!isPaypalLoaded && <p className="text-white">Loading PayPal button...</p>}
          </div>

          {/* PayPal SDK Script */}
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

export default Page;
