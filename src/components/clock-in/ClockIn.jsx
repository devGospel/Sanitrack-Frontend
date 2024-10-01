import React from 'react';

const ClockIn = () => {
  // This is a placeholder for the current time
  const [currentTime, setCurrentTime] = React.useState(
    new Date().toLocaleTimeString()
  );

  // Update the time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-100 py-4 px-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-1-11.917A6 6 0 006 6v8.159c0 .53-.21 1.04-.595 1.436L4 17h5"></path>
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">Isabella Kpai</span>
          </div>
          <button className="text-gray-600">Logout</button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <button className="self-start mb-4 text-blue-600 hover:underline">
          &lt; Clock In
        </button>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 border-4 border-blue-200 rounded-full flex items-center justify-center">
              <svg
                className="w-32 h-32 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6l4 2"></path>
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"></circle>
              </svg>
            </div>
            <div className="mt-4 text-xl font-mono">{currentTime}</div>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
              Clock In
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClockIn;
