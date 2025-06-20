import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        jobId: id,
        resumeUrl,
        message: note
      };

      await API.post(`/apply/${id}`, payload);
      setMessage("Applied successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Already applied or error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Apply for this Job</h2>
      <form onSubmit={handleApply} className="space-y-4">
        <input
          type="text"
          placeholder="Resume Link (Google Drive / PDF URL)"
          className="w-full border p-2 rounded"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          required
        />
        <textarea
          placeholder="Write a message (optional)"
          className="w-full border p-2 rounded"
          rows="4"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default ApplyJob;
