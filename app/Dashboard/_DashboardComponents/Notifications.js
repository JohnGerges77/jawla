import React from "react";
import Image from "next/image"; // ✅ استيراد Image من Next.js

function Notifications() {
  return (
    <div>
      <button>
        <Image
          src="/images/notifications.png"
          alt="notification"
          width={24} 
          height={24} 
          className="h-[1.5em] w-auto"
        />
      </button>
    </div>
  );
}

export default Notifications;
