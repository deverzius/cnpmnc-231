import { render, screen, waitFor } from "@testing-library/react";
import Marketplace from ".";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import UserApi from "api/user";

jest.mock("api/employee", () => ({
  ListRequest: jest.fn().mockResolvedValueOnce({
    data: {
      data: {
        pending: [],
        approved: [],
        rejected: [],
      },
    },
  }),
}));

jest.mock("api/user", () => ({
  getInfo: jest.fn().mockResolvedValue({
    data: {
      user: {
        remaindingLeaveDays: 10,
      },
    },
  }),
}));

describe("Marketplace component", () => {
  beforeEach(() => {
    const user = {
      id: 7,
      email: "tai@gmail.com",
      token: "Your token here",
      role: "Employee",
    };
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockReturnValue(JSON.stringify(user)),
      },
      writable: true,
    });
    let queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Marketplace />
      </QueryClientProvider>
    );
  });

  it("renders Marketplace component with fetched data", async () => {
    // Ensure that specific elements are rendered
    expect(screen.getByText("Recently Added")).toBeInTheDocument();
    expect(screen.getByText("Remain days")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();

    // await waitFor(() => {
    //   expect(UserApi.getInfo).toHaveBeenCalledTimes(1);
    //   expect(screen.getByText(/10 days/i)).toBeInTheDocument();
    // });
  });

  it("renders Marketplace component with loading state", async () => {
    const { getByTestId } = screen;

    expect(getByTestId("skeleton-component")).toBeInTheDocument();
  });
});
