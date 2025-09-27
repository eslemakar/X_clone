import {
  FaRetweet,
  FaRegComment,
  FaHeart,
  FaShareAlt,
  FaRegHeart,
} from "react-icons/fa";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../../firebase";
const Buttons = ({ tweet }) => {
  const currentUserId = auth.currentUser?.uid;

  // tweet.likes undefined ise boş dizi ata
  const likes = tweet.likes || [];
  const isLiked = tweet ? likes.includes(currentUserId) : false;

  const toggleLike = async () => {
    if (!currentUserId) return; // kullanıcı yoksa çık

    const docRef = doc(db, "tweets", tweet.id);

    await updateDoc(docRef, {
      likes: isLiked
        ? arrayRemove(currentUserId) // kullanıcı id'sini kaldır
        : arrayUnion(currentUserId), // kullanıcı id'sini ekle
    });
  };

  return (
    <div className="flex justify-between items-center text-zinc-500">
      <button className="post-icon">
        <FaRegComment />
      </button>

      <button className="post-icon hover:text-blue-400 hover:bg-green-400/20">
        <FaRetweet />
      </button>

      <button
        onClick={toggleLike}
        className="flex items-center hover:text-pink-500 relative"
      >
        <span className="post-icon hover:bg-pink-400/20">
          {isLiked ? <FaHeart className="text-pink-500" /> : <FaRegHeart />}
        </span>
        <span className={`absolute -end-1 ${isLiked && "text-pink-500"} `}>
          {likes.length}
        </span>
      </button>

      <button className="post-icon hover:text-blue-400 hover:bg-green-400/20">
        <FaShareAlt />
      </button>
    </div>
  );
};

export default Buttons;
