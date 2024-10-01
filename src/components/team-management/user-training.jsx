import TopLayout from "../user-management/TopLayout"


const DataTable = ({ data }) => (
    <div className='overflow-x-auto w-full  flex flex-col no-scrollbar py-5 h-auto'>
        {/* <h1 className='font-bold'>{title}</h1> */}
        <table className="table-auto w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
            <thead>
                <tr className="border-gray-200  whitespace-nowrap border-2 bg-white">
                    <th className=" px-5 py-3 text-center text-sm  text-gray-500 font-semibold capitalize tracking-wider">
                        S/N
                    </th>
                    <th className=" px-5 py-3 text-left  text-sm  shrink-1 text-gray-500 font-semibold capitalize tracking-wider">
                        LMS Training
                    </th>
                    <th className=" px-5 py-3 text-center  text-sm  shrink-1 text-gray-500 font-semibold capitalize tracking-wider">
                        Start Date
                    </th>
                    <th className=" px-5 py-3 text-center  text-sm  shrink-1 text-gray-500 font-semibold capitalize tracking-wider">
                        Finish Date
                    </th>
                    <th className=" px-5 py-3 text-center  text-sm  shrink-1 text-gray-500 font-semibold capitalize tracking-wider">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody className="shadow-lg w-full">
                {data?.map((table_data) => (
                    <tr key={table_data.id} className="border-b  border-gray-200 whitespace-nowrap">
                        <td className="px-5 py-3 text-center   text-sm">
                            <p>{table_data.id}</p>
                        </td>
                        <td className="px-5 py-3   text-sm">
                            <p>{table_data.training_name}</p>
                        </td>
                        <td className="px-5 py-3 text-center   text-sm">
                            <p>{table_data.startDate}</p>
                        </td>
                        <td className="px-5 py-3  text-center  text-sm">
                            <p>{table_data.finishDate}</p>
                        </td>
                        <td className="px-5 py-3  text-center  text-sm">
                            <p
                                className={`rounded-md text-center w-fit px-2 mx-auto 
                            ${table_data.status === "Completed" && " text-green-900 bg-blue-300/30"}
                            ${table_data.status === "InProgress" && " text-orange-400 bg-orange-200/40"}
                            ${table_data.status === "Dropped" && " text-pink-600 bg-pink-300/30"}
                            `}>
                                {table_data.status}
                            </p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


export default function UserTraining() {

    const trainings = [
        { id: 1, training_name: "React Basics", startDate: "Jan 01, 2024", finishDate: "Jan 15, 2024", status: "Completed" },
        { id: 2, training_name: "Advanced JavaScript", startDate: "Feb 01, 2024", finishDate: "Feb 20, 2024", status: "InProgress" },
        { id: 3, training_name: "Node.js Essentials", startDate: "Mar 01, 2024", finishDate: "Mar 10, 2024", status: "Dropped" },
        { id: 4, training_name: "Python for Data Science", startDate: "Apr 01, 2024", finishDate: "Apr 20, 2024", status: "Completed" },
        { id: 5, training_name: "Machine Learning Basics", startDate: "May 01, 2024", finishDate: "May 25, 2024", status: "InProgress" },
        { id: 6, training_name: "SQL Database Management", startDate: "Jun 01, 2024", finishDate: "Jun 15, 2024", status: "Completed" },
        { id: 7, training_name: "Web Development with HTML & CSS", startDate: "Jul 01, 2024", finishDate: "Jul 20, 2024", status: "Completed" },
        { id: 8, training_name: "Cybersecurity Basics", startDate: "Aug 01, 2024", finishDate: "Aug 15, 2024", status: "InProgress" },
        { id: 9, training_name: "Project Management", startDate: "Sep 01, 2024", finishDate: "Sep 10, 2024", status: "Dropped" },
        { id: 10, training_name: "UI/UX Design Fundamentals", startDate: "Oct 01, 2024", finishDate: "Oct 25, 2024", status: "Completed" },
        { id: 11, training_name: "DevOps Practices", startDate: "Nov 01, 2024", finishDate: "Nov 20, 2024", status: "Completed" },
        { id: 12, training_name: "Cloud Computing with AWS", startDate: "Dec 01, 2024", finishDate: "Dec 15, 2024", status: "InProgress" },
        { id: 13, training_name: "Big Data Analysis", startDate: "Jan 01, 2025", finishDate: "Jan 20, 2025", status: "Completed" },
        { id: 14, training_name: "Data Visualization with Tableau", startDate: "Feb 01, 2025", finishDate: "Feb 15, 2025", status: "Completed" },
        { id: 15, training_name: "Artificial Intelligence Basics", startDate: "Mar 01, 2025", finishDate: "Mar 25, 2025", status: "Dropped" },
        { id: 16, training_name: "Blockchain Technology", startDate: "Apr 01, 2025", finishDate: "Apr 20, 2025", status: "InProgress" },
        { id: 17, training_name: "Internet of Things (IoT)", startDate: "May 01, 2025", finishDate: "May 15, 2025", status: "Completed" },
        { id: 18, training_name: "Agile Methodology", startDate: "Jun 01, 2025", finishDate: "Jun 20, 2025", status: "Completed" },
        { id: 19, training_name: "Software Testing", startDate: "Jul 01, 2025", finishDate: "Jul 15, 2025", status: "InProgress" },
        { id: 20, training_name: "Ethical Hacking", startDate: "Aug 01, 2025", finishDate: "Aug 25, 2025", status: "Completed" }
    ];

    return (
        <div className="w-full px-4 sm:px-5">
            <TopLayout heading={"Teams"} paragraph={"Manage, create and oversee team management within the system."} hideBtn={true} />
            <DataTable data={trainings} />
        </div>
    )
}
