import { MdEdit, MdDelete } from "react-icons/md";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { doc } from "firebase/firestore";
import { db } from "../../firebase";
import { deleteDoc } from "firebase/firestore";
import { useState, useRef } from "react";
import EditModal from "../modal/edit-modal";
const Dropdown = ({ tweet }) => {
  const [isOpen, setIsOpen] = useState();
  const checkboxRef = useRef();
  const isOwn = tweet.user?.id === auth.currentUser.uid;

  //sil butonu
  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete?")) return;

    //silinecek dökümanın referansını al
    const docRef = doc(db, "tweets", tweet.id);
    //dökümanı al
    deleteDoc(docRef).then(() => toast.info("Tweet has been deleted."));
  };

  return (
    isOwn && (
      <>
        <label className="popup">
          <input type="checkbox" ref={checkboxRef} />
          <div className="burger" tabindex="0">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="popup-window">
            <legend>Actions</legend>
            <ul>
              <li>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    {
                      /* dropdown kapat */
                    }
                    checkboxRef.current.checked = false ;
                  }}
                >
                  <MdEdit className="text-blue-500  text-base" />

                  <span>Edit</span>
                </button>
              </li>
              <hr />
              <li>
                <button onClick={handleDelete}>
                  <MdDelete className="text-red-500  text-base" />

                  <span>Delete</span>
                </button>
              </li>
            </ul>
          </nav>
        </label>
        <EditModal
          isOpen={isOpen}
          tweet={tweet}
          close={() => setIsOpen(false)}
        />
      </>
    )
  );
};

export default Dropdown;
