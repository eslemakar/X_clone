import UserAvatar from "./user-avatar";
import TextArea from "../text-area";
import FormActions from "./form-actions";
import { useState, useRef } from "react";
import ImagePreview from "./image-preview";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import uploadToStorage from "../../firebase/uploadToStorage";
import { db } from "../../firebase";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  //resmin önizlemesi
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  //önizlemeyi kaldır
  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  //form gönderme
  const handleSubmit = async (e) => {
  e.preventDefault();

  const text = e.target.text.value;
  const file = e.target.image.files[0];

  if (!text && !file) return toast.warning("Lütfen içeriği belirleyiniz");

  try {
    setIsLoading(true);

    // sadece dosya varsa yükle
    let imageUrl = null;
    if (file) {
      imageUrl = await uploadToStorage(file);
    }

    const collectionRef = collection(db, "tweets");

    await addDoc(collectionRef, {
      content: {
        text,
        ...(imageUrl && { image: imageUrl }) // sadece image varsa ekle
      },
      isEdited: false,
      likes: [],
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
    });

    e.target.reset();
    clearImage();
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="border-b border-tw-gray p-4 flex gap-3">
      <UserAvatar photo={user.photoURL} name={user.displayName} />
      <form onSubmit={handleSubmit} className="w-full pt-1">
        <TextArea />
        <ImagePreview image={image} clearImage={clearImage} />
        <FormActions
          isLoading={isLoading}
          fileInputRef={fileInputRef}
          onImageChange={onImageChange}
        />
      </form>
    </div>
  );
};

export default Form;
