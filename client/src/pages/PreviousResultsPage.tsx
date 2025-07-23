import { Link } from "react-router-dom"
import PreviousResultsTable from "../components/PreviousResultsTable"

const PreviousResultsPage = () => {
    return (
        <>
        <Link
            to={"/"}
            className="px-6 py-3 rounded-md block text-center bg-primary text-white font-semibold"
        >
            Start New Quiz
        </Link>
        <PreviousResultsTable />
        </>
    )
}

export default PreviousResultsPage