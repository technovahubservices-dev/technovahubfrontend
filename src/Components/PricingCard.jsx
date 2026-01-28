import React, { useState } from "react";
import {
  Check,
  Calendar,
  Clock,
  IndianRupee,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gpayQR from "../assets/images/barcodegpay.jpg";

const features = [
  "Daily 30-minute online challenges",
  "Hands-on AI project building",
  "Expert guidance and support",
  "Interactive learning sessions",
  "Certificate of completion",
];

const PricingCard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleEnroll = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="max-w-md mx-auto px-6">
        <div className="p-8 bg-white/90 backdrop-blur-lg border-2 border-blue-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold mb-4">
              Limited Seats Available
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Challenge Enrollment
            </h3>
          </div>

          {/* Price */}
          <div className="text-center mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center justify-center gap-1 mb-2">
              <IndianRupee className="w-8 h-8 text-blue-600" />
              <span className="text-6xl font-extrabold text-blue-600">99</span>
            </div>
            <p className="text-gray-500">One-time payment</p>
          </div>

          {/* Duration Info */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-gray-800">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">7 Days Duration</p>
                <p className="text-sm text-gray-500">Complete program</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-800">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">30 Min Daily</p>
                <p className="text-sm text-gray-500">Online challenges</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={handleEnroll}
              className="w-full sm:w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-full text-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Enroll Now
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 rounded-full text-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Pay on GPay
            </button>
          </div>
        </div>
      </div>

      {/* ======== MODAL (Glass + Gradient) ======== */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 max-w-sm w-full shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Soft gradient glow background */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-2xl rounded-3xl -z-10" />

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-200 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Pay Using GPay
                </h3>
                <p className="text-gray-200 mb-6 text-sm">
                  Scan the QR code below to complete your ₹99 payment.
                </p>

                {/* QR Code Image */}
                <div className="rounded-2xl overflow-hidden border border-white/40 shadow-xl bg-white/10 p-2">
                  <img
                    src={gpayQR}
                    alt="GPay QR Code"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>

                <p className="text-gray-200 mt-5 text-sm">
                  After payment, click “Enroll Now” to submit your details.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PricingCard;
