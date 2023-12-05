import { render, screen } from "@testing-library/react";

import HistoryItem from "./HistoryItem";

describe("HistoryItem Component", () => {
  const mockProps = {
    name: "Sample Name",
    author: "Sample Author",
    date: "2023-11-28",
    status: "Completed",
  };

  it("renders HistoryItem component with provided props", () => {
    render(<HistoryItem {...mockProps} />);

    const nameElement = screen.getByText("Sample Name");
    const authorElement = screen.getByText("Sample Author");
    const dateElement = screen.getByText("2023-11-28");
    const statusElement = screen.getByText("Completed");

    expect(nameElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
  });

  it("renders HistoryItem Skeleton component", () => {
    render(<HistoryItem.Skeleton />);

    const skeletonElement = screen.getByTestId("skeleton-component");

    expect(skeletonElement).toBeInTheDocument();
    // Add more assertions for skeleton loading state if required
  });
});
