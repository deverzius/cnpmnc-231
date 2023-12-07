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
      result: [
        {
          "id": 10,
          "title": "Leave Request 10",
          "reason": "Reason 10",
          "description": "Description 10",
          "status": "pending",
          "confirmMessage": "",
          "createdAt": "2023-11-28T08:57:16.172Z",
          "updatedAt": "2023-11-28T08:57:16.172Z",
          "userId": 2,
          "leaveDays": [
            "2023-10-10"
          ]
        },
        {
          "id": 25,
          "title": "aaaaaaaaaaaaa",
          "reason": "aaaaaaaaaaaaaaaaaaa",
          "description": "",
          "status": "approved",
          "confirmMessage": null,
          "createdAt": "2023-11-30T07:33:39.631Z",
          "updatedAt": "2023-12-03T03:36:15.797Z",
          "userId": 2,
          "leaveDays": [
            "2023-12-02",
            "2023-12-03"
          ]
        },
        {
          "id": 26,
          "title": "aaaaaaaaaaaaa",
          "reason": "aaaaaaaaaaaaaaaaaaa",
          "description": "",
          "status": "rejected",
          "confirmMessage": null,
          "createdAt": "2023-11-30T07:33:39.631Z",
          "updatedAt": "2023-12-03T03:36:15.797Z",
          "userId": 2,
          "leaveDays": [
            "2023-12-02",
            "2023-12-03"
          ]
        },
      ]
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
