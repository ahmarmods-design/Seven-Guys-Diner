import { useState, useRef } from "react";
import { Download, Upload, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { cmsSave } from "../lib/api";

const CMS_KEYS = ["deals","menu","categories","branches","business_hours","gallery","reviews","homepage","website","delivery"];

export function BackupRestore() {
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<"idle"|"success"|"error">("idle");
  const [importError, setImportError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res  = await fetch("/api/cms");
      const json = await res.json();
      const blob = new Blob([JSON.stringify(json.data, null, 2)], { type: "application/json" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `seven-guys-cms-backup-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setLastBackup(new Date().toLocaleString());
    } catch {
      alert("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportStatus("idle");
    try {
      const text = await file.text();
      const data = JSON.parse(text) as Record<string, unknown>;
      const keys = Object.keys(data).filter(k => CMS_KEYS.includes(k));
      if (keys.length === 0) throw new Error("No valid CMS keys found in file.");
      for (const key of keys) {
        await cmsSave(key, data[key]);
      }
      setImportStatus("success");
    } catch (err) {
      setImportStatus("error");
      setImportError(err instanceof Error ? err.message : "Invalid backup file.");
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="pb-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Backup &amp; Restore</h1>
        <p className="text-muted-foreground text-sm mt-1">Export all CMS data as a JSON file, or restore from a previous backup.</p>
      </div>

      {/* Export */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Download size={20}/>
          </div>
          <div>
            <h2 className="font-heading font-bold text-[#0A2612]">Export Backup</h2>
            <p className="text-sm text-gray-500 mt-1">Download all your CMS data — menu items, deals, branches, reviews, settings — as a JSON file.</p>
          </div>
        </div>
        {lastBackup && (
          <p className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-emerald-500"/> Last export: {lastBackup}
          </p>
        )}
        <button onClick={handleExport} disabled={exporting}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0A2612] text-white rounded-xl text-sm font-bold hover:bg-[#0d3318] disabled:opacity-50 transition-colors">
          {exporting ? <RefreshCw size={15} className="animate-spin"/> : <Download size={15}/>}
          {exporting ? "Preparing…" : "Download Backup"}
        </button>
      </div>

      {/* Import */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Upload size={20}/>
          </div>
          <div>
            <h2 className="font-heading font-bold text-[#0A2612]">Restore from Backup</h2>
            <p className="text-sm text-gray-500 mt-1">Upload a previously exported JSON file to restore your CMS data. This will overwrite all current settings.</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2 mb-4">
          <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5"/>
          <p className="text-xs text-amber-700 font-medium">Importing will immediately replace all current CMS data. Make sure you export a backup first.</p>
        </div>

        {importStatus === "success" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2 mb-4">
            <CheckCircle2 size={15} className="text-emerald-600"/>
            <p className="text-xs text-emerald-700 font-semibold">Backup restored successfully. Refresh the page to see changes.</p>
          </div>
        )}
        {importStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2 mb-4">
            <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5"/>
            <p className="text-xs text-red-600 font-medium">{importError}</p>
          </div>
        )}

        <label className={`flex items-center gap-2 px-5 py-2.5 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#0A2612]/40 hover:bg-gray-50 text-sm font-semibold text-gray-500 w-fit transition-colors ${importing ? "opacity-60 pointer-events-none" : ""}`}>
          {importing ? <RefreshCw size={15} className="animate-spin"/> : <Upload size={15}/>}
          {importing ? "Importing…" : "Choose Backup File"}
          <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden"/>
        </label>
      </div>

      {/* Info */}
      <div className="bg-[#0A2612]/4 rounded-2xl p-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What's included in a backup</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
          {["Menu Items","Deals & Offers","Categories","Branch Details","Business Hours","Gallery Images","Customer Reviews","Homepage Content","Website Settings","Delivery Settings"].map(item => (
            <p key={item} className="text-xs text-gray-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary/60 shrink-0"/>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
