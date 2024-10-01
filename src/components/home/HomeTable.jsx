"use client";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import {
  FaArrowUp,
  FaEnvelopeOpenText,
  FaNotesMedical,
  FaPencilAlt,
  FaSearchPlus,
  FaUserCheck,
} from "react-icons/fa";
// import ModalComponent from "../modals/Modal";
// import NotesModal from "./NotesModal";
// import useStats from "@/hooks/useStats";
// import { ItemsContext } from "../context/items.context";
// import EvidenceModal from "../evidence/EvidenceModal";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import BarChart from "./BarChart";
import PieChart3D from "./PieChart";
import Histogram from "./Histogram";
import HorizonChart from "./HorizontalChart";
import { Roles } from "@/constant/roles";
import useStats from "@/hooks/useStats";
import { useSelector } from "react-redux";


export function SortableTable() {
  const { mssOverview, getMssOverview, loading } = useStats();
  const newRole = typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const [selectedFilter, setSelectedFilter] = useState('all')
  const selectedFacilityId = useSelector((state) => state.facility.selectedFacilityId);
  const [newData, setMssData] = useState([])
  const validRoles = [Roles.MANAGER.toLowerCase(), Roles.INSPECTOR.toLowerCase(), Roles.SUPERVISOR.toLowerCase()];
  const [filtered, setFiltered] = useState([]);

  const fetchData = async () => {
    if (validRoles.includes(newRole?.toLocaleLowerCase())) {
      await getMssOverview(selectedFacilityId, selectedFilter);
    } else {
      await getMssOverview(null, selectedFilter);
    }
  };

  useEffect(() => {
    const updateData = async () => {
      await fetchData(); // Ensure fetchData is called
    }
    updateData();
  }, [selectedFacilityId, selectedFilter]);

  useEffect(() => {
    // This effect will run when mssOverview is updated
    if (mssOverview) {
      console.log('mssOverview is updated:', mssOverview);
      setMssData(mssOverview); // Update newData state
      setFiltered(mssOverview); // Update filtered state
    }
  }, [mssOverview]);
  
  useEffect(() => {
    console.log('Updated new filtered data:', filtered);
  }, [filtered]);

  let searchTimeout;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEvi, setIsModalOpenEvi] = useState(false);


  const openModalEvi = (e) => {
    setIsModalOpenEvi(true);
  };

  const closeModalEvi = () => {
    setIsModalOpenEvi(false);
  };
  const openModal = (e) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const { newData, getMss } = useStats();
  // useEffect(() => {
  //   getMss();
  // }, []);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100);

  // ...

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(filtered.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  // const { setItems } = useContext(ItemsContext);
  // console.log("mss", newData);
  function formatDate(dateString) {
    const date = new Date(dateString);
    // Set hours to 0 to remove time portion

    return date.toISOString().slice(0, 10);
  }

  // useEffect(() => {
  //   setFiltered(newData);
  // }, [newData]);
  console.log('filtered data is', filtered)
  const filterTab = (value) => {
    if (value === "all") {
      setFiltered(newData);
    } else if (value?.toLowerCase() === "yes") {
      console.log("valet", value?.toLowerCase());
      const filteredValue = newData.filter(
        (item) => item?.mostRecentTask?.isDone === "Yes"
      );
      console.log(filteredValue);
      setFiltered(filteredValue);
    } else if (value !== "all" || value?.toLowerCase() !== "yes") {
      console.log("valetq", value);
      const filteredValue = newData.filter(
        (item) => item?.asset?.frequency?.toLowerCase() === value
      );
      console.log(filteredValue);
      setFiltered(filteredValue);
    }
  };
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (e.target.value.length > 0) {
        const filteredValue = newData.filter(
          (item) =>
            item?.asset?.roomId?.roomName
              ?.toLowerCase()
              .includes(e.target.value?.toLowerCase())
              .includes(e.target.value?.toLowerCase()) ||
            item?.asset?.name
              ?.toLowerCase()
              .includes(e.target.value?.toLowerCase())
        );
        console.log("ewo", filteredValue);
        setFiltered(filteredValue);
      }
      if (e.target.value === "") {
        setFiltered(newData);
      }
    }, 1000);
  };
  const handleChangeStatus = (e) => {
    e.preventDefault();
    console.log("first", e.target.value);
    if (e.target.value === "Approved") {
      const filteredValue = newData.filter(
        (item) => item?.mostRecentTask?.isApproved
      );

      console.log("ewo", filteredValue);
      setFiltered(filteredValue);
    } else if (e.target.value === "Submitted") {
      const filteredValue = newData.filter(
        (item) => item?.mostRecentTask?.isDone
      );

      console.log("ewo", filteredValue);
      setFiltered(filteredValue);
    } else if (e.target.value === "all") {
      setFiltered(newData);
    }
  };
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    console.log(key);
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...currentItems];
  if (sortBy) {
    sortedData.sort((a, b) => {
      const sortValueA = a.item[sortBy];
      const sortValueB = b.item[sortBy];

      if (typeof sortValueA === "string") {
        return sortOrder === "asc"
          ? sortValueA.localeCompare(sortValueB)
          : sortValueB.localeCompare(sortValueA);
      } else {
        return sortOrder === "asc"
          ? sortValueA - sortValueB
          : sortValueB - sortValueA;
      }
    });
  } else if (sortBy === "username") {
    sortedData.sort((a, b) => {
      const sortValueA = a.item?.itemEvidence?.uploaded_by[sortBy];
      const sortValueB = b.item?.itemEvidence?.uploaded_by[sortBy];

      if (typeof sortValueA === "string") {
        return sortOrder === "asc"
          ? sortValueA.localeCompare(sortValueB)
          : sortValueB.localeCompare(sortValueA);
      } else {
        return sortOrder === "asc"
          ? sortValueA - sortValueB
          : sortValueB - sortValueA;
      }
    });
  } else if (sortBy === "isApproved") {
    sortedData.sort((a, b) => {
      const sortValueA = a.item?.mostRecentTask[sortBy];
      const sortValueB = b.tem?.mostRecentTask[sortBy];

      if (sortValueA) {
        return sortOrder === "asc"
          ? sortValueA.localeCompare(sortValueB)
          : sortValueB.localeCompare(sortValueA);
      } else {
        return sortOrder === "asc"
          ? sortValueA - sortValueB
          : sortValueB - sortValueA;
      }
    });
  }

  const isActive = (type) => {
    switch (type) {
      case "done":
        return selectedFilter === 'done';
      case "ongoing":
        return selectedFilter === 'ongoing'
      case "pastDue":
        return selectedFilter === 'pastDue'
      case "all":
        return selectedFilter === 'all'
      default:
        return "ongoing";
    }
  };

  const handleTabClick =(type) => { 
    switch (type) {
      case "done":
        setSelectedFilter('done');
        break;
      case "ongoing":
        setSelectedFilter('ongoing');
        break;
      case "pastDue":
        setSelectedFilter('pastDue');
        break;
      case "all":
      setSelectedFilter('all');
      break;
      default:
        setSelectedFilter('ongoing');
    }
  }

  useEffect(()=> { 
    console.log('hii we changed the selected filter', selectedFilter)
  }, [selectedFilter])
  // const sortedData = sortBy
  // ? currentItems.sort((a, b) => {
  //     if (a[sortBy] < b[sortBy]) {
  //       return sortOrder === 'asc' ? -1 : 1;
  //     }
  //     if (a[sortBy] > b[sortBy]) {
  //       return sortOrder === 'asc' ? 1 : -1;
  //     }
  //     return 0;
  //   })
  // : currentItems;
  function formatDate(dateString) {
    const date = new Date(dateString);
    // Set hours to 0 to remove time portion

    return date.toISOString().slice(0, 10);
  }
  console.log("sort", sortedData);
  return (
    <>
      <main className="flex flex-col lg:flex-row items-start space-x-4 space-y-4 w-full lg:mt-10 mt-5">
        <div className="w-full lg:w-3/5">
          <BarChart />
        </div>
        <div className="w-full lg:w-2/5">
          <PieChart3D />
        </div>
      </main>
      <main className="flex flex-col lg:flex-row items-start space-x-4 space-y-4 w-full mt-4">
        <div className="w-full  lg:w-2/5">
          <HorizonChart />
        </div>
        <div className="w-full  lg:w-3/5">
          <Histogram />
        </div>
      </main>
      <Card className="h-full w-full p-5 lg:mt-10 mt-5">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                MSS Daily Item List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal ">
                See Information on all items based on status
              </Typography>
            </div>
         
          </div>
          <div className="flex lg:flex-row gap-y-4 items-center flex-col gap-x-4  mb-5 ">
          <div className="flex flex-col lg:flex-row w-full ">
            <button
              onClick={() => handleTabClick("all")}
              className={`py-2 px-4 border-gray-300 border-r transition ${
                isActive("all")
                  ? "bg-white text-black w-full lg:w-72 shadow-lg"
                  : "bg-gray-400 text-black w-full lg:w-72 hover:bg-sanBlue hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleTabClick("ongoing")}
              className={`py-2 px-4 border-gray-300 border-r transition ${
                isActive("ongoing")
                  ? "bg-white text-black w-full lg:w-72 shadow-lg"
                  : "bg-gray-400 text-black w-full lg:w-72 hover:bg-sanBlue hover:text-white"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => handleTabClick("pastDue")}
              className={`py-2 px-4 border-gray-300 border-r transition ${
                isActive("pastDue")
                  ? "bg-white text-black w-full lg:w-72 shadow-lg "
                  : "bg-gray-400 text-black w-full lg:w-72 hover:bg-sanBlue hover:text-white"
              }`}
            >
              PastDue
            </button>
            <button
              onClick={() => handleTabClick("done")}
              className={`py-2 px-4 border-gray-300 border-r transition ${
                isActive("done")
                  ? "bg-white text-black w-full lg:w-72 shadow-lg "
                  : "bg-gray-400 text-black w-full lg:w-72 hover:bg-sanBlue hover:text-white"
              }`}
            >
              Done
            </button>
          </div>
          {/* <div className="w-full">
            <DatePicker
              // selected={startDate}
              onChange={onStartChange}
              customInput={<ButtonInput type={"start"} />}
              showDisabledMonthNavigation
            />
          </div> */}

        {/* <div className="mt-8">
          <h2 className="text-xl font-bold">Selected Date:</h2>
          <p className="text-lg mt-2">{format(selectedDate, "yyyy-MM-dd")}</p>
        </div> */}
      </div>
        </CardHeader>

        <CardBody className="overflow-scroll px-0 no-scrollbar">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
          <thead>
            <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                S/N
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
                Frequency
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Cleaned
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Approved
              </th>
              
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Assigned To
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Supervised By
              </th>
             
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Last Cleaned
              </th>
              {/* <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Next Clean Date
              </th> */}
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                
              </th>
            </tr>
          </thead>
            <tbody>
              {sortedData.length === 0 ? (
                <tr>
                  <td colSpan="10" className="p-4 text-center font-bold text-red-500">
                    No work order task is currently {selectedFilter} for today 
                  </td>
                </tr>
              ) : (
                sortedData.map((item, index) => {
                  const isLast = index === newData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={item?.item?._id}>
                      <td className={classes}>{index+1}</td>
                      <td className={classes}>
                        <div className="flex items-center gap-3 ">
                      
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item?.workOrderDetails?.assetTaskType?.roomId?.roomName
                                ? item?.workOrderDetails?.assetTaskType?.roomId?.roomName
                                : "N/A"}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.workOrderDetails?.assetTaskType?.assetId?.assetPrefix}{item?.workOrderDetails?.assetTaskType?.assetId?.assetCode}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal capitalize"
                        >
                          {item?.workOrderDetails?.assetTaskType?.assetId?.name
                            ? item?.workOrderDetails?.assetTaskType?.assetId?.name
                            : "N/A"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.workOrderDetails?.assetTaskType?.cleaningType?.name
                            ? item?.workOrderDetails?.assetTaskType?.cleaningType?.name
                            : "N/A"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.workOrderDetails?.assetTaskType?.cleaningTypeFrequency?.name
                              ? item?.workOrderDetails?.assetTaskType?.cleaningTypeFrequency?.name
                              : "N/A"}
                          </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          style={{ color: item?.workOrderDetails?.isDone ? 'green' : 'red' }}
                          className="font-normal capitalize"
                        >
                          {item?.workOrderDetails?.isDone ? 'Yes' : 'No'}
                        </Typography>
                      </td>
                      <td className={classes}>
                      <Typography
                          variant="small"
                          style={{ color: item?.workOrderDetails?.isApproved ? 'green' : 'red' }}
                          className="font-normal capitalize"
                        >
                          {item?.workOrderDetails?.isApproved ? 'Yes' : 'No'}
                        </Typography>
                      </td>
                      {/* Assigned to cleaner */}
                      <td className={classes}>
                        {Array.isArray(item.team) &&
                          item.team.length === 0 &&
                          Array.isArray(item.cleaner) &&
                          item.cleaner.length === 0
                            ? "NA"
                            : Array.isArray(item.team) && item.team.length > 0
                            ? item.team.map((t) => t.teamName).join(", ")
                            : Array.isArray(item.cleaner) && item.cleaner.length > 0
                            ? item.cleaner
                                .slice(0, 5)
                                .map((c) => c.username)
                                .join(", ")
                            : "NA"}
                      </td>

                      {/* Assigned to supervisor */}
                      <td className={classes}>
                        {Array.isArray(item.team) &&
                          item.team.length === 0 &&
                          Array.isArray(item.supervisor) &&
                          item.cleaner.length === 0
                            ? "NA"
                            : Array.isArray(item.supervisor) &&
                              item.supervisor.length > 0
                            ? item.supervisor
                                .slice(0, 5)
                                .map((c) => c.username)
                                .join(", ")
                            : Array.isArray(item.team) && item.team.length > 0
                            ? item.team.map((t) => t.teamName).join(", ")
                            : "NA"}
                      </td>

                      <td className={classes}>
                        {item?.workOrderDetails?.lastCleaned === "null" || item?.workOrderDetails?.lastCleaned == null
                          ? "N/A"
                          : item?.workOrderDetails?.lastCleaned?.slice(0, 10)}
                      </td>

                      {/* <td className={classes}>
                        <Tooltip content="View Notes">
                          <IconButton variant="text">
                            <FaEnvelopeOpenText
                              className="h-4 w-4 text-center"
                            
                            />
                          </IconButton>
                        </Tooltip>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal capitalize"
                        >
                        
                        </Typography>
                      </td> */}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {`Page ${currentPage} of ${Math.ceil(
              newData?.length / itemsPerPage
            )}`}
          </Typography>
          <div className="flex gap-2">
            <Button onClick={() => previousPage()} variant="outlined" size="sm">
              Previous
            </Button>
            <Button onClick={() => nextPage()} variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
       
      </Card>
    </>
  );
}
