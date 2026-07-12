import { useSnippets } from "../hooks/useSnippets";
import SnippetCard from "../components/snippet/SnippetCard";
import { AnimatePresence } from "framer-motion";

function Favorites() {
  const { data: snippets, isLoading } = useSnippets();
  const favorites = snippets?.filter((s) => s.isFavorite) || [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Favorites</h1>

      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : favorites.length === 0 ? (
        <p className="text-gray-400">No favorites yet. Star a snippet to see it here.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {favorites.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Favorites;