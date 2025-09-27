import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import Post from "../../components/post";
import { db } from "../../firebase";

const List = () => {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    // Koleksiyon referansı
    const collectionRef = collection(db, "tweets");

    // En yeni tweet en üstte olacak şekilde sırala
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    // Koleksiyona abone ol
    const unsub = onSnapshot(q, (snapshot) => {
      const temp = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTweets(temp);
    });

    return () => unsub();
  }, []);

  return !tweets ? (
    <Loader designs="my-20" />
  ) : (
    tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
  );
};

export default List;
