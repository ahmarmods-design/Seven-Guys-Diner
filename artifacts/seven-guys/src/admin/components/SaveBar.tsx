import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface SaveBarProps {
  status: SaveStatus;
  isDirty: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function SaveBar({ status, isDirty, onSave, onCancel }: SaveBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-gray-200 px-4 md:px-8 py-3 flex items-center justify-between z-40 shadow-lg">
      <div className="text-sm">
        {status === "saving" && (
          <span className="text-gray-500 flex items-center gap-2">
            <Loader2 size={15} className="animate-spin" /> Saving…
          </span>
        )}
        {status === "saved" && (
          <span className="text-emerald-600 font-semibold flex items-center gap-2">
            <CheckCircle2 size={15} /> Changes Saved Successfully
          </span>
        )}
        {status === "error" && (
          <span className="text-red-500 font-semibold flex items-center gap-2">
            <AlertCircle size={15} /> Failed to save. Please try again.
          </span>
        )}
        {status === "idle" && isDirty && (
          <span className="text-amber-600">You have unsaved changes</span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          disabled={status === "saving"}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={status === "saving" || !isDirty}
          className="px-5 py-2 bg-[#0A2612] text-white rounded-xl text-sm font-bold hover:bg-[#0d3318] disabled:opacity-40 flex items-center gap-2 transition-colors"
        >
          {status === "saving" && <Loader2 size={13} className="animate-spin" />}
          Save Changes
        </button>
      </div>
    </div>
  );
}
