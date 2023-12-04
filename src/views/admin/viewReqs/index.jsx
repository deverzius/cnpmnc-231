/*!
	_   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
																																																																																																																																																																			 
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { FormControl, FormLabel, Input, Text, FormHelperText, Button, Box } from "@chakra-ui/react";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import MiniCalendar from "components/calendar/MiniCalendar";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import { useLocation } from 'react-router-dom';
import ManageApi from "api/management";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "api";

export default function ViewReqs() {
	// Chakra Color Mode
	const location = useLocation();
	const [msg, setMsg] = useState("No data found");
	const [req, setReq] = useState({});
	const [id, setId] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const handleChangeEvent = (e) => {
		// console.log(e);
		setSelectedDate(e);
	};

	const handleUpdate = async (e) => {
		if (!id)
		{
			alert("No data found");
		}
		
		try
		{
			await ManageApi.updateRequest(id, req)
				.then(res => console.log(res))
				.then(() => alert("Update successfully"))
		}
		catch (e)
		{
			alert("Please fill all the fields")
		}
	}

	const getReq = async () => {
		if (!location.state?.id) return;

		setId(location.state.id);
		try
		{
			const res = await ManageApi.getRequest(id);
			setReq(res?.data?.result);
			console.log('res: ', res)

			let leaveDays = res?.data?.result?.leaveDays;
			if (leaveDays.length >= 1)
			{
				const fDate = new Date(leaveDays[0]);
				const lDate = new Date(leaveDays[leaveDays.length - 1]);
				console.log(fDate, lDate);
				setSelectedDate([fDate, lDate]);
			}

			if (res.status !== 200)
			{
				setMsg("No data found");
			}
			else
			{
				setMsg("")
			}
			// return res;
		}
		catch (e)
		{
			setMsg("No data found");
		}
	}

	useEffect(() => {
		getReq();
	}, [id])

	// useEffect(() => {
	// 	console.log(req)
	// }, [req])

	const handleUpdateForm = (label, e) => {
		req[label] = e.target.value;
		setReq({
			...req
		});
	}
``
	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<FormControl>
				<FormLabel>ID: {id}</FormLabel>
				<FormLabel
					color={
						req.status === "approved" ? "green.500" : (req.status === "rejected" ? "red.500" : "yellow.500")
					}
					fontSize="20px"
					fontWeight="bold"
				>Status: {req.status ?? "No data found!!"}</FormLabel>
				<br />
				<FormLabel>Title</FormLabel>
				<Input
					isRequired
					value={req.title}
					onChange={e => handleUpdateForm("title", e)}
				/>
				{/* <FormLabel>Description</FormLabel>
				<Input
					value={req.description}
					onChange={e => handleUpdateForm("description", e)}
				/> */}
				<FormLabel>Reason</FormLabel>
				<Input
					isRequired
					value={req.reason}
					onChange={e => handleUpdateForm("reason", e)}
				/>

				<FormControl mt={4} isRequired>
					<FormLabel>Select day</FormLabel>
					<FormHelperText>
						Choose the dates you need to take leave.
					</FormHelperText>
					<MiniCalendar
						selectRange
						onChange={(e) => handleChangeEvent(e)}
						value={selectedDate}
					/>
				</FormControl>
			</FormControl>

			<br />
			<Box textAlign={"center"}>
				<Button
					bg="white"
					color="black"
					_hover={{ bg: "whiteAlpha.500" }}
					_active={{ bg: "white" }}
					_focus={{ bg: "white" }}
					fontWeight="500"
					fontSize="14px"
					py="20px"
					px="27"
					me="38px"
					shadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
					onClick={handleUpdate}
				>
					Update Request
				</Button>
				{/* <Button
					colorScheme="brand"
					fontWeight="500"
					fontSize="14px"
					py="20px"
					px="27"
					me="38px"
					shadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
					mr={3} >
					Delete Request
				</Button> */}
			</Box>

		</Box>
	);
}
