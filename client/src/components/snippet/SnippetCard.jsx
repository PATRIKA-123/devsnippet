import  SyntaxHighlighter  from "react-syntax-highlighter/dist/esm/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Star, Trash2, Copy, Share2 } from "lucide-react";
import { useToggleFavorite, useDeleteSnippet, useUpdateSnippet } from "../../hooks/useSnippets";

function SnippetCard({ snippet }) {
  const toggleFavorite = useToggleFavorite();
  const deleteSnippet = useDeleteSnippet();


  const updateSnippet = useUpdateSnippet();

const handleShare = () => {
  if (snippet.isPublic) {
    const url = `${window.location.origin}/share/${snippet.shareId}`;
    navigator.clipboard.writeText(url);
    alert("Public link copied to clipboard!");
  } else {
    updateSnippet.mutate(
      { id: snippet._id, data: { isPublic: true } },
      {
        onSuccess: (res) => {
          const url = `${window.location.origin}/share/${res.data.snippet.shareId}`;
          navigator.clipboard.writeText(url);
          alert("Snippet made public! Link copied to clipboard.");
        },
      }
    );
  }
};
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
  };

  const handleDelete = () => {
    if (confirm("Delete this snippet?")) {
      deleteSnippet.mutate(snippet._id);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 flex flex-col gap-3 border border-gray-700 hover:border-gray-600 transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-semibold">{snippet.title}</h3>
          <span className="text-xs text-blue-400 uppercase">{snippet.language}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toggleFavorite.mutate(snippet._id)}>
            <Star
              size={18}
              className={snippet.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}
            />
          </button>
          <button onClick={handleCopy}>
            <Copy size={18} className="text-gray-400 hover:text-white" />
          </button>
             <button onClick={handleShare}>
        <Share2 size={18} className={snippet.isPublic ? "text-green-400" : "text-gray-400 hover:text-white"} />
       </button>
          <button onClick={handleDelete}>
            <Trash2 size={18} className="text-gray-400 hover:text-red-400" />
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        language={snippet.language}
        style={oneDark}
        customStyle={{ borderRadius: "8px", fontSize: "13px", maxHeight: "150px" }}
      >
        {snippet.code}
      </SyntaxHighlighter>

      <div className="flex flex-wrap gap-2">
        {snippet.tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SnippetCard;