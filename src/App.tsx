import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RentalGrid from "./components/RentalGrid";
import ItemDetail from "./components/ItemDetail";

export interface RentalItem {
  id: number;
  name: string;
  pricePerDay: number;
  deposit: number;
  image: string;
  category: string;
  description: string;
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);

  const handleItemClick = (item: RentalItem) => {
    setSelectedItem(item);
  };

  const handleBackToBrowse = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {selectedItem ? (
        <ItemDetail item={selectedItem} onBack={handleBackToBrowse} />
      ) : (
        <div className="flex">
          <Sidebar />
          <RentalGrid onItemClick={handleItemClick} />
        </div>
      )}
    </div>
  );
}
