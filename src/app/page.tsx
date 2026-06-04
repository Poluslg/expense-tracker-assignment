"use client";

import { useState } from "react";
import { SEED, Expense } from "@/lib/data";
import { formatDate } from "@/lib/formatDate";

export default function Daybook() {
  const [expenses, setExpenses] = useState<Expense[]>(SEED);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  function addExpense() {
    console.log("adding expense", description, amount);
    const newExpense: Expense = {
      id: Date.now(),
      description: description,
      amount: parseFloat(amount),
      category: category,
      date: new Date().toISOString(),
    };
    expenses.push(newExpense);
    setExpenses(expenses);
  }

  function deleteExpense(id: number) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  const filtered = expenses.filter((e) => e.description.includes(query));
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 80px" }}>
      <h1 className="serif" style={{ fontSize: 34, margin: 0, letterSpacing: "-0.01em" }}>
        Daybook
      </h1>
      <p style={{ color: "var(--muted)", marginTop: 6, marginBottom: 28 }}>
        Track your daily spending
      </p>

      {/* Add form */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: 14,
          padding: 18,
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        <input
          placeholder="What did you spend on?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            background: "var(--bg)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            padding: "11px 13px",
            fontSize: 15,
            color: "var(--ink)",
          }}
        />
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: 130,
              background: "var(--bg)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: "11px 13px",
              fontSize: 15,
              color: "var(--ink)",
            }}
          />
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              flex: 1,
              background: "var(--bg)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: "11px 13px",
              fontSize: 15,
              color: "var(--ink)",
            }}
          />
          <button
            onClick={addExpense}
            style={{
              background: "var(--accent)",
              color: "var(--accent-ink)",
              borderRadius: 10,
              padding: "11px 20px",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Add
          </button>
        </div>
      </div>

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
          {expenses.length} expenses
        </div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Total: {total}</div>
      </div>

      {/* Search */}
      <input
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
      <div>
        {filtered.map((e, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: "13px 15px",
              marginBottom: 10,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{e.description}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>
                {formatDate(e.date)}
              </div>
            </div>
            <span
              style={{
                fontSize: 12,
                background: "var(--chip)",
                borderRadius: 20,
                padding: "3px 10px",
                color: "var(--ink)",
              }}
            >
              {e.category}
            </span>
            <div style={{ fontSize: 15, fontWeight: 700, width: 70, textAlign: "right" }}>
              {e.amount}
            </div>
            <button
              onClick={() => deleteExpense(e.id)}
              style={{
                background: "transparent",
                color: "var(--muted)",
                fontSize: 18,
                lineHeight: 1,
                padding: "2px 6px",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
