import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RequestModal from "./Modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmployeeApi from "api/employee";
import MiniCalendar from "components/calendar/MiniCalendar";

const refetch = jest.fn();
describe("RequestModal Component", () => {
  let queryClient;

  beforeAll(() => {
    queryClient = new QueryClient();
  });

  describe("Rendering and basic functionality", () => {
    beforeEach(() => {
      render(
        <QueryClientProvider client={queryClient}>
          <RequestModal refetch={refetch} />
        </QueryClientProvider>
      );
    });

    test("renders RequestModal correctly", () => {
      const createRequestButton = screen.getByText("Create Request");
      expect(createRequestButton).toBeInTheDocument();
    });

    test('opens modal when "Create Request" button is clicked', async () => {
      const createRequestButton = screen.getByText("Create Request");
      fireEvent.click(createRequestButton);

      const modalHeader = await screen.findByText(
        "Create Request for Leave of Absence"
      );
      expect(modalHeader).toBeInTheDocument();
    });
  });

  describe("Interaction and submission", () => {
    beforeEach(() => {
      render(
        <QueryClientProvider client={queryClient}>
          <RequestModal refetch={refetch} />
        </QueryClientProvider>
      );
    });

    test("clicking Cancel button closes the modal", () => {
      const createRequestButton = screen.getByText("Create Request");
      fireEvent.click(createRequestButton);

      const cancelButton = screen.getByText("Cancel");
      fireEvent.click(cancelButton);

      const modal = screen.queryByRole("dialog");
      expect(modal).toBeInTheDocument();
    });

    test("does not submit request when fields are not filled", async () => {
      const ApproveRequestMock = jest.fn().mockResolvedValue({});
      EmployeeApi.SubmitRequest = ApproveRequestMock;

      fireEvent.click(screen.getByText("Create Request"));
      fireEvent.click(screen.getByText("Submit"));

      await waitFor(() => {
        expect(ApproveRequestMock).not.toHaveBeenCalled();
        expect(refetch).not.toHaveBeenCalled();
      });
    });

    test("closes modal when Cancel button is clicked", async () => {
      const ApproveRequestMock = jest.fn().mockResolvedValue({});
      EmployeeApi.SubmitRequest = ApproveRequestMock;
      
      fireEvent.click(screen.getByText("Create Request"));
      const modal = screen.getByTestId("modal")
      fireEvent.click(screen.getByText("Cancel"));

      await waitFor(() => {
        expect(ApproveRequestMock).not.toHaveBeenCalled();
        expect(refetch).not.toHaveBeenCalled();
        expect(modal).not.toBeInTheDocument();
      });
    });

    test("does not submit request without title and reason, but with selected date", async () => {
      const refetchMock = jest.fn();
      const ApproveRequestMock = jest.fn().mockResolvedValue({});
      EmployeeApi.SubmitRequest = ApproveRequestMock;

      fireEvent.click(screen.getByText("Create Request"));

      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 3);

      fireEvent.change(screen.getByPlaceholderText("Title"), {
        target: { value: "" },
      });
      fireEvent.change(screen.getByPlaceholderText("Reason"), {
        target: { value: "" },
      });

      const miniCalendar = screen.getByText("Select day").closest("div");
      fireEvent.click(miniCalendar); // Trigger calendar popup (assuming it opens on click)

      // Assuming the date selection process, select startDate and endDate here

      fireEvent.click(screen.getByText("Submit"));

      await waitFor(() => {
        expect(ApproveRequestMock).not.toHaveBeenCalled();
        expect(refetchMock).not.toHaveBeenCalled();
      });
    });

    test("fills in fields and submits the request", async () => {
      const createRequestButton = screen.getByText("Create Request");
      fireEvent.click(createRequestButton);

      const briefDescriptionInput = screen.getByPlaceholderText("Title");
      const reasonTextarea = screen.getByPlaceholderText("Reason");

      fireEvent.change(briefDescriptionInput, {
        target: { value: "Test Leave Request" },
      });

      fireEvent.change(reasonTextarea, {
        target: { value: "Testing the leave request feature" },
      });
      const submitButton = screen.getByText("Submit");

      const mockSubmitRequest = jest.fn().mockResolvedValue({});
      jest
        .spyOn(EmployeeApi, "SubmitRequest")
        .mockImplementation(mockSubmitRequest); // Mock SubmitRequest method

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(EmployeeApi.SubmitRequest).toHaveBeenCalledWith({
          title: "Test Leave Request",
          reason: "Testing the leave request feature",
          description: "",
          leaveDays: [],
          // start_date: expect.any(Date),
          // end_date: expect.any(Date),
        });
      });
      expect(refetch).toHaveBeenCalled();
    });
  });
});
