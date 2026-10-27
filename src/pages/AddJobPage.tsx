import JobForm from '../components/layouts/JobForm';
import type { Job, NewJob } from '../types/job';

export interface AddJobPageProps {
  addJob: (newJob: NewJob) => Promise<void>;
  editJob: (updatedJob: Partial<Job> | NewJob, id: string) => Promise<void>;
}

const AddJobPage = ({ addJob, editJob }: AddJobPageProps) => {
  return <JobForm addJob={addJob} toEdit={false} editJob={editJob} />;
};

export default AddJobPage;
