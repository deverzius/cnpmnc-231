import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManageApi from "api/management";
import axios from "api";
import { useHistory, MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import ComplexTable from "./components/ComplexTable";


jest.mock("api/management", () => {
	const ManageApi = {
		// getRequest: (id) => Promise.resolve(
		// 	{
		// 		data: {
		// 			result: [
		// 				{
		// 					"id": 1,
		// 					"title": "Xin nghi phep",
		// 					"reason": "Bi sot",
		// 					"leaveDays": ['2023-10-26', '2023-11-25'],
		// 					"status": "pending",
		// 					"updatedAt": "2023-12-06T10:51:40.121Z"
		// 				},
		// 				{
		// 					"id": 2,
		// 					"title": "Xin phep di cong tac",
		// 					"reason": "Di cong tac tai Ha Noi",
		// 					"leaveDays": ['2023-11-20', '2023-11-25'],
		// 					"status": "approved",
		// 					"updatedAt": "2023-12-01T12:11:40.121Z"
		// 				},
		// 				{
		// 					"id": 3,
		// 					"title": "Nghi tham nguoi om",
		// 					"reason": "Nghi tham nguoi om nam vien",
		// 					"leaveDays": ['2023-11-20', '2023-12-25'],
		// 					"status": "rejected",
		// 					"updatedAt": "2023-12-02T12:11:40.121Z"
		// 				},
		// 				{
		// 					"id": 4,
		// 					"title": "Du lich",
		// 					"reason": "Di du lich tai Da Nang",
		// 					"leaveDays": ['2024-01-01', '2024-01-02'],
		// 					"status": "approved",
		// 					"updatedAt": "2023-11-02T12:11:40.121Z"
		// 				},
		// 				{
		// 					"id": 5,
		// 					"title": "Xin di kham",
		// 					"reason": "Bi cam cum, dau dau",
		// 					"leaveDays": ['2024-12-01', '2024-12-02'],
		// 					"status": "rejected",
		// 					"updatedAt": "2023-11-29T12:11:40.121Z"
		// 				}
		// 			][id]
		// 		},
		// 	}
		// ),
		ListRequest: () => Promise.resolve(
			{
				data: {
					result: [
						{
							"id": 1,
							"title": "Xin nghi phep",
							"reason": "Bi sot",
							"leaveDays": ['2023-10-26', '2023-11-25'],
							"status": "pending",
							"updatedAt": "2023-12-06T10:51:40.121Z"
						},
						{
							"id": 2,
							"title": "Xin phep di cong tac",
							"reason": "Di cong tac tai Ha Noi",
							"leaveDays": ['2023-11-20', '2023-11-25'],
							"status": "approved",
							"updatedAt": "2023-12-01T12:11:40.121Z"
						},
						{
							"id": 3,
							"title": "Nghi tham nguoi om",
							"reason": "Nghi tham nguoi om nam vien",
							"leaveDays": ['2023-11-20', '2023-12-25'],
							"status": "rejected",
							"updatedAt": "2023-12-02T12:11:40.121Z"
						},
						{
							"id": 4,
							"title": "Du lich",
							"reason": "Di du lich tai Da Nang",
							"leaveDays": ['2024-01-01', '2024-01-02'],
							"status": "approved",
							"updatedAt": "2023-11-02T12:11:40.121Z"
						},
						{
							"id": 5,
							"title": "Xin di kham",
							"reason": "Bi cam cum, dau dau",
							"leaveDays": ['2024-12-01', '2024-12-02'],
							"status": "rejected",
							"updatedAt": "2023-11-29T12:11:40.121Z"
						}
					]
				},
			}
		),
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

const columnsData = [
	{
		"Header": "TITLE",
		"accessor": "title"
	},
	{
		"Header": "STATUS",
		"accessor": "status"
	},
	{
		"Header": "DATE",
		"accessor": "date"
	},
	{
		"Header": "REMAIN DAYS",
		"accessor": "remain"
	}
];
const tableData = [
	{
		"title": [
			"Xin nghi phep",
			"Farrell",
			"Kavon",
			"Virgil.Jaskolski@gmail.com",
			1
		],
		"date": "2023-12-06T10:51:40.121Z",
		"status": "pending",
		"remain": 6
	},
	{
		"title": [
			"Xin kham benh",
			"Feil",
			"Kayla",
			"Garnett73@hotmail.com",
			2
		],
		"date": "2023-12-06T08:01:04.083Z",
		"status": "rejected",
		"remain": 12
	},
	{
		"title": [
			"Xin nghi",
			"Kono",
			"Sovik",
			"Sovik.Kono@gmail.com",
			3
		],
		"date": "2023-11-29T08:57:39.716Z",
		"status": "pending",
		"remain": 9
	},
	{
		"title": [
			"Di du lich",
			"aderiz",
			"demarco",
			"aderiz.demarco@gmail.com",
			4
		],
		"date": "2023-11-28T03:01:30.938Z",
		"status": "pending",
		"remain": 8
	},
	{
		"title": [
			"Tham nguoi benh",
			"Farrell",
			"Kavon",
			"Virgil.Jaskolski@gmail.com",
			5
		],
		"date": "2023-11-25T08:02:35.348Z",
		"status": "pending",
		"remain": 6
	},
	{
		"title": [
			"Di ve que",
			"Von",
			"Juwan",
			"Kristian87@gmail.com",
			6
		],
		"date": "2023-11-25T07:57:17.751Z",
		"status": "pending",
		"remain": 11
	}
];



describe("Admin all requests page", () => {
	let queryClient;

	beforeAll(() => {
		queryClient = new QueryClient();
	});

	describe("Render test", () => {
		beforeEach(() => {
			render(
				<QueryClientProvider client={queryClient}>
					<ComplexTable columnsData={columnsData} tableData={tableData} />
				</QueryClientProvider>
			);
		});

		test("Render table headings", () => {
			expect(screen.getByText("TITLE")).toBeInTheDocument();
			expect(screen.getByText("STATUS")).toBeInTheDocument();
			expect(screen.getByText("DATE")).toBeInTheDocument();
			expect(screen.getByText("REMAIN DAYS")).toBeInTheDocument();
		});

		test("Render table body", () => {
			const historyTable = screen.getByRole("table");
			expect(historyTable.childNodes[1].childNodes.length > 0).toBe(true);
		});
	});

	describe("Logic test", () => {
		beforeEach(() => {
			render(
				<QueryClientProvider client={queryClient}>
					<MemoryRouter>
						<ComplexTable columnsData={columnsData} tableData={tableData} />
					</MemoryRouter>
				</QueryClientProvider>
			);
		});

		test("sort a-z by remain days", () => {
			fireEvent.click(screen.getByText("REMAIN DAYS"));
			fireEvent.click(screen.getByText("REMAIN DAYS"));

			const historyTable = screen.getByRole("table");
			const historyBody = historyTable.childNodes[1];

			expect(historyBody.childNodes[5].textContent).toContain("6");
			expect(historyBody.childNodes[4].textContent).toContain("6");
			expect(historyBody.childNodes[3].textContent).toContain("8");
			expect(historyBody.childNodes[2].textContent).toContain("9");
			expect(historyBody.childNodes[1].textContent).toContain("11");
			expect(historyBody.childNodes[0].textContent).toContain("12");
		});

		test("sort z-a by remain days", () => {
			fireEvent.click(screen.getByText("REMAIN DAYS"));

			const historyTable = screen.getByRole("table");
			const historyBody = historyTable.childNodes[1];

			expect(historyBody.childNodes[0].textContent).toContain("6");
			expect(historyBody.childNodes[1].textContent).toContain("6");
			expect(historyBody.childNodes[2].textContent).toContain("8");
			expect(historyBody.childNodes[3].textContent).toContain("9");
			expect(historyBody.childNodes[4].textContent).toContain("11");
			expect(historyBody.childNodes[5].textContent).toContain("12");
		});

		test("sort ascending by date", () => {
			fireEvent.click(screen.getByText("DATE"));

			const historyTable = screen.getByRole("table");
			const historyBody = historyTable.childNodes[1];

			expect(historyBody.childNodes[0].textContent).toContain("Nov. 25, 2023");
			expect(historyBody.childNodes[1].textContent).toContain("Nov. 25, 2023");
			expect(historyBody.childNodes[2].textContent).toContain("Nov. 28, 2023");
			expect(historyBody.childNodes[3].textContent).toContain("Nov. 29, 2023");
			expect(historyBody.childNodes[4].textContent).toContain("Dec. 6, 2023");
			expect(historyBody.childNodes[5].textContent).toContain("Dec. 6, 2023");
		});

		test("sort descending by date", () => {
			fireEvent.click(screen.getByText("DATE"));
			fireEvent.click(screen.getByText("DATE"));

			const historyTable = screen.getByRole("table");
			const historyBody = historyTable.childNodes[1];

			expect(historyBody.childNodes[0].textContent).toContain("Dec. 6, 2023");
			expect(historyBody.childNodes[1].textContent).toContain("Dec. 6, 2023");
			expect(historyBody.childNodes[2].textContent).toContain("Nov. 29, 2023");
			expect(historyBody.childNodes[3].textContent).toContain("Nov. 28, 2023");
			expect(historyBody.childNodes[4].textContent).toContain("Nov. 25, 2023");
			expect(historyBody.childNodes[5].textContent).toContain("Nov. 25, 2023");
		});

		test("sort a-z by status", () => {
			fireEvent.click(screen.getByText("REMAIN DAYS"));
			fireEvent.click(screen.getByText("REMAIN DAYS"));

			const historyTable = screen.getByRole("table");
			const historyBody = historyTable.childNodes[1];

			expect(historyBody.childNodes[5].textContent).toContain("6");
			expect(historyBody.childNodes[4].textContent).toContain("6");
			expect(historyBody.childNodes[3].textContent).toContain("8");
			expect(historyBody.childNodes[2].textContent).toContain("9");
			expect(historyBody.childNodes[1].textContent).toContain("11");
			expect(historyBody.childNodes[0].textContent).toContain("12");
		});

		test("sort z-a by status", () => {
			fireEvent.click(screen.getByText("REMAIN DAYS"));

			const historyTable = screen.getByRole("table");
			const historyBody = historyTable.childNodes[1];

			expect(historyBody.childNodes[0].textContent).toContain("6");
			expect(historyBody.childNodes[1].textContent).toContain("6");
			expect(historyBody.childNodes[2].textContent).toContain("8");
			expect(historyBody.childNodes[3].textContent).toContain("9");
			expect(historyBody.childNodes[4].textContent).toContain("11");
			expect(historyBody.childNodes[5].textContent).toContain("12");
		});

	});

});
