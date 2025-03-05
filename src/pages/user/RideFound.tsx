const RideFound = () => {
    return(
        <>
       <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="rounded-lg bg-white p-8 shadow-2xl w-full max-w-md">
    <h2 className="text-lg font-bold">Are you sure you want to proceed?</h2>

    <p className="mt-2 text-sm text-gray-500">
      Confirming will finalize your ride details. Are you 100% sure?
    </p>

    {/* User Information */}
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-md font-semibold">User: John Doe</h3>

      {/* Rating */}
      <div className="flex items-center gap-1 text-yellow-500">
        ⭐⭐⭐⭐⭐ <span className="text-sm text-gray-600">(4.8)</span>
      </div>

      {/* Ride Details */}
      <p className="mt-2 text-sm text-gray-600">
        <span className="font-medium">From:</span> Shivaji Nagar, Pune
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">To:</span> Magarpatta City, Pune
      </p>

      <p className="text-sm text-gray-600">
        <span className="font-medium">Time:</span> 5:30 PM, 25th Feb 2025
      </p>

      <p className="text-sm text-gray-600">
        <span className="font-medium">Vehicle:</span> Maruti Suzuki Swift (White)
      </p>
    </div>

    {/* Confirmation Buttons */}
    <div className="mt-4 flex gap-2">
      <button
        type="button"
        className="rounded-sm bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
      >
        Yes, Confirm Ride
      </button>

      <button
        type="button"
        className="rounded-sm bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
      >
        No, Go Back
      </button>
    </div>
  </div>
</div>

        </>
    )
}
export default RideFound;