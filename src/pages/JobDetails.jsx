import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import { jwtDecode } from "jwt-decode";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [userId, setUserId] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data.job);

        // Check if user already applied
        const applied = res.data.job.applicants?.some(
          (app) => app.user?._id === userId
        );
        setAlreadyApplied(applied);
      } catch (err) {
        console.error("Error loading job:", err);
      }
    };

    if (userId) fetchJob();
  }, [id, userId]);

  if (!job) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded shadow mt-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{job.title}</h1>
      <h2 className="text-xl font-semibold text-gray-700">{job.company}</h2>

      <div className="mt-4 space-y-2 text-gray-600">
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Type:</strong> {job.type}</p>
        <p><strong>Posted By:</strong> {job.postedBy?.name} ({job.postedBy?.email})</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-1">Job Description</h3>
        <p className="text-gray-800 whitespace-pre-line">{job.description}</p>
      </div>

      {alreadyApplied ? (
        <p className="mt-6 text-green-700 font-semibold">
          ✅ You have already applied to this job.
        </p>
      ) : (
        <Link
          to={`/apply/${job._id}`}
          className="inline-block mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Apply Now
        </Link>
      )}
    </div>
  );
};

export default JobDetails;
