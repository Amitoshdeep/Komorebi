import React from "react";

function QuickLinksWidget() {
  const links = [
    { name: "YouTube", url: "https://youtube.com" },
    { name: "GitHub", url: "https://github.com" },
    { name: "ChatGPT", url: "https://chat.openai.com" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2
      className="text-lg font-semibold mb-2 font-Getboreg
      border-b-[1px]">
        Quick Links
      </h2>

      <div className="flex flex-col gap-1 py-3">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default QuickLinksWidget;
