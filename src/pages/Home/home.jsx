import "./home.css";

// Componentes
import LikeContainer from "../../components/LikeContainer/likeContainer";
import PhotoItem from "../../components/PhotoItem/photoItem";
import { Link } from "react-router-dom";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhotos, like } from "../../slices/photoSlice";

export default function Home() {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // load all photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  // like a photo
  const handleLike = (photo) => {
    if (!photo || !photo._id || !user) return;

    const hasLiked = photo.likes?.includes(user._id);
    dispatch(like({ photoId: photo._id, hasLiked }));
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,
          <Link to={`/users/${user._Id}`}>Clique aqui</Link>
        </h2>
      )}
    </div>
  );
}
