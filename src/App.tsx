import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

import Layout from './Layout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import AddJobPage from './pages/AddJobPage';
import JobDetails from './components/layouts/JobDetails';
import JobForm from './components/layouts/JobForm';
import NotFoundPage from './pages/NotFoundPage';
import type { Job, NewJob } from './types/job';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // Helpers to Add/Update/Delete Job
  async function addJob(newJob: NewJob): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      if (!response.ok) throw new Error('Post Request Failed...');
      toast.success('New Job added successfully...');
    } catch (err: unknown) {
      toast.error('Adding New Job Failed...');
      console.error(err instanceof Error ? err.message : String(err));
    }
  }

  async function deleteJob(id: string): Promise<void> {
    try {
      const res = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete Request Failed...');
      toast.success('Job Deleted successfully...');
    } catch (err: unknown) {
      toast.error('Unable to delete this job, try again...');
      console.error(err instanceof Error ? err.message : String(err));
    }
  }

  async function editJob(updatedJob: Partial<Job> | NewJob, id: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });
      if (!response.ok) throw new Error('Update Request Failed...');
      toast.success('Job updated successfully...');
    } catch (err: unknown) {
      toast.error('Job updation failed, try again...');
      console.error(err instanceof Error ? err.message : String(err));
    }
  }

  // Define router & routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route
            path="add-job"
            element={<AddJobPage addJob={addJob} editJob={editJob} />}
          />
          <Route
            path="jobs/:id"
            element={<JobDetails deleteJob={deleteJob} />}
          />
          <Route
            path="/edit-job/:id"
            element={
              <JobForm addJob={addJob} toEdit={true} editJob={editJob} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
