import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInitialData } from '../data/mockData';

const STORAGE_KEYS = {
  USER_ROLE: 'userRole',
  CURRENT_USER: 'currentUser',
  JOBS: 'jobs',
  CANDIDATES: 'candidates',
  APPLICATIONS: 'applications',
  SKILLS: 'skills',
  INITIALIZED: 'initialized',
};

// Inicializar dados mockados se for a primeira execução
export const initializeStorage = async () => {
  try {
    const initialized = await AsyncStorage.getItem(STORAGE_KEYS.INITIALIZED);
    
    if (!initialized) {
      const initialData = getInitialData();
      
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.SKILLS, JSON.stringify(initialData.skills)],
        [STORAGE_KEYS.JOBS, JSON.stringify(initialData.jobs)],
        [STORAGE_KEYS.CANDIDATES, JSON.stringify(initialData.candidates)],
        [STORAGE_KEYS.APPLICATIONS, JSON.stringify(initialData.applications)],
        [STORAGE_KEYS.INITIALIZED, 'true'],
      ]);
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao inicializar storage:', error);
    return false;
  }
};

// Funções genéricas de get/set
export const getStorageItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Erro ao ler ${key}:`, error);
    return null;
  }
};

export const setStorageItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Erro ao salvar ${key}:`, error);
    return false;
  }
};

// Funções específicas para cada tipo de dado
export const getUserRole = async () => {
  return await getStorageItem(STORAGE_KEYS.USER_ROLE);
};

export const setUserRole = async (role) => {
  return await setStorageItem(STORAGE_KEYS.USER_ROLE, role);
};

export const getCurrentUser = async () => {
  return await getStorageItem(STORAGE_KEYS.CURRENT_USER);
};

export const setCurrentUser = async (user) => {
  return await setStorageItem(STORAGE_KEYS.CURRENT_USER, user);
};

export const getJobs = async () => {
  return await getStorageItem(STORAGE_KEYS.JOBS) || [];
};

export const setJobs = async (jobs) => {
  return await setStorageItem(STORAGE_KEYS.JOBS, jobs);
};

export const getCandidates = async () => {
  return await getStorageItem(STORAGE_KEYS.CANDIDATES) || [];
};

export const setCandidates = async (candidates) => {
  return await setStorageItem(STORAGE_KEYS.CANDIDATES, candidates);
};

export const getApplications = async () => {
  return await getStorageItem(STORAGE_KEYS.APPLICATIONS) || [];
};

export const setApplications = async (applications) => {
  return await setStorageItem(STORAGE_KEYS.APPLICATIONS, applications);
};

export const getSkills = async () => {
  return await getStorageItem(STORAGE_KEYS.SKILLS) || [];
};

export const setSkills = async (skills) => {
  return await setStorageItem(STORAGE_KEYS.SKILLS, skills);
};

// Funções auxiliares
export const addJob = async (job) => {
  const jobs = await getJobs();
  const newJob = {
    ...job,
    id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
    created_at: new Date().toISOString(),
  };
  jobs.push(newJob);
  await setJobs(jobs);
  return newJob;
};

export const updateJob = async (jobId, updatedJob) => {
  const jobs = await getJobs();
  const index = jobs.findIndex(j => j.id === jobId);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updatedJob };
    await setJobs(jobs);
    return jobs[index];
  }
  return null;
};

export const deleteJob = async (jobId) => {
  const jobs = await getJobs();
  const filtered = jobs.filter(j => j.id !== jobId);
  await setJobs(filtered);
  return true;
};

export const addCandidate = async (candidate) => {
  const candidates = await getCandidates();
  const newCandidate = {
    ...candidate,
    id: candidates.length > 0 ? Math.max(...candidates.map(c => c.id)) + 1 : 1,
    created_at: new Date().toISOString(),
  };
  candidates.push(newCandidate);
  await setCandidates(candidates);
  return newCandidate;
};

export const updateCandidate = async (candidateId, updatedCandidate) => {
  const candidates = await getCandidates();
  const index = candidates.findIndex(c => c.id === candidateId);
  if (index !== -1) {
    candidates[index] = { ...candidates[index], ...updatedCandidate };
    await setCandidates(candidates);
    return candidates[index];
  }
  return null;
};

export const addApplication = async (candidateId, jobId) => {
  const applications = await getApplications();
  
  // Verificar se já existe candidatura
  const exists = applications.some(
    app => app.candidate_id === candidateId && app.job_id === jobId
  );
  
  if (exists) {
    return null; // Já existe candidatura
  }
  
  const newApplication = {
    id: applications.length > 0 ? Math.max(...applications.map(a => a.id)) + 1 : 1,
    candidate_id: candidateId,
    job_id: jobId,
    created_at: new Date().toISOString(),
  };
  
  applications.push(newApplication);
  await setApplications(applications);
  return newApplication;
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    return true;
  } catch (error) {
    console.error('Erro ao limpar storage:', error);
    return false;
  }
};

