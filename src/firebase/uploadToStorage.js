import { toast } from "react-toastify";
import { v4 } from "uuid";
import { storage } from "./index";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const uploadToStorage = async (file) => {
  // dosya resim değilse veya dosya yoksa fonksiyonu durdur
  // if (file.type.slice(0,5) !== "image") return;
  // you can say this with this code either
  if (!file || !file.type.startsWith("image")) return;

  //maks dosya boyutu 2mb geçiyosa hata verir
  if (file.size > 2097152) {
    toast.error("Lütfen 2mb'ın altında bir medya seçiniz");
    throw new Error("Medya içeriği sınırı aşıyor");
  }

  //dosyanın yükleneceği konumun referansını al
  const imageRef = ref(storage, v4() + file.name);
  //referansı oluşturduğumuz konuma dosyayı yükle
  await uploadBytes(imageRef, file);

  //storagea yüklenen dosyanın urlini al ve return et
  const url = await getDownloadURL(imageRef);

  return url;
};
export default uploadToStorage;
