// Script para corrigir problema do Expo no Windows com node:sea
const fs = require('fs');
const path = require('path');

const expoExternalsDir = path.join(__dirname, '.expo', 'metro', 'externals');

// Criar diretório base
try {
  if (!fs.existsSync(expoExternalsDir)) {
    fs.mkdirSync(expoExternalsDir, { recursive: true });
    console.log('✅ Diretório .expo/metro/externals criado');
  }
} catch (error) {
  console.log('⚠️  Erro ao criar diretório:', error.message);
}

// Criar um arquivo .gitkeep para garantir que o diretório existe
const gitkeepPath = path.join(expoExternalsDir, '.gitkeep');
try {
  if (!fs.existsSync(gitkeepPath)) {
    fs.writeFileSync(gitkeepPath, '');
  }
} catch (error) {
  // Ignorar
}

console.log('✅ Preparação concluída. Iniciando Expo...');

