import { useState } from "react";

interface Rental {
  id: number;
  itemName: string;
  renter: string;
  startDate: string;
  endDate: string;
  status:
    | "active"
    | "pending_return"
    | "returning_deposit"
    | "deposit_returned";
  rentalCost: number;
  deposit: number;
  contractId?: string;
}

// Mock data for demonstration
const initialRentals: Rental[] = [
  {
    id: 1,
    itemName: "Tesla Model 3",
    renter: "0x4e9d...8a1f",
    startDate: "2025-10-26",
    endDate: "2025-10-28",
    status: "active",
    rentalCost: 360,
    deposit: 100,
  },
  {
    id: 2,
    itemName: "Canon EOS R6",
    renter: "0x7a8f...3b2c",
    startDate: "2025-10-20",
    endDate: "2025-10-27",
    status: "active",
    rentalCost: 315,
    deposit: 500,
  },
  {
    id: 3,
    itemName: "DJI Mavic Pro",
    renter: "0x2b5c...6d4e",
    startDate: "2025-10-18",
    endDate: "2025-10-25",
    status: "pending_return",
    rentalCost: 245,
    deposit: 400,
  },
  {
    id: 4,
    itemName: "MacBook Pro",
    renter: "0x9f1a...4c7b",
    startDate: "2025-10-15",
    endDate: "2025-10-26",
    status: "active",
    rentalCost: 440,
    deposit: 800,
  },
];

// Generate a mock contract ID
const generateContractId = () => {
  return "12296";
};

export default function AdminDashboard() {
  const [rentals, setRentals] = useState<Rental[]>(initialRentals);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [completedContractId, setCompletedContractId] = useState<string>("");
  const [selectedRentalId, setSelectedRentalId] = useState<number | null>(null);

  const handleConfirmReturn = (rentalId: number) => {
    setSelectedRentalId(rentalId);
    setShowConfirmModal(true);
  };

  const handleConfirmYes = () => {
    if (selectedRentalId === null) return;

    // First update to returning_deposit
    setRentals((prev) =>
      prev.map((rental) =>
        rental.id === selectedRentalId
          ? { ...rental, status: "returning_deposit" as const }
          : rental
      )
    );

    // Simulate deposit return process
    setTimeout(() => {
      const contractId = generateContractId();
      setRentals((prev) =>
        prev.map((rental) =>
          rental.id === selectedRentalId
            ? {
                ...rental,
                status: "deposit_returned" as const,
                contractId,
              }
            : rental
        )
      );

      // Show success modal with contract ID
      setCompletedContractId(contractId);
      setShowSuccessModal(true);
    }, 2000);

    setShowConfirmModal(false);
    setSelectedRentalId(null);
  };

  const handleConfirmNo = () => {
    setShowConfirmModal(false);
    setSelectedRentalId(null);
  };

  const getStatusBadge = (rental: Rental) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      pending_return: "bg-yellow-100 text-yellow-800",
      returning_deposit: "bg-blue-100 text-blue-800",
      deposit_returned: "bg-gray-100 text-gray-800",
    };

    const labels = {
      active: "Active",
      pending_return: "Pending Return",
      returning_deposit: "Returning Deposit",
      deposit_returned: "Deposit Returned",
    };

    return (
      <div className="flex flex-col gap-1">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            styles[rental.status]
          }`}
        >
          {labels[rental.status]}
        </span>
        {rental.status === "pending_return" && (
          <span className="text-xs text-gray-500 font-medium">
            Auto Release: {rental.endDate}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage active rentals and confirm returns
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Active Rentals</div>
            <div className="text-3xl font-bold text-gray-900">
              {rentals.filter((r) => r.status === "active").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Pending Returns</div>
            <div className="text-3xl font-bold text-yellow-600">
              {rentals.filter((r) => r.status === "pending_return").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">
              Total Deposits Held
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {rentals
                .filter((r) => r.status !== "deposit_returned")
                .reduce((sum, r) => sum + r.deposit, 0)}{" "}
              <span className="text-lg">CCD</span>
            </div>
          </div>
        </div>

        {/* Rentals Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Renter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rental Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deposit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rentals.map((rental) => (
                  <tr key={rental.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {rental.itemName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-mono">
                        {rental.renter}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {rental.startDate} to {rental.endDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {rental.rentalCost} CCD
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {rental.deposit} CCD
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(rental)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rental.status === "active" ||
                      rental.status === "pending_return" ? (
                        <button
                          onClick={() => handleConfirmReturn(rental.id)}
                          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                        >
                          Confirm Return
                        </button>
                      ) : rental.status === "returning_deposit" ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                          <span className="text-sm text-blue-600 font-medium">
                            Processing...
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-green-600 font-medium">
                          ✓ Escrow Released
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {rentals.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No rentals
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No active rentals at the moment.
              </p>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <div className="mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Deposit will be released
                </h3>
                <p className="text-gray-600">
                  Are you sure the item has been received back?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleConfirmNo}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  No
                </button>
                <button
                  onClick={handleConfirmYes}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal with Contract ID */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <div className="mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Deposit Released Successfully
                </h3>
                <p className="text-gray-600 mb-4">
                  The escrow has been released and the deposit has been returned
                  to the renter.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Contract ID</div>
                  <div className="text-sm font-mono text-gray-900 break-all">
                    {completedContractId}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
