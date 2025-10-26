interface RentalItem {
  id: number;
  name: string;
  pricePerDay: number;
  deposit: number;
  image: string;
  category: string;
  description: string;
}

interface RentalGridProps {
  onItemClick: (item: RentalItem) => void;
}

const rentalItems: RentalItem[] = [
  {
    id: 1,
    name: "Canon EOS R6",
    pricePerDay: 45,
    deposit: 500,
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    category: "Camera",
    description:
      "Professional full-frame mirrorless camera with 20MP sensor, 4K video recording, and advanced autofocus system. Perfect for photography enthusiasts and professionals.",
  },
  {
    id: 2,
    name: "Mountain Bike",
    pricePerDay: 25,
    deposit: 200,
    image:
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop",
    category: "Bicycle",
    description:
      "High-performance mountain bike with 21-speed gears, front suspension, and durable aluminum frame. Perfect for trails and off-road adventures.",
  },
  {
    id: 3,
    name: "Tesla Model 3",
    pricePerDay: 120,
    deposit: 1000,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    category: "Car",
    description:
      "Electric luxury sedan with autopilot, premium interior, and over 300 miles of range. Experience the future of driving with zero emissions.",
  },
  {
    id: 4,
    name: "DJI Mavic Pro",
    pricePerDay: 35,
    deposit: 400,
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop",
    category: "Drone",
    description:
      "Compact foldable drone with 4K camera, 27-minute flight time, and intelligent flight modes. Capture stunning aerial footage with ease.",
  },
  {
    id: 10,
    name: "MacBook Pro",
    pricePerDay: 40,
    deposit: 800,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    category: "Electronics",
    description:
      "Latest MacBook Pro with M2 chip, 16GB RAM, and 512GB SSD. Perfect for creative work, video editing, and professional tasks.",
  },
  {
    id: 5,
    name: "Sony A7III",
    pricePerDay: 50,
    deposit: 600,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    category: "Camera",
    description:
      "Full-frame mirrorless camera with 24.2MP sensor, 4K HDR video, and 693-point autofocus. Industry-leading performance for professionals.",
  },
  {
    id: 7,
    name: "BMW X5",
    pricePerDay: 150,
    deposit: 1500,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    category: "Car",
    description:
      "Luxury SUV with premium leather interior, advanced safety features, and powerful engine. Spacious, comfortable, and perfect for any occasion.",
  },
  {
    id: 8,
    name: "GoPro Hero 11",
    pricePerDay: 20,
    deposit: 250,
    image:
      "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400&h=300&fit=crop",
    category: "Camera",
    description:
      "Waterproof action camera with 5.3K video, HyperSmooth stabilization, and voice control. Perfect for adventures and extreme sports.",
  },
  {
    id: 9,
    name: "Road Bike",
    pricePerDay: 30,
    deposit: 300,
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop",
    category: "Bicycle",
    description:
      "Lightweight carbon fiber road bike with 18-speed Shimano gears. Built for speed and long-distance cycling on paved roads.",
  },
  {
    id: 11,
    name: "Gaming Console",
    pricePerDay: 18,
    deposit: 300,
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    category: "Electronics",
    description:
      "Latest PlayStation 5 with two controllers, 4K gaming support, and ultra-fast SSD. Includes popular games for an amazing gaming experience.",
  },
  {
    id: 12,
    name: "Camping Tent",
    pricePerDay: 12,
    deposit: 100,
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=300&fit=crop",
    category: "Outdoor",
    description:
      "Spacious 4-person camping tent with waterproof coating, easy setup, and ventilation windows. Perfect for weekend camping trips.",
  },
  {
    id: 6,
    name: "Electric Scooter",
    pricePerDay: 15,
    deposit: 150,
    image:
      "https://www.ebikes.co.uk/media/catalog/product/cache/5b9149b7d5b82a453bd9f7f34b9c15a8/s/t/standard__gry.jpeg",
    category: "Scooter",
    description:
      "Eco-friendly electric scooter with 25-mile range, foldable design, and LED display. Great for city commutes and short trips.",
  },
];

export default function RentalGrid({ onItemClick }: RentalGridProps) {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Browse Listings
        </h2>
        <p className="text-gray-600 mt-1">
          {rentalItems.length} items available
        </p>
      </div>

      {/* Grid of Rental Items - 4 per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rentalItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
          >
            {/* Image */}
            <div className="aspect-video w-full overflow-hidden bg-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.name}
                </h3>
                <span className="text-base text-gray-500">{item.category}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600">Price/day</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${item.pricePerDay}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600">Deposit</span>
                  <span className="text-lg font-medium text-gray-700">
                    ${item.deposit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
