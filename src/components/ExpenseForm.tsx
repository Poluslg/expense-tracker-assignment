"use client";

import { CATEGORIES, Expense } from "@/lib/data";
import { useState } from "react";

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleAddExpense(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!description.trim() || !category) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setErrorMessage("The amount should be greater than 0");
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      description: description.trim(),
      amount: Number(amount),
      category: category,
      date: new Date().toISOString(),
    };

    onAdd(newExpense);
    setDescription("");
    setAmount("");
    setCategory("");
    setErrorMessage("");
  }

  return (
    <div className="bg-card border border-line rounded-[14px] p-4.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="flex justify-center items-center min-h-7">
        <p className="text-error text-center text-sm font-medium m-0">
          {errorMessage}
        </p>
      </div>
      <form className="flex flex-col gap-2.5" onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="What did you spend on?"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-bg border border-line rounded-[10px] px-3.25 py-2.75 text-[15px] text-ink outline-none focus:border-gray-400"
        />

        <div className="flex flex-col min-[500px]:flex-row gap-2.5 mt-2.5">
          <input
            type="number"
            required
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full min-[500px]:w-32.5 bg-bg border border-line rounded-[10px] px-3.25 py-2.75 text-[15px] text-ink outline-none focus:border-gray-400"
          />
          <select
            required
            className="flex-1 cursor-pointer bg-bg border border-line rounded-[10px] px-3.25 py-2.75 text-[15px] text-ink outline-none focus:border-gray-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-accent text-accent-ink rounded-[10px] px-5 py-2.75 text-[15px] font-semibold transition-opacity hover:opacity-90"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
