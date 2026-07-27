import { useState, useRef } from "react";
import { Upload, Link, X } from "lucide-react";
import { uploadFile } from "../lib/api";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUploader({ value, onChange, label, className = "" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value.startsWith("/api/") || value.startsWith("http") ? "" : "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>}

      {/* Preview */}
      {value && (
        <div className="relative inline-block">
          <img src={value} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-gray-200" />
          <button
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
          >
            <X size={11} />
          </button>
        </div>
      )}

      {/* Tab switcher */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit text-xs font-semibold">
        <button
          onClick={() => setTab("upload")}
          className={`px-3 py-1.5 flex items-center gap-1 transition-colors ${tab === "upload" ? "bg-[#0A2612] text-white" : "text-gray-500 hover:bg-gray-50"}`}
        >
          <Upload size={12} /> Upload
        </button>
        <button
          onClick={() => setTab("url")}
          className={`px-3 py-1.5 flex items-center gap-1 transition-colors ${tab === "url" ? "bg-[#0A2612] text-white" : "text-gray-500 hover:bg-gray-50"}`}
        >
          <Link size={12} /> URL
        </button>
      </div>

      {tab === "upload" && (
        <label className={`flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#0A2612]/40 hover:bg-gray-50 transition-colors text-sm text-gray-500 w-fit ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
          {uploading ? "Uploading…" : "Choose an image file"}
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      )}

      {tab === "url" && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20"
          />
          <button
            onClick={() => { if (urlInput.trim()) onChange(urlInput.trim()); }}
            className="px-3 py-2 bg-[#0A2612] text-white text-sm rounded-xl hover:bg-[#0d3318] font-semibold"
          >
            Set
          </button>
        </div>
      )}
    </div>
  );
}
