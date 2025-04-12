import React from "react";

const SkeletonLoader = ({ rows = 5 }) => {
  return (
    <div className="animate-pulse">
      <div className="bg-white h-auto sm:h-[70vh] rounded-lg overflow-hidden sm:rounded-3xl shadow">
        <div className="w-full min-w-[800px]">
          {/* Header */}
          <div className="bg-purple-200 w-full">
            <div className="grid grid-cols-8 px-3 sm:px-6 py-3">
              {Array(8)
                .fill()
                .map((_, index) => (
                  <div key={index} className="h-4 bg-purple-300 rounded"></div>
                ))}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-200">
            {Array(rows)
              .fill()
              .map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid grid-cols-8 px-3 sm:px-6 py-4"
                >
                  {Array(8)
                    .fill()
                    .map((_, colIndex) => (
                      <div
                        key={colIndex}
                        className={`h-5 bg-gray-200 rounded ${
                          colIndex === 5 ? "w-[132px]" : "w-4/5"
                        }`}
                      ></div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
