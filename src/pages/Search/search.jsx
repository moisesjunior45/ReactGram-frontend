import "./search.css";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery";

// components
import LikeContainer from "../../components/LikeContainer/likeContainer";
import PhotoItem from "../../components/PhotoItem/photoItem";
import { Link } from "react-router-dom";

// redux
import { searchPhotos, like } from "../../slices/photoSlice";

export default function Photo() {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // Load photos
  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  //   Like a photo
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
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
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
          Não foram encontrados resultados para sua busca...
        </h2>
      )}
    </div>
  );
}
