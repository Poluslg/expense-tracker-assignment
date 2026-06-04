import { Expense } from "@/lib/data";
import { useState } from "react";

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  function addExpense() {
    console.log("adding expense", description, amount);
    if (!description || !amount || !category) {
      alert("Please fill in all fields");
      return;
    }
    const newExpense: Expense = {
      id: Date.now(),
      description: description,
      amount: parseFloat(amount),
      category: category,
      date: new Date().toISOString(),
    };

    onAdd(newExpense);
    setDescription("");
    setAmount("");
    setCategory("");
  }
  return (
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
  );
}
