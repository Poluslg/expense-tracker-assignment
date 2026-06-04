"use client";

import { useState, useMemo } from "react";
import { SEED, Expense } from "@/lib/data";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseLists from "@/components/ExpenseLists";
import { formatCurrency } from "@/lib/formatCurrency";

export default function Daybook() {
  const [expenses, setExpenses] = useState<Expense[]>(SEED);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      expenses.filter((e) =>
        e.description.toLowerCase().includes(query.toLowerCase()),
      ),
    [expenses, query],
  );

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

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
          {filtered.length} {query ? "results" : "expenses"}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>
          Total: {formatCurrency(total)}
        </div>
      </div>

      {/* Search */}
      <label htmlFor="search" className="sr-only">Search expenses</label>
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

      {/* List */}
      <ExpenseLists
        expenses={filtered}
        onDelete={deleteExpense}
      />
    </div>
  );
}
