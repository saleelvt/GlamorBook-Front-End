

export const Error=()=>{

    return (

        <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md w-full max-w-md">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-red-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
              />
            </svg>
            <span className="font-bold">Error:</span>
          </div>
          <p className="mt-2 text-sm">{}</p>
        </div>
      </div>
    )

}