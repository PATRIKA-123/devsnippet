import { useSnippets } from "../hooks/useSnippets";
import SnippetCard from "../components/snippet/SnippetCard";
import { AnimatePresence } from "framer-motion";

function RecentlyUsed() {
  const { data: snippets, isLoading } = useSnippets();
  const recent = [...(snippets || [])]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 9);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Recently Used</h1>

      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : recent.length === 0 ? (
        <p className="text-gray-400">No snippets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {recent.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default RecentlyUsed;