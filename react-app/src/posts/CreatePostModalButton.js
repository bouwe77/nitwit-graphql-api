import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";

export default function CreatePostModalButton({ onSuccess }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="createPostButtonContainer">
      <button onClick={() => setShowModal(true)} className="createPostButton">
        Create Post
      </button>
      <CreatePostModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          if (onSuccess) onSuccess();
        }}
      />
    </div>
  );
}
