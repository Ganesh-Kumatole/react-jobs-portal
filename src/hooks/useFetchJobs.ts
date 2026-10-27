import { useState, useEffect } from 'react';
import type { Job } from '../types/job';

export interface UseFetchJobsReturn {
  jobsList: Job[];
  isFetching: boolean;
}

function useFetchJobs(): UseFetchJobsReturn {
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/jobs');
        if (!response.ok) throw new Error('Network Request Failed...');
        const data: Job[] = await response.json();
        setJobsList(data);
      } catch (err: unknown) {
        console.error(err instanceof Error ? err.message : String(err));
      } finally {
        setIsFetching(false);
      }
    };

    void fetchJobs();
  }, []);

  return { jobsList, isFetching };
}

export default useFetchJobs;
