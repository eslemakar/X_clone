import { getUserName } from "../../utils/helpers";
import { MdEdit } from "react-icons/md";
import moment from "moment";
const UserInfo = ({ tweet }) => {
  const date = tweet.createdAt
    ? moment(tweet.createdAt.toDate()).fromNow()
    : "2 hour ago";

  // Kullanıcı adı: tweet varsa onu al, yoksa manuel isim
  const name = tweet.user?.name || "Eslem Akar";

  return (
    <div className="flex gap-2 items-center whitespace-nowrap text-zinc-400">
      <p className="text-white font-semibold">{name}</p>
      <p className="text-sm">{getUserName(name)}</p>

      {/* Tarih */}
      <p className="text-sm">{date}</p>

      {/* Düzenlendi ikonu */}
      {tweet.isEdited && (
        <p className="flex items-center">
          <MdEdit className="md-hidden" />
          <span className="max-md:hidden ml-[5px]">(edited)</span>
        </p>
      )}

      {/* Boş p */}
      <p></p>
    </div>
  );
};

export default UserInfo;
