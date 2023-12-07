import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchBar } from "./SearchBar";
import ManageApi from "api/management";
import axios from "api";
import { useHistory, MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";


jest.mock("api/management", () => {
	const ManageApi = {
		ListRequest: () => Promise.resolve(
			{
				data: {
					result: [
						{
							"id": 1,
							"title": "Xin nghi phep",
							"reason": "Bi sot",
							"leaveDays": ['2023-10-26', '2023-11-25']
						},
						{
							"id": 2,
							"title": "Xin phep di cong tac",
							"reason": "Di cong tac tai Ha Noi",
							"leaveDays": ['2023-11-20', '2023-11-25']
						},
						{
							"id": 3,
							"title": "Nghi tham nguoi om",
							"reason": "Nghi tham nguoi om nam vien",
							"leaveDays": ['2023-11-20', '2023-12-25']
						},
						{
							"id": 4,
							"title": "Du lich",
							"reason": "Di du lich tai Da Nang",
							"leaveDays": ['2024-01-01', '2024-01-02']
						},
						{
							"id": 5,
							"title": "Xin di kham",
							"reason": "Bi cam cum, dau dau",
							"leaveDays": ['2024-12-01', '2024-12-02']
						}
					]
				},
			}
		),
		getRequest: () => Promise.resolve(
			{
				data: {
					result:
					{
						"id": 4,
						"title": "Du lich",
						"reason": "Di du lich tai Da Nang",
						"leaveDays": ['2024-01-01', '2024-01-02']
					},
				},
			}
		)
	}

	return ManageApi;
});
const mockfn = jest.fn();
jest.mock('react-router-dom/cjs/react-router-dom.min', () => {
	return {
		...jest.requireActual('react-router-dom'),
		useHistory: () => {
			return {
				push: mockfn,
			};
		},
	};
});

describe("SearchBar Component", () => {
	let queryClient;

	beforeAll(() => {
		queryClient = new QueryClient();
	});

	describe("Render test", () => {
		beforeEach(() => {
			render(
				<QueryClientProvider client={queryClient}>
					<SearchBar />
				</QueryClientProvider>
			);
		});

		test("Render SearchBar", () => {
			const searchBar = screen.getByPlaceholderText("Search...");
			expect(searchBar).toBeInTheDocument();
		});

		test("Display the results box when a value is input", async () => {
			fireEvent.change(screen.getByPlaceholderText("Search..."), {
				target: { value: "a" },
			});

			const searchResults = screen.getByTestId("search-results");

			await waitFor(() => {
				expect(searchResults).toBeInTheDocument();
			});
		});
	});

	describe("Logic test", () => {
		beforeEach(() => {

			render(
				<QueryClientProvider client={queryClient}>
					<MemoryRouter>
						<SearchBar />
					</MemoryRouter>
				</QueryClientProvider>
			);
		});


		test("Show accurate search results", async () => {
			fireEvent.change(screen.getByPlaceholderText("Search..."), {
				target: { value: "Du lich" },
			});

			const searchResults = screen.getByTestId("search-results");

			await waitFor(() => {
				let check = false;
				searchResults.childNodes.forEach((item) => {
					check = check || item.textContent.includes("Du lich");
				});
				expect(check).toBe(true);
			});
		});


		test("Check if search results are displayed in the correct order", async () => {
			fireEvent.change(screen.getByPlaceholderText("Search..."), {
				target: { value: "Xin" },
			});

			const searchResults = screen.getByTestId("search-results");

			await waitFor(() => {
				const check = searchResults.childNodes[0].textContent.includes("Xin di kham") 
					&& searchResults.childNodes[1].textContent.includes("Xin nghi phep")
					&& searchResults.childNodes[2].textContent.includes("Xin phep di cong tac");
				expect(check).toBe(true);
			});
		});


		test("No result found if input is an empty string", async () => {
			fireEvent.change(screen.getByPlaceholderText("Search..."), {
				target: { value: "" },
			});

			const searchResults = screen.getByTestId("search-results");

			await waitFor(() => {
				expect(searchResults.childNodes.length).toBe(0);
			});
		});


		test("case-insensitive search", async () => {
			fireEvent.change(screen.getByPlaceholderText("Search..."), {
				target: { value: "Nghi THaM nGUOi" },
			});

			const searchResults = screen.getByTestId("search-results");

			await waitFor(() => {
				expect(searchResults.childNodes[0].textContent.includes("Nghi tham nguoi om")).toBe(true);
			});
		});


		test("Click on a search result", async () => {
			fireEvent.change(screen.getByPlaceholderText("Search..."), {
				target: { value: "Du lich" },
			});

			const searchResults = screen.getByTestId("search-results");

			await waitFor(() => {
				fireEvent.click(searchResults.childNodes[0]);
			});



			await waitFor(() => {
				expect(mockfn).toHaveBeenCalledWith({
					pathname: `/admin/view-request`,
					search: `?id=4`,
					state: { id: 4 }
				})
				
			});
		});
	});

});
