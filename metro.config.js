// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Configuração para evitar problemas com node:sea no Windows
config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: false,
};

module.exports = config;

