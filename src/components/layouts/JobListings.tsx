import { Link } from 'react-router';
import { ClipLoader } from 'react-spinners';
import JobCard from '../common/JobCard';
import useFetchJobs from '../../hooks/useFetchJobs';

export interface JobListingsProps {
  onHomePage?: boolean;
}

const JobListings = ({ onHomePage = false }: JobListingsProps) => {
  // Data fetching via useFetchJobs [custom hook]
  const { jobsList, isFetching } = useFetchJobs();

  // Shorten jobList for Home Page
  const recentJobs = [...jobsList].reverse().slice(0, 3);
  const displayJobs = onHomePage ? recentJobs : jobsList;

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto flex flex-col justify-center items-center gap-2">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {onHomePage ? 'Recent Jobs' : 'Browse All Jobs'}
          </h2>
          {isFetching ? (
            <ClipLoader
              color="indigo"
              loading={isFetching}
              size={75}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {displayJobs.map(
                ({ id, type, title, description, salary, location }) => (
                  <JobCard
                    key={id}
                    id={id}
                    type={type}
                    role={title}
                    desc={description}
                    salary={salary}
                    place={location}
                  />
                )
              )}
            </div>
          )}
        </div>
      </section>

      {onHomePage ? (
        <section className="m-auto max-w-lg my-10 px-6">
          <Link
            to="/jobs"
            className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
          >
            View All Jobs
          </Link>
        </section>
      ) : null}
    </>
  );
};

export default JobListings;
