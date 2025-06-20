import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data.jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="p-4 border rounded hover:shadow transition"
            >
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p>{job.description.slice(0, 80)}...</p>
              <Link
                to={`/job/${job._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
