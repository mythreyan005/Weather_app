import { useState } from "react";

function DateSearch({ onSearch }) {
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date) onSearch(date);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Search By Date</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Get Weather</button>
    </form>
  );
}

export default DateSearch;