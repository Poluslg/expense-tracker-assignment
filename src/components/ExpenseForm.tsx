"use client";

import { CATEGORIES, Expense } from "@/lib/data";
import { useState } from "react";
import styles from "./ExpenseForm.module.css";

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
    
    console.log("adding expense", description, amount);

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
    <div className={styles.formContainer}>
      <div style={{ height: 28 }} className={styles.errorWrapper}>
        <p>{errorMessage}</p>
      </div>
      <form className={styles.formWrapper} onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="What did you spend on?"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${styles.inputField} ${styles.fullWidth}`}
        />

        <div className={styles.inputGroup}>
          <input
            type="number"
            required
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`${styles.inputField} ${styles.amountInput}`}
          />
          <select
            required
            className={`${styles.inputField} ${styles.categoryInput}`}
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
          <button type="submit" className={styles.addButton}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
