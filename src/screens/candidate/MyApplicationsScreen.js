import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import JobCard from '../../components/JobCard';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const MyApplicationsScreen = ({ navigation }) => {
  const { applications, jobs, getApplicationsByCandidate } = useData();
  const { currentUser } = useAuth();

  const myApplications = currentUser
    ? getApplicationsByCandidate(currentUser.id)
    : [];

  const appliedJobs = myApplications
    .map(app => jobs.find(job => job.id === app.job_id))
    .filter(job => job !== undefined);

  const handleJobPress = (job) => {
    navigation.navigate('JobDetail', { jobId: job.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Candidaturas</Text>
        <Text style={styles.subtitle}>
          {appliedJobs.length} vaga{appliedJobs.length !== 1 ? 's' : ''} encontrada{appliedJobs.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={appliedJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => handleJobPress(item)}
            showApplyButton={false}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você ainda não se candidatou a nenhuma vaga</Text>
            <Text style={styles.emptySubtext}>
              Explore as vagas disponíveis e encontre a oportunidade ideal!
            </Text>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default MyApplicationsScreen;

