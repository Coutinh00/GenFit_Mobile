// Dados mockados iniciais para o sistema de RH

export const mockSkills = [
  { id: 1, nome: "Python", categoria: "Linguagem de Programação" },
  { id: 2, nome: "JavaScript", categoria: "Linguagem de Programação" },
  { id: 3, nome: "React", categoria: "Framework" },
  { id: 4, nome: "React Native", categoria: "Framework" },
  { id: 5, nome: "Node.js", categoria: "Backend" },
  { id: 6, nome: "SQL", categoria: "Banco de Dados" },
  { id: 7, nome: "Machine Learning", categoria: "IA/ML" },
  { id: 8, nome: "TypeScript", categoria: "Linguagem de Programação" },
  { id: 9, nome: "Git", categoria: "Ferramenta" },
  { id: 10, nome: "Docker", categoria: "DevOps" },
  { id: 11, nome: "AWS", categoria: "Cloud" },
  { id: 12, nome: "Java", categoria: "Linguagem de Programação" },
];

export const mockJobs = [
  {
    id: 1,
    titulo: "Desenvolvedor Python Sênior",
    descricao: "Buscamos desenvolvedor Python sênior com experiência em Machine Learning e APIs REST. Trabalho remoto com horário flexível.",
    salario: 12000,
    localizacao: "São Paulo - SP",
    tipo_contrato: "CLT",
    nivel: "Senior",
    modelo_trabalho: "Remoto",
    departamento: "Tecnologia",
    skills: [
      { skill_id: 1, obrigatoria: true },
      { skill_id: 7, obrigatoria: true },
      { skill_id: 5, obrigatoria: false },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    titulo: "Desenvolvedor React Native",
    descricao: "Vaga para desenvolvedor mobile com React Native. Experiência com Expo e desenvolvimento de apps nativos.",
    salario: 10000,
    localizacao: "Rio de Janeiro - RJ",
    tipo_contrato: "CLT",
    nivel: "Pleno",
    modelo_trabalho: "Hibrido",
    departamento: "Mobile",
    skills: [
      { skill_id: 4, obrigatoria: true },
      { skill_id: 2, obrigatoria: true },
      { skill_id: 8, obrigatoria: false },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    titulo: "Analista de Dados",
    descricao: "Analista de dados com conhecimento em Python, SQL e Machine Learning. Trabalho presencial em São Paulo.",
    salario: 8000,
    localizacao: "São Paulo - SP",
    tipo_contrato: "CLT",
    nivel: "Pleno",
    modelo_trabalho: "Presencial",
    departamento: "Dados",
    skills: [
      { skill_id: 1, obrigatoria: true },
      { skill_id: 6, obrigatoria: true },
      { skill_id: 7, obrigatoria: false },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    titulo: "Desenvolvedor Full Stack",
    descricao: "Desenvolvedor full stack com React e Node.js. Experiência com TypeScript e APIs REST.",
    salario: 11000,
    localizacao: "Belo Horizonte - MG",
    tipo_contrato: "PJ",
    nivel: "Pleno",
    modelo_trabalho: "Remoto",
    departamento: "Tecnologia",
    skills: [
      { skill_id: 3, obrigatoria: true },
      { skill_id: 5, obrigatoria: true },
      { skill_id: 2, obrigatoria: true },
      { skill_id: 8, obrigatoria: false },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    titulo: "DevOps Engineer",
    descricao: "Engenheiro DevOps com experiência em AWS, Docker e CI/CD. Trabalho remoto.",
    salario: 13000,
    localizacao: "Remoto",
    tipo_contrato: "PJ",
    nivel: "Senior",
    modelo_trabalho: "Remoto",
    departamento: "Infraestrutura",
    skills: [
      { skill_id: 10, obrigatoria: true },
      { skill_id: 11, obrigatoria: true },
      { skill_id: 9, obrigatoria: true },
    ],
    created_at: new Date().toISOString(),
  },
];

export const mockCandidates = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    linkedin_url: "https://linkedin.com/in/joaosilva",
    role: "candidate",
    skills: [
      { skill_id: 1, nivel_proficiencia: 0.9 },
      { skill_id: 7, nivel_proficiencia: 0.8 },
      { skill_id: 5, nivel_proficiencia: 0.7 },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    telefone: "(21) 99999-8888",
    linkedin_url: "https://linkedin.com/in/mariasantos",
    role: "candidate",
    skills: [
      { skill_id: 4, nivel_proficiencia: 0.85 },
      { skill_id: 2, nivel_proficiencia: 0.9 },
      { skill_id: 3, nivel_proficiencia: 0.8 },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro.costa@email.com",
    telefone: "(11) 98888-7777",
    linkedin_url: "https://linkedin.com/in/pedrocosta",
    role: "candidate",
    skills: [
      { skill_id: 1, nivel_proficiencia: 0.75 },
      { skill_id: 6, nivel_proficiencia: 0.8 },
      { skill_id: 7, nivel_proficiencia: 0.7 },
    ],
    created_at: new Date().toISOString(),
  },
];

export const mockApplications = [
  {
    id: 1,
    candidate_id: 1,
    job_id: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    candidate_id: 2,
    job_id: 2,
    created_at: new Date().toISOString(),
  },
];

// Função para obter dados iniciais completos
export const getInitialData = () => ({
  skills: mockSkills,
  jobs: mockJobs,
  candidates: mockCandidates,
  applications: mockApplications,
});

