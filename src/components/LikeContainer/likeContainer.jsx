import "./likeContainer.css";

import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function LikeContainer({ photo, user, handleLike }) {
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill onClick={() => handleLike(photo)} />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}

          <p>{photo.likes.length} like(s)</p>
        </>
      )}
    </div>
  );
}
