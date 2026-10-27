import { useParams, useNavigate, Link } from 'react-router';
import { ClipLoader } from 'react-spinners';
import useFetchJob from '../../hooks/useFetchJob';
import { FaArrowLeft, FaLocationDot } from 'react-icons/fa6';

export interface JobDetailsProps {
  deleteJob: (id: string) => Promise<void>;
}

const JobDetails = ({ deleteJob }: JobDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { job, isFetching } = useFetchJob(id);

  const handleDelete = async () => {
    if (!window.confirm('Delete it Permanently?')) return;
    if (id) {
      await deleteJob(id);
      navigate('/jobs');
    }
  };

  return (
    <>
      {/* <!-- Go Back --> */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="w-45 text-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-2"
          >
            <FaArrowLeft />
            <p>Back to Job Listings</p>
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-6">
            {isFetching ? (
              <ClipLoader
                color="indigo"
                loading={isFetching}
                size={75}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : !job ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-700">Job Not Found</h2>
                <Link to="/jobs" className="text-indigo-500 underline mt-4 inline-block">
                  Back to Jobs
                </Link>
              </div>
            ) : (
              <>
                <main className="w-full md:w-3/4">
                  <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                    <div className="text-gray-500 mb-4">{job.type}</div>
                    <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                    <div className="text-gray-500 mb-4 flex justify-center md:justify-start items-center gap-2">
                      <FaLocationDot color="red" />
                      <p className="text-orange-700">{job.location}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                      Job Description
                    </h3>

                    <p className="mb-4">{job.description}</p>

                    <h3 className="text-indigo-800 text-lg font-bold mb-2">
                      Salary
                    </h3>

                    <p className="mb-4">{job.salary}</p>
                  </div>
                </main>

                {/* <!-- Sidebar --> */}
                <aside className="w-full md:w-1/4 mt-6 md:mt-0">
                  {/* <!-- Company Info --> */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">Company Info</h3>

                    <h2 className="text-2xl">{job.company.name}</h2>

                    <p className="my-2">{job.company.description}</p>

                    <hr className="my-4" />

                    <h3 className="text-xl">Contact Email:</h3>

                    <p className="my-2 bg-indigo-100 p-2 font-bold">
                      {job.company.contactEmail}
                    </p>

                    <h3 className="text-xl">Contact Phone:</h3>

                    <p className="my-2 bg-indigo-100 p-2 font-bold">
                      {job.company.contactPhone || 'N/A'}
                    </p>
                  </div>

                  {/* <!-- Manage --> */}
                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                    <Link
                      to={`/edit-job/${job.id}`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block hover:cursor-pointer"
                    >
                      Edit Job
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block hover:cursor-pointer"
                      onClick={handleDelete}
                      type="button"
                    >
                      Delete Job
                    </button>
                  </div>
                </aside>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetails;
