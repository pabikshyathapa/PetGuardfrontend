// src/pages/petowner/FavoritesPage.jsx

import { useEffect } from "react";
import { useFavorites } from "../../components/petowner/favoritescontext";
import ShelterCard from "../../components/petowner/browseSheltercard";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, loading, error, loadFavorites, getFavoriteCount } =
    useFavorites();

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#F3F1EE] flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="animate-spin text-[#183D8B] text-5xl mx-auto mb-4" />
            <p className="text-[#183D8B] font-semibold text-lg">
              Loading your favorites...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#F3F1EE] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="font-bold text-xl text-[#183D8B] mb-2">
                Error Loading Favorites
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={loadFavorites}
                className="px-6 py-3 bg-[#183D8B] text-white rounded-xl font-semibold hover:bg-[#122e6b] transition-all hover:shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
  <>
  <Header />
  <div className="min-h-screen bg-[#F3F1EE]">
    <div className="bg-[#183D8B] text-white pt-20 pb-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Favourites {getFavoriteCount() > 0 && `(${getFavoriteCount()})`}
        </h1>
      </div>
    </div>


        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Empty State */}
          {favorites.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
              <div className="mb-6">
                <FaHeart className="text-gray-300 text-7xl mx-auto mb-4" />
              </div>
              <h3 className="text-3xl font-bold text-[#183D8B] mb-3">
                No Favorites Yet
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Start exploring shelters and click the{" "}
                <FaHeart className="inline text-red-500 mx-1" /> icon to save
                your favorites here
              </p>
              <button
                onClick={() => navigate("/browse-shelters")}
                className="px-8 py-4 bg-[#183D8B] text-white rounded-xl font-semibold text-lg hover:bg-[#122e6b] transition-all hover:shadow-xl transform hover:scale-105"
              >
                Browse Shelters
              </button>
            </div>
          ) : (
            <>
              {/* Info Banner */}
              <div className="bg-blue-50 border-l-4 border-[#183D8B] p-4 rounded-lg mb-6">
                <p className="text-[#183D8B] font-medium">
                  💡 Click on any shelter card to view details, or click the
                  heart to remove from favorites
                </p>
              </div>

              {/* Favorites Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((shelter) => (
                  <ShelterCard key={shelter._id} shelter={shelter} />
                ))}
              </div>
            </>
          )}

          {/* Back Button */}
          {favorites.length > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/browseshelter")}
                className="px-6 py-3 bg-white text-[#183D8B] border-2 border-[#183D8B] rounded-xl font-semibold hover:bg-[#183D8B] hover:text-white transition-all"
              >
                ← Browse More Shelters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}