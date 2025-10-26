interface CheckoutProps {
  item: {
    id: number;
    name: string;
    pricePerDay: number;
    deposit: number;
    image: string;
    category: string;
  };
  startDate: string;
  endDate: string;
  days: number;
  rentalCost: number;
  totalCost: number;
  onBack: () => void;
}

export default function Checkout({
  item,
  startDate,
  endDate,
  days,
  rentalCost,
  totalCost,
  onBack,
}: CheckoutProps) {
  // Mock wallet address
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8";

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleConfirm = () => {
    alert("Rental confirmed! Funds locked on blockchain.");
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
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
          Back
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Review and confirm your rental</p>
        </div>

        {/* Wallet Connection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Concordium Wallet Status
            </h2>
            <button
              disabled
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg text-sm font-medium cursor-not-allowed"
            >
              Connected
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center mr-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Wallet Address</p>
                <p className="text-base font-medium text-gray-900">
                  {formatAddress(walletAddress)}
                </p>
              </div>
            </div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Rental Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Rental Summary
          </h2>

          {/* Item Info */}
          <div className="flex items-start mb-6 pb-6 border-b border-gray-200">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-base text-gray-500 mt-1">{item.category}</p>
            </div>
          </div>

          {/* Rental Period */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900 mb-3">
              Rental Period
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Start Date</span>
                <span className="text-base font-medium text-gray-900">
                  {formatDate(startDate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">End Date</span>
                <span className="text-base font-medium text-gray-900">
                  {formatDate(endDate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Duration</span>
                <span className="text-base font-medium text-gray-900">
                  {days} day{days !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-900 mb-3">
              Cost Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">
                  ${item.pricePerDay} × {days} day{days !== 1 ? "s" : ""}
                </span>
                <span className="text-lg font-medium text-gray-900">
                  ${rentalCost}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">
                  Refundable Deposit
                </span>
                <span className="text-lg font-medium text-gray-900">
                  ${item.deposit}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-900">
                    Total to Lock
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${totalCost}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <svg
                className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm text-blue-900 font-medium">
                  Your deposit will be returned
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  The deposit of ${item.deposit} will be automatically refunded
                  to your wallet when you return the item in good condition.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full bg-gray-900 text-white py-5 rounded-lg text-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
        >
          Lock Funds and Confirm
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          By confirming, you agree to our rental terms and conditions
        </p>
      </div>
    </div>
  );
}
