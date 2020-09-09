import React from "react";

export default ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal-header">
          <button className="close-btn" onClick={handleClose}>
            x
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </section>
    </div>
  );
};
