import { doc, updateDoc } from "firebase/firestore";
import Modal from "./index";
import { db } from "../../firebase";
import { useState } from "react";
import uploadToStorage from "../../firebase/uploadToStorage";

const EditModal = ({ isOpen, close, tweet }) => {
  //resim kaldırılacak mı
  const [isPicDeleting, setIsPicDeleting] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();

  const text = e.target[0].value;
  const file = e.target[1]?.files?.[0]; // <--- güvenli erişim

  const docRef = doc(db, "tweets", tweet.id);

  let updatedData = {
    "content.text": text,
    isEdited: true,
  };

  if (isPicDeleting) {
    updatedData["content.image"] = null;
  }

  if (file) {
    const imageUrl = await uploadToStorage(file); // await ekledim
    updatedData["content.image"] = imageUrl;
  }

  await updateDoc(docRef, updatedData);
  close();
  setIsPicDeleting(false);
};


  return (
    <Modal isOpen={isOpen} close={close}>
      <h1 className="text-2xl">Edit Tweet</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-10">
        <label className="text-sm">Edit Text </label>
        <textarea
          className="mt-3 resize-y min-h-12 max-h-[250px] bg-black text-white
          border border-zinc-300 rounded-md p-3 outline-none"
          defaultValue={tweet.content.text}
        />

        <label className="text-sm mt-8">Edit Image </label>
        {!isPicDeleting && tweet.content.image ? (
          <button
            onClick={() => setIsPicDeleting(true)}
            type="button"
            className="button"
          >
            Delete image
          </button>
        ) : (
          <input type="file" className="button" />
        )}

        <div className="flex justify-end gap-5 mt-10">
          <button className="cursor-pointer">Cancel</button>
          <button className="bg-secondary text-black rounded-md cursor-pointer hover:bg-secondary/90 transition px-3 py-3">
          Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
