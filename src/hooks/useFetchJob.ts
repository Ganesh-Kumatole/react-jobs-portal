import { useState, useEffect } from 'react';
import type { Job } from '../types/job';

export interface UseFetchJobReturn {
  job: Job | null;
  isFetching: boolean;
}

function useFetchJob(id?: string): UseFetchJobReturn {
  const [job, setJob] = useState<Job | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setIsFetching(false);
      setJob(null);
      return;
    }

    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:3000/jobs/${id}`);
        if (!response.ok) throw new Error('Network Request Failed...');
        const data: Job = await response.json();
        setJob(data);
      } catch (err: unknown) {
        console.error(err instanceof Error ? err.message : String(err));
        setJob(null);
      } finally {
        setIsFetching(false);
      }
    };

    void fetchJob();
  }, [id]);

  return { job, isFetching };
}

export default useFetchJob;
