import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import CandidateCard from '../../components/CandidateCard';
import { useData } from '../../context/DataContext';

const RHJobApplicationsScreen = ({ route, navigation }) => {
  const { jobId } = route.params;
  const { getJobById, getApplicationsByJob, getCandidateById } = useData();

  const job = getJobById(jobId);
  const applications = getApplicationsByJob(jobId);

  const candidates = applications
    .map(app => getCandidateById(app.candidate_id))
    .filter(candidate => candidate !== undefined);

  const handleCandidatePress = (candidate) => {
    navigation.navigate('RHCandidateDetail', { candidateId: candidate.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{job?.titulo || 'Candidaturas'}</Text>
        <Text style={styles.subtitle}>
          {candidates.length} candidato{candidates.length !== 1 ? 's' : ''} encontrado{candidates.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={candidates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CandidateCard
            candidate={item}
            onPress={() => handleCandidatePress(item)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma candidatura para esta vaga</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
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

export default RHJobApplicationsScreen;

