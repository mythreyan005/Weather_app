import { useState } from "react";

function MonthSearch({ onSearch }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (year && month) onSearch(year, month);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Monthly Temperature Stats</h3>
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="number"
        placeholder="Month (1-12)"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <button type="submit">Get Stats</button>
    </form>
  );
}

export default MonthSearch;