import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const RHDashboardScreen = ({ navigation }) => {
  const { jobs, candidates, applications } = useData();
  const { currentUser, logout } = useAuth();

  const totalJobs = jobs.length;
  const totalCandidates = candidates.length;
  const totalApplications = applications.length;
  const activeJobs = jobs.length;

  const handleLogout = async () => {
    Alert.alert(
      'Confirmar Saída',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // Pequeno delay para garantir que o estado seja atualizado
              setTimeout(() => {
                console.log('Logout concluído');
              }, 100);
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
              Alert.alert('Erro', 'Não foi possível fazer logout');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo, {currentUser?.nome || 'Gestor'}!</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metricsContainer}>
          <Card style={styles.metricCard}>
            <Text style={styles.metricValue}>{totalJobs}</Text>
            <Text style={styles.metricLabel}>Vagas</Text>
          </Card>

          <Card style={styles.metricCard}>
            <Text style={styles.metricValue}>{totalCandidates}</Text>
            <Text style={styles.metricLabel}>Candidatos</Text>
          </Card>

          <Card style={styles.metricCard}>
            <Text style={styles.metricValue}>{totalApplications}</Text>
            <Text style={styles.metricLabel}>Candidaturas</Text>
          </Card>

          <Card style={styles.metricCard}>
            <Text style={styles.metricValue}>{activeJobs}</Text>
            <Text style={styles.metricLabel}>Vagas Ativas</Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.actionsContainer}>
            <Button
              title="Nova Vaga"
              variant="primary"
              onPress={() => navigation.navigate('RHCreateJob')}
              style={styles.actionButton}
            />
            <Button
              title="Ver Talentos"
              variant="secondary"
              onPress={() => navigation.navigate('RHTalentPool')}
              style={styles.actionButton}
            />
          </View>
        </Card>

        {jobs.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>Vagas Recentes</Text>
            {jobs.slice(0, 3).map((job) => (
              <TouchableOpacity
                key={job.id}
                style={styles.jobItem}
                onPress={() => navigation.navigate('RHJobs')}
              >
                <Text style={styles.jobTitle}>{job.titulo}</Text>
                <Text style={styles.jobInfo}>
                  {applications.filter(app => app.job_id === job.id).length} candidaturas
                </Text>
              </TouchableOpacity>
            ))}
          </Card>
        )}
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 12,
  },
  metricCard: {
    width: '47%',
    alignItems: 'center',
    padding: 20,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  jobItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  jobInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default RHDashboardScreen;

