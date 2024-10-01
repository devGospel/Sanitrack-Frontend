"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalComponent from "../modals/Modal";
import { usePathname } from "next/navigation";
import Spinner from "../loaders/Loader";
import useWorkOrder from "@/hooks/useWorkOrder";
import FreePagination from "../pagination/FreePagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatISO } from "date-fns";
import { FaGlassMartiniAlt, FaSearch, FaUsers, FaClock } from "react-icons/fa";
import UpdateTeamsModal from "./modals/UpdateTeams";
import { useDispatch } from "react-redux";
import { toast, Flip } from "react-toastify";
import {
  setId,
  setItem,
  setRoomId,
  setHour,
  setStoredWorkId,
} from "@/redux/features/adminId/adminSlice";

import manageMss, {
  setManageMss,
  updateManageMss,
  clearManageMss,
} from "@/redux/features/manageMss/manageMss";

import useUser from "@/hooks/useUser";
import UpdateSupervisorsModal from "./modals/UpdateSuperVisors";
import { IoSettings } from "react-icons/io5";
import SettingsModal from "./modals/SettingsModal";
import { FaCalendar } from "react-icons/fa6";
import { getCurrentDateInLosAngeles } from "@/utils/getCurrentDate";
import { Roles } from "@/constant/roles";

const ManageMssTable = ({ _data }) => {
  let searchTimeout;
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const manageOrders = useSelector((state) => state.manageMss.manageOrders);
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const { getAllWorkOrdersForManagement, loading, updateWO } = useWorkOrder();

  const [filteredData, setFilteredData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [filterOccurred, setFilterOccurred] = useState(false);
  const dispatch = useDispatch();

  const validRoles = [
    Roles.MANAGER.toLowerCase(),
    Roles.INSPECTOR.toLowerCase(),
    Roles.SUPERVISOR.toLowerCase(),
  ];

  console.log("valid role ", validRoles);
  console.log("selected facility0", selectedFacilityId);
  const fetchDataTrial = async () => {
    let response;
    if (selectedFacilityId && validRoles.includes(role?.toLocaleLowerCase())) {
      response = await getAllWorkOrdersForManagement(
        role?.toLocaleLowerCase(),
        selectedFacilityId
      );
      // dispatch(setManageMss(response))
    } else {
      response = await getAllWorkOrdersForManagement(role?.toLocaleLowerCase());
      console.log("response is ", response);
    }

    if (response) {
      dispatch(clearManageMss()); // Clear state before setting it
      dispatch(setManageMss(response));
      setFilteredData(response);
      setDefaultData(response);
    }
  };

  useEffect(() => {
    // call the reial function
    fetchDataTrial();
  }, [role, selectedFacilityId]);

  // useEffect(() => {
  //   console.log("Manage Orders Testing:", manageOrders);
  // }, [manageOrders, role, selectedFacilityId]);

  // console.log("manage", manageOrders);
  // useEffect(() => {
  //   setFilteredData(manageOrders);
  // }, [manageOrders]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // ...

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = manageOrders?.slice(indexOfFirstItem, indexOfLastItem);

  console.log("filtered data", manageOrders);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(filteredData?.length / itemsPerPage));
  };

  let sortedData = currentItems?.length > 0 ? [...currentItems] : [];

  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (e.target.value.length > 0) {
        const filteredValue = manageOrders.filter(
          (item) =>
            item?.workOrderName
              ?.toLowerCase()
              .includes(e.target.value?.toLowerCase()) ||
            item?.assetTask?.room
              ?.toLowerCase()
              .includes(e.target.value?.toLowerCase()) ||
            item?.assetTask?.assetCode
              ?.toLowerCase()
              .includes(e.target.value?.toLowerCase()) ||
            item?.assetTask?.asset
              ?.toLowerCase()
              .includes(e.target.value?.toLowerCase())
        );
        console.log("ewo", filteredValue);
        setFilterOccurred(true);
        dispatch(clearManageMss());
        dispatch(setManageMss(filteredValue));
        setFilteredData(filteredValue);
        sortedData = [...filteredValue];
        console.log("sorted data", sortedData);
      }
      if (e.target.value === "") {
        setFilterOccurred(false);
        setFilteredData(currentItems);
        sortedData = currentItems?.length > 0 ? [...currentItems] : [];
        dispatch(clearManageMss());
        dispatch(setManageMss(defaultData));
      }
    }, 1000);
  };
  const handleChangeStatus = (e) => {
    e.preventDefault();
    console.log("first", e.target.value);
    if (e.target.value === "Approved") {
      const filteredValue = manageOrders.filter(
        (item) => item?.mostRecentTask?.isApproved
      );

      console.log("ewo", filteredValue);
      setFilteredData(filteredValue);
    } else if (e.target.value === "Submitted") {
      const filteredValue = manageOrders.filter(
        (item) => item?.mostRecentTask?.isDone
      );

      console.log("ewo", filteredValue);
      setFilteredData(filteredValue);
    } else if (e.target.value === "all") {
      setFilteredData(currentItems);
    }
  };
  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row ">
          <div className="w-full md:w-2/3 mb-2">
            <input
              type="search"
              onChange={handleSearch}
              className="w-full md:w-full text-black dark:text-white bg-white dark:bg-black p-3 border border-gray-500 focus-within:border-gray-500  focus:border-gray-500 rounded-lg text-sm"
              placeholder="Search by Asset Name,Room Name, Asset and Room Code"
            />
          </div>
          <div></div>
          {/* <div>
            <span className="flex justify-end pt-3 pb-5">
              <select
                id="status"
                name={"status"}
                onChange={(e) => handleChangeStatus(e)}
                className="w-full lg:w-72 capitalize lg:py-1 bg-gray-100 dark:bg-black dark:text-white dark:border-sanBlue border border-gray-500 h-12 rounded-lg sm:px-3    text-xs md:text-base text-black  border-none cursor-pointer focus-within:border-none"
              >
                <option hidden>Filter by Frequency</option>
                <option value="all">All</option>
                <option value="Submitted">Submitted</option>
                <option value="Approved">Approved</option>
                {/* {category?.map((item) => (
                      <option key={item?._id} value={item?.category}>
                        {item?.category}
                      </option>
                    ))} */}
          {/* </select> */}
          {/* </span> */}
          {/* </div> */}
        </div>
      </div>

      <Table
        data={sortedData}
        allData={manageOrders}
        loading={false}
        updateWO={updateWO}
        dispatch={dispatch}
        filterOccurred={filterOccurred}
        setFilterOccurred={setFilterOccurred}
      />
      <FreePagination
        itemsPerPage={itemsPerPage}
        totalItems={manageOrders?.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
      />
    </div>
  );
};

export default ManageMssTable;

const Table = ({
  data,
  loading,
  updateWO,
  dispatch,
  allData,
  filterOccurred,
  setFilterOccurred,
}) => {
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const manageOrders = useSelector((state) => state.manageMss.manageOrders);
  useEffect(() => {
    console.log("Monitoring manage orders in table component:", manageOrders);
  }, [manageOrders]);

  console.log("something that pass to the Table component", data);
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const { getAllWorkOrdersForManagement } = useWorkOrder();

  const [selectedIds, setSelectedIds] = useState([]);
  const [areConditionsMet, setAreConditionsMet] = useState(false);
  const [datePickerConditions, setDatePickerConditions] = useState(false);
  const [filteredWorkOrderIds, setFilteredWorkOrderIds] = useState([]);
  const [endDateCondition, setEndDateCondition] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };
  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      const allIds = allData.map((item) => item.workOrderId);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const validRoles = [
    Roles.MANAGER.toLowerCase(),
    Roles.INSPECTOR.toLowerCase(),
    Roles.SUPERVISOR.toLowerCase(),
  ];

  const refetchMss = async () => {
    let response;
    if (selectedFacilityId && validRoles.includes(role?.toLocaleLowerCase())) {
      response = await getAllWorkOrdersForManagement(
        role?.toLocaleLowerCase(),
        selectedFacilityId
      );
      // dispatch(setManageMss(response))
    } else {
      response = await getAllWorkOrdersForManagement(role?.toLocaleLowerCase());
    }

    if (response) {
      dispatch(clearManageMss()); // Clear state before setting it
      dispatch(setManageMss(response));
    }
  };

  useEffect(() => {
    // Clear selectedIds when filterOccurred changes
    setSelectedIds([]);
    // when filter change call the mss again
    if (!filterOccurred) {
      refetchMss();
    }

    if (filterOccurred) {
      const sortedIds = data.map((id) => id.workOrderId);
      setFilteredWorkOrderIds(sortedIds);
    }

    console.log(
      "hiii filtering has happened. for persiting id is",
      filteredWorkOrderIds
    );
  }, [filterOccurred]); // Dependency array includes filterOccurred

  console.log(selectedIds);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [teamsModalOpen, setTeamsModalOpen] = useState(false);
  const [inspectorsModalOpen, setInspectorsModalOpen] = useState(false);

  const openDel = (assetId) => {
    setDelModalOpen(true);
  };

  const closeDel = () => {
    setDelModalOpen(false);
  };
  const openTeams = (assetId) => {
    setTeamsModalOpen(true);
  };

  const closeTeams = () => {
    setTeamsModalOpen(false);
  };
  const openInspectors = (assetId) => {
    setInspectorsModalOpen(true);
  };

  const closeInspectors = () => {
    setInspectorsModalOpen(false);
  };
  const pathname = usePathname();
  const [startDate, setStartDate] = useState(getCurrentDateInLosAngeles());
  const [endDate, setEndDate] = useState(null);

  const handleMssUpdate = async (workOrderId, data) => {
    try {
      console.log("data received for updating", workOrderId, data);
      const response = await updateWO(workOrderId, data, false);

      if (response && response.error) {
        // Show an error toast if the update failed
        toast.error(response.message || "Failed to update work order", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
        return;
      }
      // after updating, make request to get the new data
      let newResponse;
      if (
        selectedFacilityId &&
        validRoles.includes(role?.toLocaleLowerCase())
      ) {
        newResponse = await getAllWorkOrdersForManagement(
          role?.toLocaleLowerCase(),
          selectedFacilityId
        );
      } else {
        newResponse = await getAllWorkOrdersForManagement(
          role?.toLocaleLowerCase()
        );
        console.log(
          "response is from calling get work orders in handle mss ",
          newResponse
        );
      }
      // console.log('weeeeee outsideee', response)
      if (newResponse.length > 0) {
        let updatedFilteredData;

        if (filterOccurred) {
          // Filter the newResponse to include only the previously filtered work orders
          updatedFilteredData = newResponse.filter((order) =>
            filteredWorkOrderIds.includes(order.workOrderId)
          );
        } else {
          updatedFilteredData = newResponse;
        }

        dispatch(clearManageMss());
        dispatch(setManageMss(updatedFilteredData));

        // show sucess toast
        toast.success("Work Order Updated Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      }
    } catch (error) {
      console.error("Error updating work order:", error);
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }
  };

  const handleMultipleMssUpdate = async (formattedData) => {
    const updatePromises = formattedData.map((data) =>
      updateWO(data.workOrderId, data.updateFields, true)
    );
    const result = await Promise.all(updatePromises);

    const hasError = result.some((result) => result && result.error);
    if (hasError) {
      console.log(
        "An error occurred while doint multiple work order updates",
        result.map((res) => res.message)
      );
      // Show error toast only once
      toast.error("An error occurred during the update process", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    } else {
      // Show success toast only once
      toast.success("Work Orders Updated Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }
    let newResponse;
    if (selectedFacilityId && validRoles.includes(role?.toLocaleLowerCase())) {
      newResponse = await getAllWorkOrdersForManagement(
        role?.toLocaleLowerCase(),
        selectedFacilityId
      );
    } else {
      newResponse = await getAllWorkOrdersForManagement(
        role?.toLocaleLowerCase()
      );
    }

    if (newResponse.length > 0) {
      let updatedFilteredData;

      if (filterOccurred) {
        console.log("from handle multiple updating", filteredWorkOrderIds);
        // Filter the newResponse to include only the previously filtered work orders
        updatedFilteredData = newResponse.filter((order) =>
          selectedIds.includes(order.workOrderId)
        );
      } else {
        updatedFilteredData = newResponse;
      }

      dispatch(clearManageMss());
      dispatch(setManageMss(updatedFilteredData));
    }
  };
  const handleTimeChange = (workOrderId, e, existingStartHour) => {
    const time = e.target.value;
    const hourPart = time.split(":")[0];
    const minutePart = time.split(":")[1];

    const formattedMinute = parseInt(minutePart, 10);
    const formattedHour = parseInt(hourPart, 10);

    let data
    existingStartHour ? ( data = { startHour: formattedHour, startMinute: formattedMinute, editStartHour: true}) : (data = { startHour: formattedHour, startMinute: formattedMinute })
    handleMssUpdate(workOrderId, data);
  };
  const handleUpdateDate = (date, id, type) => {
    console.log(date);
    const newDate = formatISO(date);
    console.log(newDate.split("T")[0], id, type);

    const data = { startDate: newDate.split("T")[0] };
    handleMssUpdate(id, data);
  };

  const handleDurationChange = (workOrderId, e, existingValidPeriod) => {
    // e.preventDefault()
    console.log("checking", existingValidPeriod);

    let data;
    existingValidPeriod
      ? (data = {
          validCleaningPeriod: e.target.value,
          editValidCleaningPeriod: true,
        })
      : (data = { validCleaningPeriod: e.target.value });

    console.log("trying to handle duration", workOrderId, data);
    handleMssUpdate(workOrderId, data);
  };

  const handleEndDate = (date, workOrderId, existingEndDate) => {
    const newDate = formatISO(date);
    let data;
    existingEndDate
      ? (data = { endDate: newDate.split("T")[0], editEndDate: true })
      : (data = { endDate: newDate.split("T")[0] });
    handleMssUpdate(workOrderId, data);
  };

  const handleUpdateMultipleDates = (date, filteredData) => {
    const updateData = filteredData.reduce((acc, item) => {
      if (selectedIds.includes(item.workOrderId)) {
        // Build data to update
        const newDate = formatISO(date);
        const updateObject = {
          startDate: newDate.split("T")[0],
        };
        // Add to the accumulator
        acc.push({
          workOrderId: item.workOrderId,
          updateFields: updateObject,
        });
      }
      return acc;
    }, []);

    // Log the update data
    console.log("update multiple dates", updateData);

    handleMultipleMssUpdate(updateData);
  };

  const handleMultipleEndDates = (date, filteredData) => {
    // to update multiple dates, I need to map through data, and then get the details for a selectedId index from data.workOrderId,
    // check if it has an end date already from data.schedule.endDate. If it does, I can build the data I would pass to the updateWo function
    // as such existingEndDate ? data = {{"endDate": newDate.split('T')[0], "editEndDate": true} : data = {"endDate": newDate.split('T')[0]}}
    // and send the work order
    const updateData = filteredData.reduce((acc, item) => {
      if (selectedIds.includes(item.workOrderId)) {
        const existingEndDate = item.schedule.endDate;
        // Build data to update
        const newDate = formatISO(date);
        const updateObject = {
          endDate: newDate.split("T")[0],
          ...(existingEndDate ? { editEndDate: true } : {}),
        };
        // Add to the accumulator
        acc.push({
          workOrderId: item.workOrderId,
          updateFields: updateObject,
        });
      }
      return acc;
    }, []);

    // Log the update data
    console.log("hiiiii", updateData);

    handleMultipleMssUpdate(updateData);
  };

  const handleMultipleTime = (e, filteredData) => {
    const time = e.target.value;
    const updateData = filteredData.reduce((acc, item) => {
      if (selectedIds.includes(item.workOrderId)) {
        const existingStartHour = item?.schedule?.startHour

        const hourPart = time.split(":")[0];
        const minutePart = time.split(":")[1];

        const formattedMinute = parseInt(minutePart, 10);
        const formattedHour = parseInt(hourPart, 10);

        const updateObject = {
          startHour: formattedHour,
          startMinute: formattedMinute,
          ...(existingStartHour ? {editStartHour: true}: {})
        };
        // Add to the accumulator
        acc.push({
          workOrderId: item.workOrderId,
          updateFields: updateObject,
        });
      }
      return acc;
    }, []);

    // Log the update data
    console.log("prepared multiple time data", updateData);
    handleMultipleMssUpdate(updateData);
  };

  const handleMultipleDuration = (e, filteredData) => {
    const updateData = filteredData.reduce((acc, item) => {
      if (selectedIds.includes(item.workOrderId)) {
        const existingValidPeriod = item?.schedule?.cleaningValidPeriod;

        const updateObject = {
          validCleaningPeriod: e.target.value,
          ...(existingValidPeriod ? { editValidCleaningPeriod: true } : {}),
        };
        // Add to the accumulator
        acc.push({
          workOrderId: item.workOrderId,
          updateFields: updateObject,
        });
      }
      return acc;
    }, []);

    // Log the update data
    console.log("multiple duration changes", updateData);
    handleMultipleMssUpdate(updateData);
  };

  const isConditionMetForSelectedIds = (selectedIds, data) => {
    return selectedIds.every((id) => {
      const item = data.find((d) => d.workOrderId == id);
      // Check if startHour and startMinute are set
      return (
        item &&
        (item?.schedule?.startHour === null ||
          item?.schedule?.cleaningValidPeriod > 0)
      );
    });
  };

  // This way, the function will return true if startDate is null or if the cleaningValidPeriod is greater than 0.
  const isDatePickerCondition = (selectedIds, data) => {
    // we want to check if startDate has been set
    return selectedIds.every((id) => {
      const item = data.find((d) => d.workOrderId == id);
      // Check if startDate is null and cleaningValidPeriod is greater than 0
      return (
        item &&
        (item.schedule?.startHour !== null ||
          item.schedule?.startDate !== null ||
          item.schedule?.cleaningValidPeriod > 0)
      );
    });
  };

  const isEndDatePickerCondition = (selectedIds, data) => {
    // we want to check if startDate has been set
    return selectedIds.every((id) => {
      const item = data.find((d) => d.workOrderId == id);
      // Check if startDate is null and cleaningValidPeriod is greater than 0
      return (
        item &&
        (item.schedule?.startHour !== null ||
          item.schedule?.cleaningValidPeriod > 0 ||
          item.schedule?.endDate !== null)
      );
    });
  };

  const isInspectorButtonCondition = (selectedIds, data) => {
    return selectedIds.every((id) => {
      const item = data.find((d) => d.workOrderId == id);
      return (
        item &&
        item.schedule?.startDate !== null &&
        item.schedule?.cleaningValidPeriod > 0 &&
        item.schedule?.endDate !== null
      );
    });
  };

  //this function is to check if the roomId and startHour of selected Ids are the same
  const checkConsistency = (selectedIds, data) => {
    if (selectedIds.length === 0) return false;
    // Retrieve roomId and startHour from the first selected item
    const firstItem = data.find((d) => d.workOrderId == selectedIds[0]);
    console.log("fiii", firstItem);
    const roomId = firstItem?.assetTask?.roomId;
    const startHour = firstItem?.schedule.startHour;

    // Check if all selected items have the same roomId and startHour
    return selectedIds.every((id) => {
      const item = data.find((d) => d.workOrderId == id);
      return (
        item &&
        item?.assetTask?.roomId == roomId &&
        item?.schedule?.startHour == startHour
      );
    });
  };

  const handleTeamModalMultiple = async (selectedIds, data, e) => {
    // e.preventDefault()
    console.log("hi");
    const isConsistent = checkConsistency(selectedIds, data);
    console.log("consistent res", isConsistent);
    if (isConsistent) {
      // prooceed with the dispatch
      const roomId = data.find((d) => d.workOrderId == selectedIds[0]).assetTask
        .roomId;
      const startHour = data.find((d) => d.workOrderId == selectedIds[0])
        .schedule.startHour;
      const teams = data.find((d) => d.workOrderId == selectedIds[0]).assignees
        .team;

      console.log("data is consistent so ", roomId, startHour, teams);
      dispatch(setRoomId(roomId));
      dispatch(setHour(startHour));
      dispatch(setItem(teams)); // store any form team that there was
      dispatch(setStoredWorkId(selectedIds));
      openTeams(e);
    } else {
      toast.info(
        "Selected work orders have inconsistent roomId or startHour. Please select work orders with matching roomId and startHour.",
        {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        }
      );
    }
  };

  const handleSuperVisorMultiple = async (selectedIds, data, e) => {
    const isConsistent = checkConsistency(selectedIds, data);

    if (isConsistent) {
      // prooceed with the dispatch
      const roomId = data.find((d) => d.workOrderId == selectedIds[0]).assetTask
        .roomId;
      const startHour = data.find((d) => d.workOrderId == selectedIds[0])
        .schedule.startHour;
      const teams = data.find((d) => d.workOrderId == selectedIds[0]).assignees
        .inspectors;

      dispatch(setRoomId(roomId));
      dispatch(setHour(startHour));
      dispatch(setItem(teams)); // store any form team that there was
      dispatch(setStoredWorkId(selectedIds));
      openInspectors(e);
    } else {
      toast.info(
        "Selected work orders have inconsistent roomId or startHour. Please select work orders with matching roomId and startHour.",
        {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        }
      );
    }
  };

  useEffect(() => {
    if (filterOccurred) {
      const conditionsMet = isConditionMetForSelectedIds(
        selectedIds,
        manageOrders
      );
      const dateConditionsMet = isDatePickerCondition(
        selectedIds,
        manageOrders
      );

      const endDateConditions = isEndDatePickerCondition(
        selectedIds,
        manageOrders
      );

      setAreConditionsMet(conditionsMet);
      setDatePickerConditions(dateConditionsMet);
      setEndDateCondition(endDateConditions);
      console.log(
        "you can display the date picker for start date",
        dateConditionsMet,
        endDateConditions
      );
    } else {
      setAreConditionsMet(false); // Optionally reset when filterOccurred is false
      setDatePickerConditions(false);
      setEndDateCondition(false);
    }
  }, [filterOccurred, selectedIds]);
  const handleDelete = () => {
    setDelModalOpen(false);
  };

  return (
    <>
      {filterOccurred && selectedIds?.length > 1 && (
        <div className="py-4">
          <h1 className="text-lg dark:text-white font-bold text-black pb-2">
            Update Group MSS
          </h1>
          <div className="flex gap-4 items-center flex-wrap">
            {/* start time multip */}
            <div className="flex gap-4 items-center ">
              <p className="text-xs dark:text-white text-black">Start Time/Duration</p>
              <div>
              <div className="dropdown inline-block relative">
              {/* <button className="  group  rounded inline-flex gap-2 items-center bg-sanBlue text-white text-sm p-2">
                <FaClock />
                Start Time
              </button> */}
              {areConditionsMet && (
                <div className="text-black w-full flex flex-col items-start">
                  {/* <label className="text-gray-500 dark:text-white py-2">Time</label> */}
                  <div className="relative w-full">
                    {/* <p>{item?.schedule?.startDate}</p> */}
                    <input
                      id="time"
                      type="time"
                      // If item.schedule.startDate exists, extract and format the time
                      // value={
                      //   item?.schedule?.startHour !== null && item?.schedule?.startMinute !== null
                      //     ? `${String(item.schedule.startHour).padStart(2, '0')}:${String(item.schedule.startMinute).padStart(2, '0')}`
                      //     : ''
                      // }
                      onChange={(e) => {
                        handleMultipleTime(e, manageOrders);
                      }}
                      // value={time}
                      placeholder=" Time"
                      className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:text-white"
                      name="name"
                      // {...register("time", { required: "Time is required." })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Duration Multiple */}
            <div className="dropdown inline-block relative">
              {/* <button className="  group  rounded inline-flex gap-2 items-center bg-sanBlue text-white text-sm p-2">
                <FaClock />
                Duration
              </button> */}
              {areConditionsMet && (
                // <label id="duration" className="dropdown inline-block relative"></label>
                <select
                  name="level"
                  onChange={(e) => handleMultipleDuration(e, manageOrders)}
                  // disabled={item?.schedule?.startHour == null} // Disable the dropdown if startDate is 0
                >
                  {/* If there's a valid duration, display it as the first option */}
                  {/* {item.schedule.cleaningValidPeriod ? (
                    <option value={item.schedule.cleaningValidPeriod}>
                      {item.schedule.cleaningValidPeriod}
                    </option>
                  ) : (
                    <option value="Duration">Duration</option>
                  )} */}

                  {/* Filter out the selected value, sort the remaining options, and then map them */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                    // .filter((_) => _ !== item.schedule.cleaningValidPeriod) // Filter out selected value
                    // .sort((a, b) => a - b) // Sort options in ascending order
                    .map((_) => (
                      <option key={_} value={_}>
                        {_}
                      </option>
                    ))}
                </select>
              )}
            </div>
              </div>
           
            </div>
           

            {/* start Date multi */}
            <div className="dropdown inline-block relative">
              <button className="  group  rounded inline-flex gap-2 items-center bg-sanBlue text-white text-sm p-2">
                <FaCalendar />
                Start Date
              </button>
              {datePickerConditions && (
                <ul className="dropdown-menu rounded-b text-black shadow-md bg-white text-left absolute hidden p-2 w-auto z-50">
                  <li className="d-link w-full p-2 cursor-pointer">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) =>
                        handleUpdateMultipleDates(date, manageOrders)
                      }
                      startDate={startDate}
                      endDate={endDate}
                      minDate={getCurrentDateInLosAngeles()}
                      inline
                      showDisabledMonthNavigation
                    />
                  </li>
                  {/* <li className="d-link w-full p-2 cursor-pointer">
                        <p className="font-extralight text-sm">Kene </p>
                      </li> */}
                </ul>
              )}
            </div>

            {/* End date multi */}
            <div className="dropdown inline-block relative">
              <button className="  group  rounded inline-flex gap-2 items-center bg-sanBlue text-white text-sm p-2">
                <FaCalendar />
                End Date
              </button>
              {endDateCondition && (
                <ul className="dropdown-menu rounded-b text-black shadow-md bg-white text-left absolute hidden p-2 w-auto z-50">
                  <li className="d-link w-full p-2 cursor-pointer">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) =>
                        handleMultipleEndDates(date, manageOrders)
                      }
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      inline
                      showDisabledMonthNavigation
                    />
                  </li>
                  {/* <li className="d-link w-full p-2 cursor-pointer">
                        <p className="font-extralight text-sm">Kene </p>
                      </li> */}
                </ul>
              )}
            </div>

            {/* Cleaners select  */}
            {isInspectorButtonCondition(selectedIds, manageOrders) && (
              <button
                onClick={(e) =>
                  handleTeamModalMultiple(selectedIds, manageOrders, e)
                }
                className="flex justify-center bg-sanBlue p-2 items-center text-sm gap-2 text-white rounded"
              >
                <FaUsers className="dark:text-white text-black text-xl text-center" />
                Cleaner/Team
              </button>
            )}

            {/* Inspector Select */}
            {isInspectorButtonCondition(selectedIds, manageOrders) && (
              <button
                onClick={(e) =>
                  handleSuperVisorMultiple(selectedIds, manageOrders, e)
                }
                className="flex justify-center bg-sanBlue p-2 items-center text-sm gap-2 text-white rounded"
              >
                <FaSearch className="dark:text-white text-black text-xl text-center" />
                Supervisor
              </button>
            )}

            <button
              onClick={(e) => {
                dispatch(setStoredWorkId(selectedIds));
                openDel(e);
              }}
              className="flex justify-center bg-sanBlue p-2 items-center text-sm gap-2 text-white rounded"
            >
              <IoSettings className="dark:text-white text-black text-xl text-center" />
              Settings
            </button>
          </div>
        </div>
      )}

      <div className="w-full overflow-x-auto   ">
        <table className="w-full leading-normal no- overflow-x-scroll lg:overflow-x-hidden">
          <thead>
            <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
              {filterOccurred && (
                <th className="px-5 py-3 text-center text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                  <input
                    type="checkbox"
                    checked={
                      filterOccurred
                        ? selectedIds.length === data?.length
                        : false
                    }
                    onChange={handleSelectAllChange}
                    className=""
                  />
                </th>
              )}

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Name
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Room
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Asset Code
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Asset
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Task
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Document
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Frequency
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Start Time
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Cleaning Duration (Hrs)
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Start Date
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                End Date
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Cleaner/Team
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Supervsior
              </th>
              {/* <th className="px-5 py-3 b text-left text-sm font-normal text-black capitalize tracking-wider">
               Status
              </th> */}
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider"></th>
            </tr>
          </thead>

          {data && !loading && (
            <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue dark:[&>*:nth-child(odd)]:bg-slate-900 dark:text-white text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white dark:[&>*:nth-child(even)]:bg-sanBlue dark:[&>*:nth-child(even)]:text-white shadow-lg w-full">
              {data?.map((item, index) => (
                <tr key={item?._id} className="border-b border-gray-200">
                  {/* <td className="px-5 py-3   text-sm">{index + 1}</td> */}
                  {/* work order id row */}
                  {filterOccurred && (
                    <td className="px-5 py-2 text-sm flex items-start">
                      <>
                        <button
                          // onClick={() => openModal(table_data._id)}
                          className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                        >
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={selectedIds.includes(item.workOrderId)}
                            onChange={() =>
                              handleCheckboxChange(item.workOrderId)
                            }
                            disabled={
                              role?.toLocaleLowerCase() ==
                                (Roles.INSPECTOR.toLocaleLowerCase() ||
                                  Roles.SUPERVISOR.toLocaleLowerCase()) &&
                              !item?.workOrderPermission
                            }
                          />
                        </button>
                      </>
                    </td>
                  )}

                  {/* work order name */}
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.workOrderName}
                    </p>
                  </td>

                  {/* work order room */}
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.assetTask?.room}
                    </p>
                  </td>

                  {/* work order asset code */}
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.assetTask?.assetCode}
                    </p>
                  </td>

                  {/* work order asset */}
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.assetTask?.asset}
                    </p>
                  </td>

                  {/* work order cleaning type */}
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.assetTask?.cleaningType}
                    </p>
                  </td>

                  {/* work order document */}
                  <td className="px-5 py-3   text-sm">
                    <p className={` text-red-500 text-xs`}>
                      {"Not working yet"}
                    </p>
                  </td>

                  {/* work order frequency */}
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.assetTask?.frequency}
                    </p>
                  </td>

                  {/* work order time */}
                  <td className="px-5 py-3   text-sm">
                    <div className="text-black w-full flex flex-col items-start">
                      {/* <label className="text-gray-500 dark:text-white py-2">Time</label> */}
                      <div className="relative w-full">
                        {/* <p>{item?.schedule?.startDate}</p> */}
                        <input
                          id="time"
                          type="time"
                          // If item.schedule.startDate exists, extract and format the time
                          value={
                            item?.schedule?.startHour !== null &&
                            item?.schedule?.startMinute !== null
                              ? `${String(item.schedule.startHour).padStart(
                                  2,
                                  "0"
                                )}:${String(item.schedule.startMinute).padStart(
                                  2,
                                  "0"
                                )}`
                              : ""
                          }
                          onChange={(e) => {
                            handleTimeChange(item?.workOrderId, e, item.schedule.startHour);
                            // console.log('You are channgeee')
                            // console.log(e.target.value);
                            // setSelectedTime(e.target.value);
                          }}
                          // value={time}
                          placeholder=" Time"
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:text-white"
                          name="name"
                          // {...register("time", { required: "Time is required." })}
                        />
                      </div>
                    </div>
                  </td>

                  {/* work order duration */}
                  <td className="px-5 py-3 text-sm">
                    <label
                      id="duration"
                      className="dropdown inline-block relative"
                    ></label>
                    <select
                      name="level"
                      value={item?.schedule?.cleaningValidPeriod || "Duration"}
                      onChange={(e) =>
                        handleDurationChange(
                          item?.workOrderId,
                          e,
                          item.schedule.cleaningValidPeriod
                        )
                      }
                      disabled={item?.schedule?.startHour == null} // Disable the dropdown if startDate is 0
                    >
                      {/* If there's a valid duration, display it as the first option */}
                      {item.schedule.cleaningValidPeriod ? (
                        <option value={item.schedule.cleaningValidPeriod}>
                          {item.schedule.cleaningValidPeriod}(hrs)
                        </option>
                      ) : (
                        <option value="Duration">Duration(hrs)</option>
                      )}

                      {/* Filter out the selected value, sort the remaining options, and then map them */}
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                        .filter((_) => _ !== item.schedule.cleaningValidPeriod) // Filter out selected value
                        // .sort((a, b) => a - b) // Sort options in ascending order
                        .map((_) => (
                          <option key={_} value={_}>
                            {_}
                          </option>
                        ))}
                    </select>
                  </td>

                  {/* work order start date */}
                  <td className="px-5 py-3 text-sm">
                    <div className="dropdown inline-block relative">
                      <button className="group rounded inline-flex gap-2 items-center">
                        <span className="whitespace-no-wrap text-sm font-normal capitalize">
                          {item?.schedule?.startDate
                            ? item.schedule.startDate.split("T")[0]
                            : "N/A"}
                        </span>
                        <svg
                          className="fill-current text-black dark:text-white h-4 w-4 block opacity-50"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
                        </svg>
                      </button>
                      {/* Render DatePicker only if startDate is not set and cleaningValidPeriod is not 0 */}
                      {item?.schedule?.startDate == null &&
                        item?.schedule?.cleaningValidPeriod > 0 && (
                          <ul className="dropdown-menu rounded-b text-black shadow-md bg-white text-left absolute hidden p-2 w-auto z-50">
                            <li className="d-link w-full p-2 cursor-pointer">
                              <DatePicker
                                selected={startDate}
                                onChange={(date) =>
                                  handleUpdateDate(
                                    date,
                                    item?.workOrderId,
                                    "startDate"
                                  )
                                }
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                inline
                                showDisabledMonthNavigation
                              />
                            </li>
                          </ul>
                        )}
                    </div>
                  </td>

                  {/* work order end date  */}
                  <td className="px-5 py-3   text-sm">
                    <div className="dropdown inline-block relative">
                      {item?.schedule?.endDate == null &&
                        item?.schedule?.cleaningValidPeriod > 0 && (
                          <ul className="dropdown-menu rounded-b text-black shadow-md bg-white text-left absolute hidden p-2 w-auto z-50">
                            <li className="d-link w-full p-2 cursor-pointer">
                              <DatePicker
                                selected={startDate}
                                onChange={(date) =>
                                  handleEndDate(
                                    date,
                                    item?.workOrderId,
                                    item?.endDate
                                  )
                                }
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                inline
                                showDisabledMonthNavigation
                              />
                            </li>
                            {/* <li className="d-link w-full p-2 cursor-pointer">
                        <p className="font-extralight text-sm">Kene </p>
                      </li> */}
                          </ul>
                        )}
                      <button className="  group  rounded inline-flex gap-2 items-center">
                        <span className=" whitespace-no-wrap text-sm font-normal    capitalize">
                          {item?.schedule?.endDate
                            ? item?.schedule?.endDate.split("T")[0]
                            : "N/A"}
                        </span>
                        <svg
                          className="fill-current text-black dark:text-white h-4 w-4 block opacity-50"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
                        </svg>
                      </button>
                              
                    </div>
                  </td>

                  {/* former work order cleaning duration */}
                  {/* <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.schedule?.cleaningValidPeriod
                        ? item?.schedule?.cleaningValidPeriod
                        : 0}
                    </p>
                  </td> */}

                  {/* work order team */}
                  <td className="px-5 py-3   text-sm">
                    <button
                      className=" flex gap-2 items-center capitalize "
                      onClick={(e) => {
                        if (
                          item?.schedule.startDate !== null &&
                          item?.schedule.endDate !== null &&
                          item.schedule.cleaningValidPeriod > 0
                        ) {
                          dispatch(setId(item?.workOrderId));
                          dispatch(setItem(item?.assignees?.team));
                          // set the roomId and startHour in state
                          dispatch(setRoomId(item?.assetTask?.roomId));
                          dispatch(setHour(item?.schedule?.startHour));
                          openTeams(e);
                        }
                      }}
                    >
                      {/* Display team names if available */}
                      {item?.assignees?.team.length > 0 ? (
                        <>
                          {/* Display up to 2 team names */}
                          {item.assignees.team
                            .slice(0, 2)
                            .map((team, index) => (
                              <span key={index}>
                                {team.teamName}
                                {index <
                                  Math.min(1, item.assignees.team.length - 1) &&
                                  ", "}
                              </span>
                            ))}
                          {item.assignees.team.length > 2 && "..."}
                          {/* <FaUsers className="dark:text-white text-black text-xl ml-2" /> */}
                        </>
                      ) : item?.assignees?.cleaners.length > 0 ? (
                        <>
                          {/* Display up to 2 cleaner names */}
                          {item.assignees.cleaners
                            .slice(0, 2)
                            .map((cleaner, index) => (
                              <span key={index}>
                                {cleaner.username}
                                {index <
                                  Math.min(
                                    1,
                                    item.assignees.cleaners.length - 1
                                  ) && ", "}
                              </span>
                            ))}
                          {item.assignees.cleaners.length > 2 && "..."}
                          {/* <FaUsers className="dark:text-white text-black text-xl ml-2" /> */}
                        </>
                      ) : (
                        <FaUsers className="dark:text-white text-black text-xl" />
                      )}
                      <svg
                        className="fill-current text-black dark:text-white h-7 w-7 block opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
                      </svg>
                    </button>
                  </td>

                  {/* work order supervisor */}
                  <td className="px-5 py-4   text-sm">
                    <div className="">
                      <button
                        title="Supervisors"
                        onClick={(e) => {
                          if (
                            item?.schedule.startDate !== null &&
                            item?.schedule.endDate !== null &&
                            item.schedule.cleaningValidPeriod > 0
                          ) {
                            dispatch(setId(item?.workOrderId));
                            dispatch(setItem(item?.assignees?.inspectors));
                            dispatch(setRoomId(item?.assetTask?.roomId));
                            dispatch(setHour(item?.schedule?.startHour));
                            openInspectors(e);
                          }
                        }}
                        className="  group  rounded inline-flex gap-2 items-center capitalize"
                      >
                        {item?.assignees?.inspectors.length > 0 ? (
                          <>
                            {/* Display up to 2 cleaner names */}
                            {item.assignees.inspectors
                              .slice(0, 2)
                              .map((inspector, index) => (
                                <span key={index}>
                                  {inspector.username}
                                  {index <
                                    Math.min(
                                      1,
                                      item.assignees.inspectors.length - 1
                                    ) && ", "}
                                </span>
                              ))}
                            {item.assignees.inspectors.length > 2 && "..."}
                            {/* <FaUsers className="dark:text-white text-black text-xl ml-2" /> */}
                          </>
                        ) : (
                          <FaUsers className="dark:text-white text-black text-xl" />
                        )}

                        <svg
                          className="fill-current text-black dark:text-white h-7 w-7 block opacity-50"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
                        </svg>
                      </button>
                              
                    </div>
                  </td>

                  {/*work order settings  */}
                  <td className="px-5 py-3    text-sm ">
                    <div className="flex items-center">
                      <button
                        value={"del"}
                        onClick={(e) => {
                          dispatch(setId(item?.workOrderId));
                          openDel(e);
                        }}
                        className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                      >
                        <IoSettings className="dark:text-white text-black text-xl text-center" />
                      </button>

                      {/* <Link
                      className=" underline text-black ml-3"
                      href={"/dashboard/work-order/view-order"}
                    >
                      View
                    </Link> */}
                    </div>
                  </td>
                  {/* <td className="px-5 py-3   text-sm">
                  <div className="dropdown inline-block relative">
                    <button className="  group px-4 rounded inline-flex gap-2 items-center">
                      <span className=" whitespace-no-wrap text-sm font-normal    capitalize">
                        Pending
                      </span>
                      <svg
                        className="fill-current text-black h-4 w-4 block opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
                      </svg>
                    </button>
                    <ul className="dropdown-menu rounded-b text-black shadow-md bg-white text-left absolute hidden p-2 w-40 z-50">
                      <li className="d-link w-full p-2 cursor-pointer">
                        <p className="font-extralight text-sm">Completed</p>
                      </li>
                      <li className="d-link w-full p-2 cursor-pointer">
                        <p className="font-extralight text-sm">Paused </p>
                      </li>
                    </ul>
                            
                  </div>
                </td> */}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {loading && (
          <div className="flex  justify-center  w-full pt-5">
            <svg
              aria-hidden="true"
              className="w-10 h-10   text-gray-200 animate-spin  fill-sanBlue"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        <ModalComponent
          isOpen={delModalOpen}
          onClose={closeDel}
          setIsModalOpen={setDelModalOpen}
        >
          <SettingsModal closeDel={closeDel} />
        </ModalComponent>
        <ModalComponent
          isOpen={teamsModalOpen}
          onClose={closeTeams}
          setIsModalOpen={setTeamsModalOpen}
        >
          <UpdateTeamsModal closeModal={closeTeams} />
        </ModalComponent>
        <ModalComponent
          isOpen={inspectorsModalOpen}
          onClose={closeInspectors}
          setIsModalOpen={setInspectorsModalOpen}
        >
          <UpdateSupervisorsModal closeModal={closeInspectors} />
        </ModalComponent>
        {!loading && data?.length < 1 && (
          <div className="flex  justify-center  w-full pt-5">
            <p className="text-red-500 text-lg font-bold">
              No Orders available
            </p>
          </div>
        )}
      </div>
    </>
  );
};

function formatDate(dateTimeString) {
  const date = new Date(dateTimeString);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}-${month}-${year}`;
}
