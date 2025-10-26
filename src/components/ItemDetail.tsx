import { useState } from "react";

interface RentalItem {
  id: number;
  name: string;
  pricePerDay: number;
  deposit: number;
  image: string;
  category: string;
  description: string;
}

interface CheckoutData {
  item: RentalItem;
  startDate: string;
  endDate: string;
  days: number;
  rentalCost: number;
  totalCost: number;
}

interface ItemDetailProps {
  item: RentalItem;
  onBack: () => void;
  onProceedToCheckout: (data: CheckoutData) => void;
}

export default function ItemDetail({
  item,
  onBack,
  onProceedToCheckout,
}: ItemDetailProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Calculate number of days
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const days = calculateDays();
  const rentalCost = days * item.pricePerDay;
  const totalCost = rentalCost + item.deposit;

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Description */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          {/* Right Column - Booking Details */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Item Info */}
              <div className="mb-6">
                <span className="text-base text-gray-500">{item.category}</span>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">
                  {item.name}
                </h1>
              </div>

              {/* Pricing */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg text-gray-600">Price per day</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {item.pricePerDay} <span className="text-base">CCD</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-600">Deposit</span>
                  <span className="text-xl font-medium text-gray-700">
                    {item.deposit} <span className="text-sm">CCD</span>
                  </span>
                </div>
              </div>

              {/* Date Picker */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Rental Period
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-base text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-base text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      min={startDate || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Cost Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base text-gray-600">
                      {item.pricePerDay} <span className="text-xs">CCD</span> ×{" "}
                      {days} day
                      {days !== 1 ? "s" : ""}
                    </span>
                    <span className="text-lg font-medium text-gray-900">
                      {rentalCost} <span className="text-sm">CCD</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base text-gray-600">
                      Refundable Deposit
                    </span>
                    <span className="text-lg font-medium text-gray-900">
                      {item.deposit} <span className="text-sm">CCD</span>
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        {totalCost} <span className="text-base">CCD</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rent Now Button */}
              <button
                disabled={!startDate || !endDate || days === 0}
                onClick={() =>
                  onProceedToCheckout({
                    item,
                    startDate,
                    endDate,
                    days,
                    rentalCost,
                    totalCost,
                  })
                }
                className="w-full bg-gray-900 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Rent Now
              </button>

              {(!startDate || !endDate) && (
                <p className="text-sm text-gray-500 text-center mt-3">
                  Please select rental dates
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
