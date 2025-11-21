import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import JobCard from '../../components/JobCard';
import Button from '../../components/common/Button';
import { useData } from '../../context/DataContext';

const RHJobsScreen = ({ navigation }) => {
  const { jobs, removeJob, getApplicationsByJob } = useData();
  const [selectedJob, setSelectedJob] = useState(null);

  const handleCreateJob = () => {
    navigation.navigate('RHCreateJob');
  };

  const handleJobPress = (job) => {
    const applications = getApplicationsByJob(job.id);
    navigation.navigate('RHJobApplications', { jobId: job.id });
  };

  const handleDeleteJob = (job) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir a vaga "${job.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await removeJob(job.id);
            Alert.alert('Sucesso', 'Vaga excluída com sucesso');
          },
        },
      ]
    );
  };

  const renderJobCard = ({ item }) => {
    const applications = getApplicationsByJob(item.id);
    
    return (
      <View>
        <JobCard
          job={item}
          onPress={() => handleJobPress(item)}
          showApplyButton={false}
        />
        <View style={styles.jobActions}>
          <Button
            title={`Ver Candidaturas (${applications.length})`}
            variant="primary"
            onPress={() => handleJobPress(item)}
            style={styles.actionButton}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteJob(item)}
          >
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerenciar Vagas</Text>
        <Button
          title="+ Nova Vaga"
          variant="primary"
          onPress={handleCreateJob}
          style={styles.createButton}
        />
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderJobCard}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma vaga cadastrada</Text>
            <Text style={styles.emptySubtext}>
              Crie sua primeira vaga para começar a receber candidaturas
            </Text>
            <Button
              title="Criar Primeira Vaga"
              variant="primary"
              onPress={handleCreateJob}
              style={styles.emptyButton}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  createButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 40,
  },
  list: {
    padding: 16,
  },
  jobActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
  },
  deleteButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyButton: {
    width: '100%',
    maxWidth: 300,
  },
});

export default RHJobsScreen;

