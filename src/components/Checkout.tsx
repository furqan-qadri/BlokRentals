import { useState } from "react";
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import { AccountTransactionType, CcdAmount } from "@concordium/web-sdk";

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

  // State for transaction status and modal
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<
    "verifying" | "verified" | "error"
  >("verifying");
  const [statusMessage, setStatusMessage] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);

  // Contract details - adjust these for your actual contract
  const contractIndex = 12284;
  const contractSubindex = 0;

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

  const handleConfirm = async () => {
    setShowModal(true);
    setModalStatus("verifying");
    setStatusMessage("🔌 Connecting to Concordium wallet...");
    setTxHash(null);

    try {
      // Convert USD to CCD (for demo, using 1:1 ratio - adjust as needed)
      const amountCcd = totalCost;

      if (!Number.isFinite(amountCcd) || amountCcd <= 0) {
        throw new Error("Invalid amount");
      }

      const provider: any = await detectConcordiumProvider();
      if (!provider) {
        throw new Error(
          "Concordium browser wallet not found. Please install the Concordium Browser Wallet extension."
        );
      }

      const connection: any = await provider.connect();

      // Extract account address
      let accountAddress: string | undefined;

      if (typeof connection === "string") {
        accountAddress = connection;
      } else if (connection?.genesisHash) {
        const account = await provider.getMostRecentlySelectedAccount();
        accountAddress = account;
      } else if (connection?.accountAddress) {
        accountAddress = connection.accountAddress;
      } else if (connection?.account) {
        accountAddress = connection.account;
      } else if (Array.isArray(connection) && connection.length > 0) {
        accountAddress = connection[0];
      }

      if (!accountAddress) {
        console.error("Failed to extract account. Connection:", connection);
        throw new Error(
          "No account returned from wallet. Please ensure your wallet is connected."
        );
      }

      console.log("Using account address:", accountAddress);
      console.log("Locking amount:", amountCcd, "CCD");

      setStatusMessage(
        "📝 Preparing transaction... Please sign in your wallet popup."
      );

      let hash: string;

      if (typeof provider?.sendTransaction === "function") {
        console.log("Using provider.sendTransaction");
        setStatusMessage(
          "🔐 Please sign the transaction in your wallet popup..."
        );

        // Example contract call - adjust based on your contract
        hash = await provider.sendTransaction(
          accountAddress,
          AccountTransactionType.Update,
          {
            amount: CcdAmount.fromCcd(amountCcd),
            address: {
              index: BigInt(contractIndex),
              subindex: BigInt(contractSubindex),
            },
            receiveName: "escrow.deposit", // Replace with your contract method
            maxContractExecutionEnergy: 30000n,
          },
          "" // Parameter if needed
        );
      } else if (typeof provider?.signAndSendTransaction === "function") {
        console.log("Using provider.signAndSendTransaction");
        setStatusMessage(
          "🔐 Please sign the transaction in your wallet popup..."
        );

        hash = await provider.signAndSendTransaction(
          accountAddress,
          AccountTransactionType.Update,
          {
            amount: CcdAmount.fromCcd(amountCcd),
            address: {
              index: BigInt(contractIndex),
              subindex: BigInt(contractSubindex),
            },
            receiveName: "escrow.deposit",
            maxContractExecutionEnergy: 30000n,
          },
          ""
        );
      } else {
        console.error(
          "Available provider methods:",
          Object.keys(provider || {})
        );
        throw new Error(
          "Wallet does not support transaction signing. Please update your Concordium Browser Wallet."
        );
      }

      setTxHash(hash);
      console.log("Transaction hash:", hash);

      setStatusMessage("⏳ Verifying transaction on the blockchain...");

      await new Promise((resolve) => setTimeout(resolve, 6000));

      setModalStatus("verified");
      setStatusMessage(
        " Deposit locked securely on the blockchain.\n Neither the owner nor you have access to it until the rental period is over and both parties are satisfied."
      );
    } catch (error: any) {
      console.error("Transaction failed", error);
      setModalStatus("error");
      setStatusMessage(
        error?.message ?? "Transaction failed. Please try again."
      );
    }
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
                  {item.pricePerDay} <span className="text-xs">CCD</span> ×{" "}
                  {days} day{days !== 1 ? "s" : ""}
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
                    Total to Lock
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {totalCost} <span className="text-base">CCD</span>
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
                  The deposit of {item.deposit}{" "}
                  <span className="text-xs">CCD</span> will be automatically
                  refunded to your wallet when you return the item in good
                  condition.
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
          Lock Deposit
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          By confirming, you agree to our rental terms and conditions
        </p>
      </div>

      {/* Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="text-center">
              {/* Status Icon */}
              <div className="mb-4 flex justify-center">
                {modalStatus === "verifying" && (
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
                )}
                {modalStatus === "verified" && (
                  <div className="rounded-full h-16 w-16 bg-green-100 flex items-center justify-center">
                    <svg
                      className="h-10 w-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
                {modalStatus === "error" && (
                  <div className="rounded-full h-16 w-16 bg-red-100 flex items-center justify-center">
                    <svg
                      className="h-10 w-10 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Status Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {modalStatus === "verifying" && "Verifying Transaction"}
                {modalStatus === "verified" && "Deposit Locked!"}
                {modalStatus === "error" && "Transaction Failed"}
              </h3>

              {/* Status Message */}
              <p className="text-gray-600 mb-6 text-base">{statusMessage}</p>

              {/* Transaction Details */}
              {txHash && (
                <div className="mb-6 space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">
                      Smart Contract ID
                    </p>
                    <code className="text-xs text-gray-800 break-all block font-semibold">
                      {contractIndex},{contractSubindex}
                    </code>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">
                      Transaction Hash
                    </p>
                    <code className="text-xs text-gray-800 break-all block">
                      {txHash}
                    </code>
                    {/* <a
                      href={`https://dashboard.concordium.com/explorer/transaction/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
                    >
                      View on Explorer →
                    </a> */}
                  </div>
                </div>
              )}

              {/* Rental Details on Success */}
              {modalStatus === "verified" && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 text-left">
                  <p className="text-sm font-semibold text-green-900 mb-2">
                    Rental Confirmed
                  </p>
                  <div className="space-y-1 text-sm text-green-800">
                    <p>
                      <strong>Item:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Duration:</strong> {days} day
                      {days !== 1 ? "s" : ""}
                    </p>
                    <p>
                      <strong>Total Locked:</strong> {totalCost}{" "}
                      <span className="text-xs">CCD</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {modalStatus === "verified" && (
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              )}
              {modalStatus === "error" && (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleConfirm();
                    }}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
