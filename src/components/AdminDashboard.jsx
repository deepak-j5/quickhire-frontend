import React from 'react'

function AdminDashboard() {
  useEffect(() => {
  API.get("/dashboard").then(res => setJobs(res.data.jobs));
}, []);

return jobs.map(job => (
  <div key={job._id} className="glass-card">
    <h2>{job.title}</h2>
    {job.applicants.map(app => (
      <div key={app._id}>
        <p>{app.user.name} - <a href={`/${app.resumePath}`}>Resume</a></p>
      </div>
    ))}
  </div>
));
}

export default AdminDashboard
