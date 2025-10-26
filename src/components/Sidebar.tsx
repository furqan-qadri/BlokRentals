export default function Sidebar() {
  return (
    <aside className="w-64 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
        <div className="space-y-2">
          {["All Items", "Camera", "Bicycle", "Car", "Drone", "Scooter"].map(
            (category) => (
              <label
                key={category}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 text-gray-600 rounded border-gray-300"
                  defaultChecked={category === "All Items"}
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600">Min Price</label>
            <input
              type="number"
              placeholder="$0"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Max Price</label>
            <input
              type="number"
              placeholder="$500"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Availability</h3>
        <div className="space-y-2">
          {["Available Now", "This Week", "This Month"].map((option) => (
            <label
              key={option}
              className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="availability"
                className="h-4 w-4 text-gray-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Minimum Rating
        </h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="rating"
                className="h-4 w-4 text-gray-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">
                {rating}+ Stars
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
        Apply Filters
      </button>
    </aside>
  );
}
