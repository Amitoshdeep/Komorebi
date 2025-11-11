import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

function Home() {
  const [widgets, setWidgets] = useState(null); // null until loaded

  // Load widgets from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("widgets");
    if (saved) {
      setWidgets(JSON.parse(saved));
    } else {
      // Default layout if none saved
      setWidgets([
        { id: 1, x: 100, y: 100, width: 200, height: 100, content: "🕒 Clock" },
        { id: 2, x: 400, y: 150, width: 250, height: 150, content: "📁 Quick Links" },
      ]);
    }
  }, []);

  // Save to localStorage whenever widgets change
  useEffect(() => {
    if (widgets) {
      localStorage.setItem("widgets", JSON.stringify(widgets));
    }
  }, [widgets]);

  // Update & instantly persist widget data
  const handleUpdate = (id, data) => {
    setWidgets((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...data } : item));
      localStorage.setItem("widgets", JSON.stringify(updated)); // save instantly
      return updated;
    });
  };

  // If not loaded yet, render nothing (prevents flicker)
  if (!widgets) return null;

  return (
    <div className="relative z-10 pt-16 h-screen w-full">
      <div className="flex items-center justify-center h-full w-full">
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
            className="bg-white/10 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/20 text-center cursor-move select-none"
          >
            {w.content}
          </Rnd>
        ))}
      </div>
    </div>
  );
}

export default Home;
