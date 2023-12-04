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
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import {useParams} from 'react-router-dom';
import ManageApi from "api/management";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "api";

export default function ViewReqs() {
  // Chakra Color Mode
	const { id } = useParams();
	const [msg, setMsg] = useState("No data found");

	const getReq = async () => {
		if (id === ":id") return;

		try
		{
			const res = await ManageApi.getRequest(id);
			console.log(res);
	
			if (res.response?.status !== 200)
			{
				setMsg("No data found");
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

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {msg}
    </Box>
  );
}
