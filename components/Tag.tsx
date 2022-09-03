import React from "react";

import theme from "../styles/theme";

export interface TagPros {
  children: React.ReactNode;
}

function Tag({children}: TagPros) {
  return (
    <div className="tag">
      {children}
      <style jsx>{`
        .tag {
          border-radius: 10px;
          background: ${theme.colorBg};
        }
      `}</style>
    </div>
  );
}

export default Tag;
