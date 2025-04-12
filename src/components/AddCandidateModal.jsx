import React, { useState } from "react";

const AddCandidateModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    experience: "",
    resume: null,
    agreement: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] overflow-hidden">
        <div className="bg-[#4D007D] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl w-full text-center font-semibold">
            Add New Candidate
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="Full Name*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Position*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Experience*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                required
              />
            </div>
            <div className="relative">
              <input
                type="file"
                placeholder="Resume*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                onChange={(e) =>
                  setFormData({ ...formData, resume: e.target.files[0] })
                }
                accept=".pdf,.doc,.docx"
              />
              <svg
                className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-purple-700 rounded border-gray-300 focus:ring-purple-500"
                checked={formData.agreement}
                onChange={(e) =>
                  setFormData({ ...formData, agreement: e.target.checked })
                }
                required
              />
              <span className="text-sm text-gray-600">
                I hereby declare that the above information is true to the best
                of my knowledge and belief
              </span>
            </label>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidateModal;
