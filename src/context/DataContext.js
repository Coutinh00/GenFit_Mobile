import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  getJobs,
  setJobs,
  getCandidates,
  setCandidates,
  getApplications,
  setApplications,
  getSkills,
  addJob,
  updateJob,
  deleteJob,
  addCandidate,
  updateCandidate,
  addApplication,
} from '../services/storage';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [jobs, setJobsState] = useState([]);
  const [candidates, setCandidatesState] = useState([]);
  const [applications, setApplicationsState] = useState([]);
  const [skills, setSkillsState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [jobsData, candidatesData, applicationsData, skillsData] = await Promise.all([
        getJobs(),
        getCandidates(),
        getApplications(),
        getSkills(),
      ]);

      setJobsState(jobsData);
      setCandidatesState(candidatesData);
      setApplicationsState(applicationsData);
      setSkillsState(skillsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Jobs
  const createJob = async (jobData) => {
    try {
      const newJob = await addJob(jobData);
      const updatedJobs = await getJobs();
      setJobsState(updatedJobs);
      return newJob;
    } catch (error) {
      console.error('Erro ao criar vaga:', error);
      return null;
    }
  };

  const editJob = async (jobId, jobData) => {
    try {
      const updated = await updateJob(jobId, jobData);
      if (updated) {
        const updatedJobs = await getJobs();
        setJobsState(updatedJobs);
      }
      return updated;
    } catch (error) {
      console.error('Erro ao editar vaga:', error);
      return null;
    }
  };

  const removeJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      const updatedJobs = await getJobs();
      setJobsState(updatedJobs);
      return true;
    } catch (error) {
      console.error('Erro ao remover vaga:', error);
      return false;
    }
  };

  // Candidates
  const createCandidate = async (candidateData) => {
    try {
      const newCandidate = await addCandidate(candidateData);
      const updatedCandidates = await getCandidates();
      setCandidatesState(updatedCandidates);
      return newCandidate;
    } catch (error) {
      console.error('Erro ao criar candidato:', error);
      return null;
    }
  };

  const editCandidate = async (candidateId, candidateData) => {
    try {
      const updated = await updateCandidate(candidateId, candidateData);
      if (updated) {
        const updatedCandidates = await getCandidates();
        setCandidatesState(updatedCandidates);
      }
      return updated;
    } catch (error) {
      console.error('Erro ao editar candidato:', error);
      return null;
    }
  };

  // Applications
  const createApplication = async (candidateId, jobId) => {
    try {
      const newApplication = await addApplication(candidateId, jobId);
      if (newApplication) {
        const updatedApplications = await getApplications();
        setApplicationsState(updatedApplications);
      }
      return newApplication;
    } catch (error) {
      console.error('Erro ao criar candidatura:', error);
      return null;
    }
  };

  // Helper functions
  const getJobById = (jobId) => {
    return jobs.find(job => job.id === jobId);
  };

  const getCandidateById = (candidateId) => {
    return candidates.find(candidate => candidate.id === candidateId);
  };

  const getApplicationsByJob = (jobId) => {
    return applications.filter(app => app.job_id === jobId);
  };

  const getApplicationsByCandidate = (candidateId) => {
    return applications.filter(app => app.candidate_id === candidateId);
  };

  const hasApplied = (candidateId, jobId) => {
    return applications.some(
      app => app.candidate_id === candidateId && app.job_id === jobId
    );
  };

  return (
    <DataContext.Provider
      value={{
        jobs,
        candidates,
        applications,
        skills,
        loading,
        createJob,
        editJob,
        removeJob,
        createCandidate,
        editCandidate,
        createApplication,
        getJobById,
        getCandidateById,
        getApplicationsByJob,
        getApplicationsByCandidate,
        hasApplied,
        refreshData: loadData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de DataProvider');
  }
  return context;
};

