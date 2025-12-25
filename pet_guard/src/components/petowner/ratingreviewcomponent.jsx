import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

import { addOrUpdateReview } from "../../services/ratingreviewService";
import useShelterReviews from "../../hooks/useratingreview";
import { useAuth } from "../../auth/AuthProvider";

export default function ShelterReviews({ shelterId }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const { reviews, averageRating, loading, refreshReviews } =
    useShelterReviews(shelterId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && reviews.length > 0) {
      const myReview = reviews.find(
        (r) => r.user?._id === user._id
      );
      if (myReview) {
        setRating(myReview.rating);
        setComment(myReview.comment);
      }
    }
  }, [reviews, user]);

  const handleSubmit = async () => {
    if (!rating || !comment) {
      toast.error("Please give rating and review");
      return;
    }

    try {
      setSubmitting(true);
      await addOrUpdateReview(
        shelterId,
        { rating, comment },
        token
      );
      toast.success("Review saved successfully");
      refreshReviews();
    } catch (err) {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange, size = 22 }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size}
          className="cursor-pointer transition-transform hover:scale-110"
          color={star <= value ? "#FFC107" : "#E4E5E9"}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <p className="text-gray-400 animate-pulse">
        Loading reviews...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <StarRating value={Math.round(averageRating)} onChange={() => {}} />
        <span className="font-semibold text-lg">
          {averageRating.toFixed(1)} / 5
        </span>
        <span className="text-sm text-gray-500">
          ({reviews.length} reviews)
        </span>
      </div>

      {user?.role === "petowner" && (
        <div className="bg-gray-50 p-4 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-2">
            {rating ? "Edit Your Review" : "Leave a Review"}
          </h3>

          <StarRating value={rating} onChange={setRating} size={26} />

          <textarea
            className="w-full border rounded-xl p-2 mt-3"
            rows="3"
            placeholder="Write your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-3 bg-[#183D8B] hover:bg-[#0f2a63] text-white px-4 py-2 rounded-xl transition"
          >
            {submitting ? "Saving..." : "Submit Review"}
          </button>
        </div>
      )}

      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-4 rounded-2xl shadow-sm border"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">{review.user?.name}</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={16}
                    color={
                      star <= review.rating
                        ? "#FFC107"
                        : "#E4E5E9"
                    }
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-700 mt-2">{review.comment}</p>

            {user?._id === review.user?._id && (
              <p className="text-xs text-blue-600 mt-1">
                (Your review)
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
