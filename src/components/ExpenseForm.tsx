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
        <label
          htmlFor="description"
          className="text-xs font-medium text-muted mb-1 block"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="What did you spend on?"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-12 bg-bg border border-line rounded-[10px] px-3.25 py-2.75 text-[15px] text-ink outline-none focus:border-gray-400"
        />

        <div className="flex flex-col items-center sm:flex-row gap-2.5 mt-2.5">
          <div className="flex flex-col sm:flex-row w-full">
            <div className="flex flex-col gap-1 sm:w-36 w-full">
              <label
                htmlFor="amount"
                className="text-xs font-medium text-muted"
              >
                Amount
              </label>
              <input
                id="amount"
                type="number"
                required
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                min={0.01}
                step="0.01"
                className="w-full h-12 sm:w-32.5 bg-bg border border-line rounded-[10px] px-3.25 py-2.75 text-[15px] text-ink outline-none focus:border-gray-400"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1  w-full">
              <label
                htmlFor="category"
                className="text-xs font-medium text-muted"
              >
                Category
              </label>
              <select
                id="category"
                required
                className="w-full h-12 cursor-pointer bg-bg border border-line rounded-[10px] px-3.25 py-2.75 text-[15px] text-ink outline-none focus:border-gray-400"
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
            </div>
          </div>

          <button
            type="submit"
            className="sm:w-20 w-full h-12 mt-5 bg-accent  text-accent-ink rounded-[10px] px-5 py-2.75 text-[15px] font-semibold transition-opacity hover:opacity-90"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
