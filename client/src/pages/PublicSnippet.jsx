import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function PublicSnippet() {
  const { shareId } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/public/${shareId}`)
      .then((res) => setSnippet(res.data.snippet))
      .catch(() => setError("Snippet not found or is private."));
  }, [shareId]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-white mb-1">{snippet.title}</h1>
        <p className="text-blue-400 text-sm uppercase mb-4">{snippet.language}</p>
        <SyntaxHighlighter
          language={snippet.language}
          style={oneDark}
          customStyle={{ borderRadius: "8px", fontSize: "14px" }}
        >
          {snippet.code}
        </SyntaxHighlighter>
        <div className="flex flex-wrap gap-2 mt-4">
          {snippet.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-gray-500 text-xs mt-6">Shared via DevSnippets</p>
      </div>
    </div>
  );
}

export default PublicSnippet;