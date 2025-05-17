const QuestionSkeleton = () => {
    return (
        <div role="status" className="animate-pulse mt-12">
            <div className="h-16 w-full mb-12 bg-gray-400 rounded"></div>
            <div className="h-12 w-full mb-5 bg-gray-300 rounded"></div>
            <div className="h-12 w-full mb-5 bg-gray-300 rounded"></div>
            <div className="h-12 w-full mb-12 bg-gray-300 rounded"></div>
            <div className="flex justify-between">
                <div className="h-12 w-24 bg-gray-300 rounded"></div>
                <div className="h-12 w-24 bg-gray-300 rounded"></div>
            </div>
        </div>
    )
}

export default QuestionSkeleton;