import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RentalGrid from "./components/RentalGrid";
import ItemDetail from "./components/ItemDetail";
import Checkout from "./components/Checkout";

export interface RentalItem {
  id: number;
  name: string;
  pricePerDay: number;
  deposit: number;
  image: string;
  category: string;
  description: string;
}

export interface CheckoutData {
  item: RentalItem;
  startDate: string;
  endDate: string;
  days: number;
  rentalCost: number;
  totalCost: number;
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  const handleItemClick = (item: RentalItem) => {
    setSelectedItem(item);
    setCheckoutData(null);
  };

  const handleBackToBrowse = () => {
    setSelectedItem(null);
    setCheckoutData(null);
  };

  const handleProceedToCheckout = (data: CheckoutData) => {
    setCheckoutData(data);
  };

  const handleBackToDetail = () => {
    setCheckoutData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {checkoutData ? (
        <Checkout
          item={checkoutData.item}
          startDate={checkoutData.startDate}
          endDate={checkoutData.endDate}
          days={checkoutData.days}
          rentalCost={checkoutData.rentalCost}
          totalCost={checkoutData.totalCost}
          onBack={handleBackToDetail}
        />
      ) : selectedItem ? (
        <ItemDetail
          item={selectedItem}
          onBack={handleBackToBrowse}
          onProceedToCheckout={handleProceedToCheckout}
        />
      ) : (
        <div className="flex">
          <Sidebar />
          <RentalGrid onItemClick={handleItemClick} />
        </div>
      )}
    </div>
  );
}
