import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const RHLoginScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha nome e email');
      return;
    }

    setLoading(true);
    try {
      // Fazer login como RH
      await login('rh', {
        id: 1,
        nome: nome.trim(),
        email: email.trim(),
        role: 'rh',
      });
      
      // O AppNavigator detectará a mudança e redirecionará automaticamente
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Login RH</Text>
          <Text style={styles.subtitle}>
            Acesse o painel de gestão de recursos humanos
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Nome"
            value={nome}
            onChangeText={setNome}
            placeholder="Seu nome"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="seu.email@empresa.com"
            keyboardType="email-address"
          />

          <Button
            title="Entrar"
            onPress={handleLogin}
            variant="primary"
            loading={loading}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
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
    width: '100%',
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

export default RHLoginScreen;

