import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { BRANCHES, type BranchEntry } from "@/lib/whatsapp";

interface BranchContextValue {
  /** The branch the user last confirmed — persisted in sessionStorage. */
  selectedBranch: BranchEntry | null;
  setSelectedBranch: (branch: BranchEntry) => void;
  /**
   * Call this from any "Order" button instead of a direct wa.me link.
   * If a branch is already selected the picker will pre-select it;
   * the user can confirm instantly or change it.
   */
  openOrderModal: (message: string) => void;
  // ── consumed by BranchPickerModal only ──────────────────────────────
  modalOpen: boolean;
  pendingMessage: string;
  closeModal: () => void;
}

const BranchContext = createContext<BranchContextValue | null>(null);

const SESSION_KEY = "sg_selected_branch_id";

function readStoredBranch(): BranchEntry | null {
  try {
    const id = sessionStorage.getItem(SESSION_KEY);
    return BRANCHES.find((b) => b.id === id) ?? null;
  } catch {
    return null;
  }
}

export function BranchProvider({ children }: { children: ReactNode }) {
  const [selectedBranch, setSelectedBranchState] = useState<BranchEntry | null>(
    readStoredBranch
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");

  const setSelectedBranch = useCallback((branch: BranchEntry) => {
    setSelectedBranchState(branch);
    try {
      sessionStorage.setItem(SESSION_KEY, branch.id);
    } catch {
      // sessionStorage unavailable — continue without persistence
    }
  }, []);

  const openOrderModal = useCallback((message: string) => {
    setPendingMessage(message);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setPendingMessage("");
  }, []);

  return (
    <BranchContext.Provider
      value={{
        selectedBranch,
        setSelectedBranch,
        openOrderModal,
        modalOpen,
        pendingMessage,
        closeModal,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch(): BranchContextValue {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used inside <BranchProvider>");
  return ctx;
}
