import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { IoIosArrowBack, IoIosAddCircle } from "react-icons/io";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaClock, FaRegHeart } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import ClockWidget from "../components/widgets/ClockWidget";
import QuickLinksWidget from "../components/widgets/QuickLinksWidget";

function Home() {

  const [wActive, setwActive] = useState(false);
  const [supActive, setsupActive] = useState(false);

  // For Widgets
  const defaultWidgets = [
    { id: 1, type: "clock", x: 100, y: 100, width: 200, height: 100 },
    { id: 2, type: "links", x: 400, y: 150, width: 250, height: 150 },
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
  const addWidget = (type = "custom") => {
    const newWidget = {
      id: Date.now(),
      type,
      x: 200,
      y: 200,
      width: 250,
      height: 150,
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
            {/* Widget Renderer */}
            {w.type === "clock" && <ClockWidget />}
            {w.type === "links" && <QuickLinksWidget />}
            {w.type === "custom" && <div>🌈 Your new custom widget here!</div>}
          </Rnd>
        ))}
      </div>

      {/* Floating Controles */}
      <div className="flex gap-2 fixed bottom-5 right-5">
        <div
        onClick={()=>{setwActive(!wActive)}}
        className="flex items-center justify-center
        p-3 bg-white rounded-full
        cursor-pointer hover:scale-110 duration-300
        relative z-30
        ">

          <IoIosArrowBack
          className={`${wActive? "rotate-90": "rotate-0"} duration-300`} />

        </div>

        {/* Widgets Options */}
        <AnimatePresence>
          {wActive && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
                duration: 0.25,
              }}
              className="absolute z-20 flex items-center justify-center gap-4 px-3
                        bottom-5 top-1/2 -translate-y-1/2 right-24
                        min-w-30 h-10 bg-white rounded-lg shadow-md"
            >
              {/* Add Clock Widget */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaClock
                  onClick={() => addWidget("clock")}
                  className="text-xl text-gray-700 cursor-pointer hover:text-green-600"
                />
              </motion.div>

              {/* Add Quick Links Widget */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IoLinkSharp
                  onClick={() => addWidget("links")}
                  className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600"
                />
              </motion.div>

              {/* Divider + Reset */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="pl-2 border-l border-red-600/20"
              >
                <FaArrowRotateLeft
                  onClick={resetLayout}
                  className="text-red-600/90 cursor-pointer duration-300 hover:scale-110"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supporrt */}
        <div
          onClick={()=>{setsupActive(!supActive)}}
          className="flex items-center justify-center p-3 bg-red-500/30 rounded-full
                    cursor-pointer hover:scale-110 transition-all duration-300 z-20">
          <FaRegHeart
            className="text-red-600/90"
          />
          {/* Support Block */}
          <AnimatePresence>
            {
              supActive && (
                <motion.div>

                </motion.div>
              )
            }
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}

export default Home;
