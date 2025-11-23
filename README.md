# GenFit RH - Sistema de Gestão de Recursos Humanos

Aplicativo mobile desenvolvido em React Native para gestão de recursos humanos, permitindo que candidatos visualizem vagas e se candidatem, e que gestores de RH gerenciem vagas e visualizem candidatos.

## 📱 Sobre o Projeto

Este é um sistema completo de gestão de RH com duas interfaces distintas:

- **Candidatos**: Podem visualizar vagas disponíveis, criar/editar perfil, adicionar skills e se candidatar a vagas
- **Gestores de RH**: Podem criar e gerenciar vagas, visualizar candidatos no banco de talentos e ver candidaturas por vaga

## 🚀 Tecnologias Utilizadas

- **React Native** (Expo)
- **React Navigation** - Navegação entre telas
- **AsyncStorage** - Persistência de dados local
- **Context API** - Gerenciamento de estado global

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Um dispositivo móvel com o app Expo Go ou um emulador Android/iOS

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd GenFit_Mobile
```

2. Instale as dependências:
```bash
npm install
```

ou

```bash
yarn install
```

## 🏃 Como Executar

1. Instale as dependências (se ainda não instalou):
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm start
```

ou

```bash
yarn start
```

3. Escolha uma das opções:
   - Pressione `w` para abrir no navegador web
   - Pressione `a` para abrir no emulador Android
   - Pressione `i` para abrir no emulador iOS
   - Escaneie o QR code com o app Expo Go no seu dispositivo móvel

### 🌐 Executar na Web

**Método Recomendado (evita bugs no Windows):**
```bash
# Iniciar o Expo normalmente
npm start

# Quando o menu aparecer, pressione 'w' para abrir no navegador
# Isso evita problemas com diretórios no Windows
```

**Método Direto (pode ter problemas no Windows):**
```bash
npm run web
```

O aplicativo será aberto no navegador em `http://localhost:19006`

## 📁 Estrutura do Projeto

```
GenFit_Mobile/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── common/          # Button, Input, Card, SkillBadge
│   │   ├── JobCard.js       # Card de vaga
│   │   └── CandidateCard.js # Card de candidato
│   ├── screens/             # Telas do app
│   │   ├── auth/            # WelcomeScreen, LoginScreen
│   │   ├── candidate/       # Telas do candidato
│   │   └── rh/              # Telas do RH
│   ├── navigation/          # AppNavigator.js
│   ├── context/             # AuthContext, DataContext
│   ├── services/            # storage.js (AsyncStorage)
│   └── data/                # mockData.js (dados iniciais)
├── App.js                   # Entry point
└── package.json
```

## 💾 Persistência de Dados

O aplicativo utiliza **AsyncStorage** para salvar todos os dados localmente no dispositivo. Os dados são inicializados automaticamente na primeira execução com dados mockados:

- 5 vagas de exemplo
- 3 candidatos de exemplo
- Catálogo de skills (Python, JavaScript, React, etc.)

### Estrutura de Dados no AsyncStorage

```javascript
{
  "userRole": "candidate" | "rh",
  "currentUser": { id, nome, email, role, ... },
  "jobs": [...],           // Vagas criadas pelo RH
  "candidates": [...],     // Perfis de candidatos
  "applications": [...],   // Candidaturas
  "skills": [...]          // Catálogo de skills
}
```

## 🎯 Funcionalidades

### Para Candidatos

- ✅ Visualizar todas as vagas disponíveis
- ✅ Buscar vagas por título ou descrição
- ✅ Criar e editar perfil pessoal
- ✅ Adicionar skills com nível de proficiência
- ✅ Candidatar-se a vagas
- ✅ Visualizar vagas em que se candidatou

### Para Gestores de RH

- ✅ Dashboard com métricas (vagas, candidatos, candidaturas)
- ✅ Criar e gerenciar vagas
- ✅ Adicionar skills requeridas às vagas (obrigatórias/opcionais)
- ✅ Visualizar banco de talentos
- ✅ Ver perfil completo de candidatos
- ✅ Visualizar candidaturas por vaga

## 🎨 Design

O aplicativo utiliza um design moderno e limpo com:

- **Cores principais**:
  - Azul (#2563EB) para interface do RH
  - Verde (#10B981) para interface do candidato
  - Cores neutras para backgrounds e textos

- **Componentes reutilizáveis**:
  - Botões com variantes (primary, secondary, success, danger)
  - Inputs com validação
  - Cards com sombras
  - Badges para skills

## 📱 Telas do Aplicativo

### Autenticação
- **WelcomeScreen**: Tela inicial com dois botões (Candidato / RH)
- **CandidateLoginScreen**: Criar perfil de candidato
- **RHLoginScreen**: Login de gestor

### Candidato
- **CandidateHomeScreen**: Lista de vagas disponíveis
- **CandidateProfileScreen**: Criar/editar perfil e skills
- **MyApplicationsScreen**: Vagas em que se candidatou
- **JobDetailScreen**: Detalhes da vaga e candidatura

### RH
- **RHDashboardScreen**: Dashboard com métricas
- **RHJobsScreen**: Lista de vagas criadas
- **RHCreateJobScreen**: Criar/editar vaga
- **RHTalentPoolScreen**: Banco de talentos
- **RHCandidateDetailScreen**: Perfil completo do candidato
- **RHJobApplicationsScreen**: Candidaturas por vaga

## 🔄 Fluxos Principais

### Fluxo do Candidato
1. Seleciona "Quero me candidatar"
2. Preenche dados básicos (nome, email)
3. Visualiza vagas disponíveis
4. Cria/edita perfil e adiciona skills
5. Candidata-se a vagas de interesse

### Fluxo do RH
1. Seleciona "Sou do RH"
2. Faz login com nome e email
3. Acessa dashboard com métricas
4. Cria vagas com skills requeridas
5. Visualiza candidatos e candidaturas

## 🔐 Credenciais de Teste

### Login RH (Gestor)

Para acessar como gestor de RH, use as seguintes credenciais:

**Credenciais Pré-definidas:**
- **Nome**: `Gestor RH`
- **Email**: `rh@genfit.com`

**Como acessar:**
1. Na tela inicial, clique em "Sou do RH"
2. Preencha:
   - Nome: `Gestor RH`
   - Email: `rh@genfit.com`
3. Clique em "Entrar"
4. Você será redirecionado para o Dashboard do RH

**Nota**: O sistema não valida credenciais específicas. Qualquer nome e email válidos permitem acesso como RH. **Importante**: O aplicativo sempre inicia na tela de login - não mantém sessão salva entre execuções.

### Login Candidato

Para acessar como candidato:
1. Clique em "Quero me candidatar"
2. Preencha nome e email (qualquer email válido)
3. O sistema criará automaticamente seu perfil
4. Você pode adicionar skills e se candidatar a vagas

**Nota**: O aplicativo sempre inicia na tela de login - não mantém sessão salva entre execuções.

## 🛠️ Desenvolvimento

### Adicionar Nova Funcionalidade

1. Crie os componentes necessários em `src/components/`
2. Crie as telas em `src/screens/`
3. Atualize a navegação em `src/navigation/AppNavigator.js`
4. Adicione funções de storage em `src/services/storage.js` se necessário

### Limpar Dados

Para limpar todos os dados salvos e reiniciar com dados mockados, você pode:

1. Desinstalar e reinstalar o app
2. Ou adicionar uma função de reset no código

## 📝 Notas Importantes

- Todos os dados são salvos localmente no dispositivo
- Não há sincronização entre dispositivos
- Os dados persistem mesmo após fechar o app
- Na primeira execução, dados mockados são carregados automaticamente

## 🔧 Solução de Problemas

### Erro ao rodar na web (ENOENT) - Windows

Se encontrar o erro `ENOENT: no such file or directory, mkdir '.expo/metro/externals/node:sea'`:

Este é um **bug conhecido do Expo SDK 49 no Windows**. O Expo tenta criar um diretório com nome inválido (`node:sea` contém `:`).

**✅ Solução Recomendada - Usar Expo Go no Celular:**
```bash
# 1. Inicie o Expo
npm start

# 2. Escaneie o QR code com o app Expo Go no seu celular
# Baixe: https://expo.dev/client
```

**✅ Solução Alternativa - Usar Emulador Android:**
```bash
# 1. Instale Android Studio e configure um emulador
# 2. Inicie o Expo
npm start

# 3. Pressione 'a' para abrir no emulador Android
```

**⚠️ Para Web no Windows (Workaround):**
O suporte web no Windows com Expo SDK 49 tem problemas. Se precisar testar na web:
1. Use WSL2 (Windows Subsystem for Linux)
2. Ou use uma máquina virtual Linux
3. Ou aguarde atualização do Expo que corrige este bug

**Nota:** O script `fix-expo-windows.js` tenta criar os diretórios necessários, mas o bug persiste devido ao nome inválido do diretório que o Expo tenta criar.

### Outros problemas

1. **Dependências faltando:**
   ```bash
   npx expo install --fix
   ```

2. **Cache do Metro:**
   ```bash
   npm start -- --clear
   ```

3. **Porta ocupada:**
   - Feche processos na porta 19006
   - Ou use: `expo start --web --port 3000`

4. **Web compilando infinitamente:**
   - Abra o navegador manualmente em `http://localhost:19006`
   - Verifique o console do navegador (F12) para erros
   - Limpe o cache: `npm run clean` e depois `npm start`
   - Se persistir, pare o servidor (Ctrl+C) e reinicie

## 👥 Autores

Vinicius Murtinho Vicente Rm551151 
Lucas Barreto Consentino RM557107
Gustavo Bispo Cordeiro RM558515

## 📄 Licença

Este projeto é um trabalho acadêmico.

---

**Desenvolvido com ❤️ usando React Native e Expo**

