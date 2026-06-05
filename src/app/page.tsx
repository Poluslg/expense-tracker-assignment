"use client";

import { useState, useMemo } from "react";
import { SEED, Expense } from "@/lib/data";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseLists from "@/components/ExpenseLists";
import { formatCurrency } from "@/lib/formatCurrency";

type SortOption = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

export default function Daybook() {
  const [expenses, setExpenses] = useState<Expense[]>(SEED);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  const processedExpenses = useMemo(() => {
    // 1. First, filter by the search query
    let result = expenses.filter((e) =>
      e.description.toLowerCase().includes(query.toLowerCase()),
    );

    // 2. Then, sort the filtered results
    result = result.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "amount-asc":
          return a.amount - b.amount;
        case "amount-desc":
          return b.amount - a.amount;
        default:
          return 0;
      }
    });

    return result;
  }, [expenses, query, sortBy]);

  const total = processedExpenses.reduce((sum, e) => sum + e.amount, 0);

  function deleteExpense(id: number) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  function handleAddExpense(newExpense: Expense) {
    setExpenses([...expenses, newExpense]);
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 80px" }}>
      <h1
        className="serif"
        style={{ fontSize: 34, margin: 0, letterSpacing: "-0.01em" }}
      >
        Daybook
      </h1>
      <p style={{ color: "var(--muted)", marginTop: 6, marginBottom: 28 }}>
        Track your daily spending
      </p>

      {/* Add form */}
      <ExpenseForm onAdd={handleAddExpense} />

      {/* Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: 28,
          marginBottom: 14,
        }}
      >
        <div style={{ fontSize: 14, color: "var(--muted)" }}>
          {processedExpenses.length} {query ? "results" : "expenses"}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>
          Total: {formatCurrency(total)}
        </div>
      </div>

      {/* Search */}
      <label htmlFor="search" className="sr-only">
        Search expenses
      </label>
      <input
        id="search"
        placeholder="Search expenses"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: "10px 13px",
          fontSize: 14,
          color: "var(--ink)",
          marginBottom: 16,
        }}
      />

      {/* Sort */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-ink">Transactions</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="bg-card border border-line rounded-lg px-3 py-1.5 text-sm text-ink outline-none focus:border-gray-400 cursor-pointer"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      {/* List */}
      <ExpenseLists expenses={processedExpenses} onDelete={deleteExpense} />
    </div>
  );
}
