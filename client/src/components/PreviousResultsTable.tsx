import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import SelectMenu from "./ui/SelectMenu"
import { IResult, ISelectMenuOption } from "../interfaces"
import { LANGUAGES } from "../constants"
import { selectPrevResults, setPrevResults } from "../app/features/prevResultsSlice"
import Button from "./ui/Button"

const sortByTimeOptions: ISelectMenuOption[] = [
    {
        name: "Newest",
        slug: "newest"
    },
    {
        name: "Oldest",
        slug: "oldest"
    }
]

const languagesWithAll: ISelectMenuOption[] = [
    {
        name: "All",
        slug: "all"
    },
    ...LANGUAGES
]

const PreviousResultsTable = () => {

    const { prevResults } = useSelector(selectPrevResults)
    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        sortByTime: sortByTimeOptions[0],
        sortByLanguage: languagesWithAll[0]
    })

    const [filteredData, setFilteredData] = useState<IResult[]>(prevResults)

    const setSortByTime = (newSortByTime: ISelectMenuOption) => {
        setFilters((prev) => ({...prev, sortByTime: newSortByTime}))
    }

    const setSortByLanguage = (newSortByLanguage: ISelectMenuOption) => {
        setFilters((prev) => ({...prev, sortByLanguage: newSortByLanguage}))
    }

    useEffect(() => {

        let newFilteredData = [...prevResults]

        if (filters.sortByLanguage.slug !== "all") {
            newFilteredData = newFilteredData.filter((result) => result.language === filters.sortByLanguage.name)
        }

        if (filters.sortByTime.slug === "newest") {
            newFilteredData.reverse()
        }

        setFilteredData(newFilteredData)

    }, [filters.sortByLanguage.name, filters.sortByLanguage.slug, filters.sortByTime.slug, prevResults])

    return (
        <section>
            <h2 className="font-bold text-xl md:text-3xl my-10">Previous Results</h2>
            <div className="flex gap-5 justify-between flex-wrap mb-3">
                <SelectMenu
                    title={"Sort by Time"}
                    selected={filters.sortByTime}
                    options={sortByTimeOptions}
                    setSelected={setSortByTime}
                />
                <SelectMenu
                    title={"Sort by Language"}
                    selected={filters.sortByLanguage}
                    options={languagesWithAll}
                    setSelected={setSortByLanguage}
                />
            </div>
            {filteredData.length >= 1 ? (
                <>
                <div className="relative overflow-x-auto rounded-sm bg-white">
                    <table className="w-full text-center">
                        <thead className="font-semibold">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Language
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Attempts
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Points
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Percentage
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Result
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((result, i) => (
                                <tr key={i} className="border-b border-secondary/30">
                                    <td className="px-6 py-4">
                                        {new Date(result.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {result.language}
                                    </td>
                                    <td className="px-6 py-4">
                                        {result.attempts}/{result.questions}
                                    </td>
                                    <td className="px-6 py-4">
                                        {result.earnedPoints}/{result.quizPoints}
                                    </td>
                                    <td className="px-6 py-4">
                                        {result.percentage}%
                                    </td>
                                    <td className={`px-6 py-4 ${result.isPassed ? 'text-green-600' : 'text-red-600'}`}>
                                        {result.isPassed ? "Passed" : "Failed"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="my-10">
                    <Button
                        onClick={() => {
                            dispatch(setPrevResults([]))
                        }}
                        className="bg-red-500 hover:bg-red-600 transition"
                    >
                        Remove Previous Results
                    </Button>
                </div>
                </>
            ) : (
                <p className="text-2xl text-center mt-10">No previous results found.</p>
            )}
        </section>
    )
}

export default PreviousResultsTable