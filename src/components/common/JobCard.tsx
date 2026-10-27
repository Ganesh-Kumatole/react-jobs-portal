import { useState } from 'react';
import { Link } from 'react-router';
import { FaLocationDot } from 'react-icons/fa6';
import type { JobType } from '../../types/job';

export interface JobCardProps {
  id: string;
  type: JobType;
  role: string;
  desc: string;
  salary: string;
  place: string;
}

const JobCard = ({ id, type, role, desc, salary, place }: JobCardProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-xl shadow-md relative self-start">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{type}</div>
          <h3 className="text-xl font-bold">{role}</h3>
        </div>

        <div className="mb-0.5">
          {isActive ? desc : `${desc.substring(0, 150)}...`}
        </div>

        <button
          className="text-red-500 mb-5 text-sm hover:cursor-pointer"
          onClick={() => setIsActive((prevIsActive) => !prevIsActive)}
          type="button"
        >
          {isActive ? 'Show Less' : 'Show More'}
        </button>

        <h3 className="text-indigo-500 mb-2">{salary}</h3>

        <div className="border border-indigo-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3 flex justify-start items-center gap-2">
            <FaLocationDot color="red" />
            {place}
          </div>
          <Link
            to={`/jobs/${id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
