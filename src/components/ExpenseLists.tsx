import { Expense } from "@/lib/data";
import { formatDate } from "@/lib/formatDate";
import { DeleteDialog } from "./common/DeleteDialog";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/formatCurrency";

export default function ExpenseLists({
  expenses,
  query,
  onDelete,
}: {
  expenses: Expense[];
  query: string;
  onDelete: (id: number) => void;
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const filtered = useMemo(
    () =>
      expenses.filter((e) =>
        e.description.toLowerCase().includes(query.toLowerCase()),
      ),
    [expenses, query],
  );

  return (
    <div>
      {filtered.length > 0 ? (
        filtered.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-3 bg-card border border-line rounded-xl px-4 py-3 mb-2.5"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-semibold">{e.description}</div>
              <div className="text-[12.5px] text-muted mt-1">
                {formatDate(e.date)}
              </div>
            </div>
            <span className="text-xs bg-chip text-ink rounded-full px-2.5 py-1">
              {e.category}
            </span>
            <div className="text-[15px] font-bold w-17.5 text-right">
              {formatCurrency(e.amount)}
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedExpense(e);
                setDeleteDialogOpen(true);
              }}
              className="cursor-pointer text-muted hover:text-error text-base px-0.5 py-1.5 "
            >
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-muted mt-10">No expenses found.</p>
      )}

      <DeleteDialog
        onConfirm={() => {
          if (selectedExpense) {
            onDelete(selectedExpense.id);
          }
        }}
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedExpense(null);
        }}
        title="Delete Expense"
        itemText={selectedExpense ? `"${selectedExpense.description}"` : ""}
      />
    </div>
  );
}
