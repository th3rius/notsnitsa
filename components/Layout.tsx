import globalStyles from "styles/global";

import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({children}: LayoutProps) {
  return (
    <div>
      {children}
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}

export default Layout;
