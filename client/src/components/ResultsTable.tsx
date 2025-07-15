import { useSelector } from "react-redux"
import { selectResults } from "../app/features/resultsSlice"
import { useEffect, useState } from "react"
import SelectMenu from "./ui/SelectMenu"
import { IResult, ISelectMenuOption } from "../interfaces"
import { LANGUAGES } from "../constants"

const sortByTimeOptions: ISelectMenuOption[] = [
    {
        name: "Oldest",
        slug: "oldest"
    },
    {
        name: "Newest",
        slug: "newest"
    }
]

const languagesWithAll: ISelectMenuOption[] = [
    {
        name: "All",
        slug: "all"
    },
    ...LANGUAGES
]

const ResultsTable = () => {

    const { results } = useSelector(selectResults)

    const [filters, setFilters] = useState({
        sortByTime: sortByTimeOptions[1],
        sortByLanguage: languagesWithAll[0]
    })

    const [filteredData, setFilteredData] = useState<IResult[]>(results)

    const setSortByTime = (newSortByTime: ISelectMenuOption) => {
        setFilters((prev) => ({...prev, sortByTime: newSortByTime}))
    }

    const setSortByLanguage = (newSortByLanguage: ISelectMenuOption) => {
        setFilters((prev) => ({...prev, sortByLanguage: newSortByLanguage}))
    }

    useEffect(() => {

        let newFilteredData

        if (filters.sortByLanguage.slug === "all") {
            newFilteredData = results.filter(() => true)
        } else {
            newFilteredData = results.filter((result) => {
                return result.language === filters.sortByLanguage.name
            })
        }

        if (filters.sortByTime.slug === "oldest") {
            setFilteredData(newFilteredData)
        } else if (filters.sortByTime.slug === "newest") {
            newFilteredData = newFilteredData.reverse()
            setFilteredData(newFilteredData)
        }
    }, [filters.sortByLanguage.name, filters.sortByLanguage.slug, filters.sortByTime.slug, results])

    const calculateTotalPassed = () => {
        return filteredData.filter((result) => result.isPassed).length
    }

    return (
        <section>
            <div className="flex gap-5 justify-between flex-wrap my-3">
                <SelectMenu
                    title={"sort by time"}
                    selected={filters.sortByTime}
                    options={sortByTimeOptions}
                    setSelected={setSortByTime}
                />
                <SelectMenu
                    title={"sort by language"}
                    selected={filters.sortByLanguage}
                    options={languagesWithAll}
                    setSelected={setSortByLanguage}
                />
            </div>
            {filteredData.length > 1 ? (
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-center text-gray-500">
                        <thead className="text-lg bg-dark-blue-color text-white">
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
                                    Earned Points
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
                                <tr key={i} className="bg-white border-b border-gray-200">
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
                                    <td className={`px-6 py-4 ${result.isPassed ? 'text-green-500' : 'text-red-600'}`}>
                                        {result.isPassed ? "Passed" : "Failed"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-primary border-b text-white">
                                <td className="px-6 py-2">Total Quizes: </td>
                                <td className="px-6 py-2">{filteredData.length}</td>
                                <td className="px-6 py-2"></td>
                                <td className="px-6 py-2"></td>
                                <td className="px-6 py-2">Total Passed: </td>
                                <td className="px-6 py-2">{calculateTotalPassed()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <p className="text-2xl text-center mt-5">No results found!</p>
            )}
        </section>
    )
}

export default ResultsTable