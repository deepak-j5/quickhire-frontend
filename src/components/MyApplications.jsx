import React from 'react'

function MyApplications() {
  useEffect(() => {
  API.get("/apply/my-applications").then(res => setApplications(res.data.applications));
}, []);

return (
  <div>
    {applications.map(app => (
      <div key={app._id} className="glass-card"> {/* add motion.div for animation */}
        <h3>{app.job.title}</h3>
        <a href={`/${app.resumePath}`}>Download Resume</a>
      </div>
    ))}
  </div>
);
}

export default MyApplications
