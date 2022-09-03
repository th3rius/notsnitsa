import React from "react";

export interface TagPros {
  children: React.ReactNode;
}

function Tag({children}: TagPros) {
  return (
    <div className="tag small">
      {children}
      <style jsx>{`
        .tag {
          border-radius: 2px;
          background: #fffcff;
          color: #b48ead;
          width: fit-content;
          padding: 0.27rem 0.5rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Tag;
