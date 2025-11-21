# Script para corrigir problema do Expo no Windows
# Execute: powershell -ExecutionPolicy Bypass -File fix-web.ps1

Write-Host "Criando estrutura de diretórios do Expo..." -ForegroundColor Green

# Criar diretórios necessários
$expoDir = ".expo\metro\externals"
if (-not (Test-Path $expoDir)) {
    New-Item -ItemType Directory -Path $expoDir -Force | Out-Null
    Write-Host "Diretório criado: $expoDir" -ForegroundColor Yellow
}

Write-Host "Estrutura criada com sucesso!" -ForegroundColor Green
Write-Host "Agora execute: npm run web" -ForegroundColor Cyan

