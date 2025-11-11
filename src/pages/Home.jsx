import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowRotateLeft } from "react-icons/fa6";

function Home() {
  const defaultWidgets = [
    { id: 1, x: 100, y: 100, width: 200, height: 100, content: "🕒 Clock" },
    { id: 2, x: 400, y: 150, width: 250, height: 150, content: "📁 Quick Links" },
  ];

  const [widgets, setWidgets] = useState(null);

  // Load widgets from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("widgets");
    if (saved) setWidgets(JSON.parse(saved));
    else setWidgets(defaultWidgets);
  }, []);

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    if (widgets) {
      localStorage.setItem("widgets", JSON.stringify(widgets));
    }
  }, [widgets]);

  // Update & persist widget data
  const handleUpdate = (id, data) => {
    setWidgets((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, ...data } : item
      );
      localStorage.setItem("widgets", JSON.stringify(updated)); // save instantly
      return updated;
    });
  };

  // Add new widget dynamically
  const addWidget = () => {
    const newWidget = {
      id: Date.now(),
      x: 200,
      y: 200,
      width: 220,
      height: 120,
      content: "✨ New Widget",
    };
    setWidgets((prev) => [...prev, newWidget]);
  };

  // Reset layout
  const resetLayout = () => {
    localStorage.removeItem("widgets");
    setWidgets(defaultWidgets);
  };

  // Prevent render flicker before load
  if (!widgets) return null;

  return (
    <div className="relative z-10 pt-16 h-screen w-full select-none">
      <div className="h-full w-full">
        {widgets.map((w) => (
          <Rnd
            key={w.id}
            bounds="parent"
            size={{ width: w.width, height: w.height }}
            position={{ x: w.x, y: w.y }}
            onDragStop={(e, d) => handleUpdate(w.id, { x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleUpdate(w.id, {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
                ...position,
              })
            }
            className="bg-white/10 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/20 text-center cursor-move hover:bg-white/15"
          >
            <div className="font-semibold text-sm mb-2 border-b border-white/10 pb-1">
              {w.content}
            </div>
            <div className="text-xs text-white/60">Drag or resize me</div>
          </Rnd>
        ))}
      </div>

      {/* Floating Controls */}
      {/* <div className="fixed bottom-5 right-5 flex flex-col gap-3">
        <button
          onClick={addWidget}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md shadow-md border border-white/20 transition-all duration-200"
        >
          ➕ Add Widget
        </button>

        <button
          onClick={resetLayout}
          className="px-4 py-2 rounded-xl bg-red-500/70 hover:bg-red-500 text-white shadow-md transition-all duration-200"
        >
          ♻️ Reset Layout
        </button>
      </div> */}

      <div className="flex gap-2 fixed bottom-5 right-5">

        <div className="flex items-center justify-center p-3 bg-white rounded-full cursor-pointer hover:scale-110 duration-300">

          <IoIosArrowBack />

        </div>

        <div className="flex items-center justify-center p-3 bg-red-500/30 rounded-full cursor-pointer hover:scale-110 duration-300">
          <FaArrowRotateLeft className="text-red-600/90" />
        </div>

      </div>

    </div>
  );
}

export default Home;
