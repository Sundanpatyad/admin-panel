import React, { useEffect, useState } from "react";
import {
  editCandidate,
  fetchCandidates,
  removeCandidate,
} from "../redux/slices/candidateSlice";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import MainLayout from "../layouts/MainLayout";
import StatusDropdown from "../components/StatusDropdown";

function Dashboard() {
  const dispatch = useDispatch();
  const {
    candidates = [],
    status,
    error,
  } = useSelector(
    (state) => state.candidate || { candidates: [], status: null, error: null }
  );
  const [selectedAction, setSelectedAction] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    position: "",
  });

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const handleStatusChange = (candidateId, newStatus) => {
    const candidate = candidates.find((c) => c._id === candidateId);
    if (candidate) {
      dispatch(
        editCandidate({
          id: candidateId,
          candidateData: { ...candidate, status: newStatus },
        })
      );
    }
  };

  const handleDeleteCandidate = (candidateId) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      dispatch(removeCandidate(candidateId));
    }
    setSelectedAction(null);
  };

  const handleAddCandidate = () => {
    console.log("Add candidate clicked");
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = filters.search
      ? candidate.fullName
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        candidate.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.phoneNumber?.includes(filters.search)
      : true;

    const matchesStatus = filters.status
      ? candidate.status === filters.status
      : true;

    const matchesPosition = filters.position
      ? candidate.position?.toLowerCase() === filters.position.toLowerCase()
      : true;

    return matchesSearch && matchesStatus && matchesPosition;
  });

  const renderContent = () => {
    if (status === "loading" && candidates.length === 0) {
      return (
        <div className="p-4 sm:p-6 flex justify-center items-center h-64">
          <div className="text-lg sm:text-xl text-gray-600">
            Loading candidates...
          </div>
        </div>
      );
    }

    if (status === "failed" && candidates.length === 0) {
      return (
        <div className="p-4 sm:p-6 flex justify-center items-center h-64">
          <div className="text-lg sm:text-xl text-red-600">Error: {error}</div>
        </div>
      );
    }

    return (
      <div className="bg-white h-[70vh] rounded-xl sm:rounded-3xl overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Sr no.
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Name
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Email
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Phone
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Position
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Exp.
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCandidates.map((candidate, index) => (
                <tr key={candidate._id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {candidate?.fullName}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {candidate?.email}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {candidate?.phoneNumber}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {candidate?.position}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm">
                    <StatusDropdown
                      value={candidate?.status}
                      onChange={(newStatus) =>
                        handleStatusChange(candidate._id, newStatus)
                      }
                    />
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {candidate?.experience || "-"}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm relative">
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() =>
                        setSelectedAction(
                          selectedAction === candidate._id
                            ? null
                            : candidate._id
                        )
                      }
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {selectedAction === candidate._id && (
                      <div className="absolute right-0 mt-2 w-36 sm:w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                            Download Resume
                          </button>
                          <button
                            className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => handleDeleteCandidate(candidate._id)}
                          >
                            Delete Candidate
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredCandidates.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-3 sm:px-6 py-2 sm:py-4 text-center text-xs sm:text-sm text-gray-500"
                  >
                    No candidates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <MainLayout title={"Candidates"}>
      <div className="p-3 sm:p-4 md:p-6">
        <Header
          title="Candidates"
          onAddClick={handleAddCandidate}
          onFilterChange={handleFilterChange}
        />
        {renderContent()}
      </div>
    </MainLayout>
  );
}

export default Dashboard;
