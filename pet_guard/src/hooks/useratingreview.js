import { useEffect, useState } from "react";
import { getShelterReviews } from "../services/ratingreviewService";

const useShelterReviews = (shelterId) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await getShelterReviews(shelterId);
      setReviews(res.data.reviews);
      setAverageRating(res.data.averageRating);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shelterId) fetchReviews();
  }, [shelterId]);

  return { reviews, averageRating, loading, refreshReviews: fetchReviews };
};

export default useShelterReviews;
