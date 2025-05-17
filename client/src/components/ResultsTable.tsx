import { useSelector } from "react-redux"
import { selectResults } from "../app/features/resultsSlice"
import { useEffect, useState } from "react"
import SelectMenu from "./ui/SelectMenu"
import { ICategory, IResult, ISelectMenuOption } from "../interfaces"
import { categories } from "../constants"

const sortByTimeOptions: ISelectMenuOption[] = [
    {
        id: crypto.randomUUID(),
        name: "Oldest",
        slug: "oldest"
    },
    {
        id: crypto.randomUUID(),
        name: "Newest",
        slug: "newest"
    },
]

const categoriesWithAll: ICategory[] = [
    {
        id: crypto.randomUUID(),
        name: "All",
        slug: "all"
    },
    ...categories
]

const ResultsTable = () => {

    const { results } = useSelector(selectResults)

    const [filters, setFilters] = useState({
        sortByTime: sortByTimeOptions[1],
        sortByCategory: categoriesWithAll[0]
    })

    const [filteredData, setFilteredData] = useState<IResult[]>(results)

    const setSortByTime = (newSortByTime: ISelectMenuOption) => {
        setFilters((prev) => ({...prev, sortByTime: newSortByTime}))
    }

    const setSortByCategory = (newSortByCategory: ISelectMenuOption) => {
        setFilters((prev) => ({...prev, sortByCategory: newSortByCategory}))
    }

    useEffect(() => {

        let newFilteredData

        if (filters.sortByCategory.slug === "all") {
            newFilteredData = results.filter(() => true)
        } else {
            newFilteredData = results.filter((result) => {
                return result.categoryName === filters.sortByCategory.name
            })
        }

        if (filters.sortByTime.slug === "oldest") {
            setFilteredData(newFilteredData)
        } else if (filters.sortByTime.slug === "newest") {
            newFilteredData = newFilteredData.reverse()
            setFilteredData(newFilteredData)
        }
    }, [filters.sortByCategory.name, filters.sortByCategory.slug, filters.sortByTime.slug, results])

    const calculateTotalPassed = () => {
        return filteredData.filter((result) => result.isPassed).length
    }

    return (
        <>
        <div className="flex gap-5 justify-between flex-wrap my-3">
            <SelectMenu
                title={"sort by time"}
                selected={filters.sortByTime}
                options={sortByTimeOptions}
                setSelected={setSortByTime}
            />
            <SelectMenu
                title={"sort by category"}
                selected={filters.sortByCategory}
                options={categoriesWithAll}
                setSelected={setSortByCategory}
            />
        </div>
        {filteredData.length < 1 ? (
            <p className="text-2xl text-center mt-5">No results found!</p>
        ) : (
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-lg bg-dark-blue-color text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
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
                                    {result.categoryName}
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
                        <tr className="bg-primary-color border-b text-white">
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
        )}
        </>
    )
}

export default ResultsTable