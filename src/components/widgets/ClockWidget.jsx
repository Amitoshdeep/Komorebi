import React, { useState, useEffect } from "react";

function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true, // 🔥 ensures 12-hour format
  });

  return (
    <div className="flex flex-col items-center justify-center h-full">

      <h2
      className="text-2xl font-Getboreg
      border-b-[1px]
      ">
        Clock
      </h2>

      <p className="text-2xl font-mono py-5">
        {formattedTime}
      </p>
    </div>
  );
}

export default ClockWidget;
