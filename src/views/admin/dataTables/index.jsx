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
import React, { useMemo } from "react";
import ManageApi from "api/management";
import { useQuery } from "@tanstack/react-query";

export default function Settings() {
  // Chakra Color Mode
  const {
    data: RequestListData,
    refetch: refetchAllData,
    isFetching: isFetchingListData,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => ManageApi.ListRequest(),
    enabled: true,
  });

  const {
    data: UpcomingRequests,
    refetch,
    isFetching: isFetchUpcomingRequests,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => ManageApi.ListRequest(),
    enabled: true,
  });

  const tableDataComplex = useMemo(() => {
    const pendingList = RequestListData?.data?.data?.pending || [];
    const approvedList = RequestListData?.data?.data?.approved || [];
    const rejectedList = RequestListData?.data?.data?.rejected || [];

    const mergedList = [...pendingList, ...approvedList, ...rejectedList]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((item) => ({
        title: [
          item.title,
          item.user.lastname,
          item.user.firstname,
          item.user.email,
        ],
        date: item.updatedAt,
        status: item.status,
        remain: item.user.remaindingLeaveDays,
      }));

    return mergedList;
  }, [RequestListData]);

  const tableDataCheck = useMemo(() => {
    const pendingList = RequestListData?.data?.data?.pending || [];

    const mergedList = [...pendingList]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((item) => ({
        title: [
          item.title,
          item.user.lastname,
          item.user.firstname,
          item.user.email,
          item.id,
        ],
        date: item.updatedAt,
        reason: item.reason,
        remain: item.user.remaindingLeaveDays,
      }));

    return mergedList;
  }, [RequestListData]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        {isFetchingListData ? (
          <ComplexTable.Skeleton
            columnsData={columnsDataComplex}
            tableData={[]}
          />
        ) : (
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex.slice(0, 5)}
            refetchAllData={refetchAllData}
          />
        )}
        {isFetchingListData ? (
          <CheckTable.Skeleton columnsData={columnsDataCheck} tableData={[]} />
        ) : (
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
            refetchAllData={refetchAllData}
          />
        )}
      </SimpleGrid>
    </Box>
  );
}
