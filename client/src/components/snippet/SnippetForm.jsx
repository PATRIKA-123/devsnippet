import { useState } from "react";
import { useCreateSnippet } from "../../hooks/useSnippets";

const LANGUAGES = ["javascript", "python", "java", "cpp", "html", "css", "sql", "typescript", "go", "rust"];

function SnippetForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [tags, setTags] = useState("");

  const createSnippet = useCreateSnippet();

  const handleSubmit = (e) => {
    e.preventDefault();
    createSnippet.mutate(
      {
        title,
        code,
        language,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold text-white mb-4">New Snippet</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
            required
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <textarea
            placeholder="Paste your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none font-mono text-sm"
            required
          />
          <input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
          />
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-300 hover:text-white">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Save Snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SnippetForm;