import React from "react";

function Pagination({ tasksPerPage, totalTasks, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul style={{ listStyle: "none", display: "flex", justifyContent: "center" }}>
        {pageNumbers.map((number) => (
          <li key={number} style={{ margin: "0 5px" }}>
            <button onClick={() => paginate(number)} style={{ cursor: "pointer" }}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
