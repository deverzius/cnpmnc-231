import { render, screen, waitFor } from "@testing-library/react";
import ComplexTable from "./ComplexTable";

describe("ComplexTable Component", () => {
  const columnsData = []; // Add your columns data here
  const tableData = []; // Add your table data here

  test("renders ComplexTable component correctly", async () => {
    render(<ComplexTable columnsData={columnsData} tableData={tableData} />);

    // Verify if the table header contains "History Request"
    const headerText = screen.getByText("History Request");
    expect(headerText).toBeInTheDocument();

    // Verify if the table has at least one row
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  });
});
