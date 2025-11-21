import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
import JobCard from '../../components/JobCard';
import Button from '../../components/common/Button';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const CandidateHomeScreen = ({ navigation }) => {
  const { jobs, createApplication } = useData();
  const { currentUser } = useAuth();
  const [searchText, setSearchText] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
    job.descricao.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleJobPress = (job) => {
    navigation.navigate('JobDetail', { jobId: job.id });
  };

  const handleApply = async (job) => {
    if (!currentUser) return;

    const result = await createApplication(currentUser.id, job.id);
    if (result) {
      alert('Candidatura realizada com sucesso!');
    } else {
      alert('Você já se candidatou para esta vaga');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar vagas..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.actions}>
        <Button
          title="Meu Perfil"
          variant="secondary"
          onPress={() => navigation.navigate('CandidateProfile')}
          style={styles.actionButton}
        />
        <Button
          title="Minhas Candidaturas"
          variant="secondary"
          onPress={() => navigation.navigate('MyApplications')}
          style={styles.actionButton}
        />
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => handleJobPress(item)}
            onApply={handleApply}
            showApplyButton={true}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma vaga encontrada</Text>
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
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default CandidateHomeScreen;

