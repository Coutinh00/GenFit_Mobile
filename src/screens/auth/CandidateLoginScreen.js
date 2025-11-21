import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const CandidateLoginScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, updateUser } = useAuth();
  const { createCandidate, candidates } = useData();

  const handleLogin = async () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha nome e email');
      return;
    }

    setLoading(true);
    try {
      // Verificar se já existe candidato com este email
      let candidate = candidates.find(c => c.email === email);

      if (!candidate) {
        // Criar novo candidato
        candidate = await createCandidate({
          nome: nome.trim(),
          email: email.trim(),
          telefone: telefone.trim() || null,
          role: 'candidate',
          skills: [],
        });
      }

      // Fazer login - o AppNavigator detectará a mudança e redirecionará automaticamente
      await login('candidate', candidate);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Criar Perfil</Text>
          <Text style={styles.subtitle}>
            Preencha seus dados para começar a se candidatar
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Nome Completo *"
            value={nome}
            onChangeText={setNome}
            placeholder="Seu nome completo"
          />

          <Input
            label="Email *"
            value={email}
            onChangeText={setEmail}
            placeholder="seu.email@exemplo.com"
            keyboardType="email-address"
          />

          <Input
            label="Telefone (opcional)"
            value={telefone}
            onChangeText={setTelefone}
            placeholder="(11) 98765-4321"
            keyboardType="phone-pad"
          />

          <Button
            title="Continuar"
            onPress={handleLogin}
            variant="primary"
            loading={loading}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  form: {
    flex: 1,
  },
  button: {
    marginTop: 8,
  },
  backButton: {
    marginBottom: 16,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
});

export default CandidateLoginScreen;

