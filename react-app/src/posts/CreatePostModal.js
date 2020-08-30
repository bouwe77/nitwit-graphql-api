import React from "react";
import Modal from "../shared/Modal";
import CreatePost from "../posts/CreatePost";

export default function CreatePostModal({ show, handleClose, text }) {
  return (
    <Modal show={show} handleClose={handleClose}>
      <CreatePost initialText={text} onSuccess={handleClose} />
    </Modal>
  );
}
