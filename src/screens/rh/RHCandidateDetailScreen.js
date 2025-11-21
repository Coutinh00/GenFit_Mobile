import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Card from '../../components/common/Card';
import SkillBadge from '../../components/common/SkillBadge';
import { useData } from '../../context/DataContext';

const RHCandidateDetailScreen = ({ route }) => {
  const { candidateId } = route.params;
  const { getCandidateById, skills, getApplicationsByCandidate, jobs } = useData();

  const candidate = getCandidateById(candidateId);

  if (!candidate) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Candidato não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getSkillName = (skillId) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? skill.nome : `Skill ${skillId}`;
  };

  const applications = getApplicationsByCandidate(candidate.id);
  const appliedJobs = applications
    .map(app => jobs.find(job => job.id === app.job_id))
    .filter(job => job !== undefined);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.name}>{candidate.nome}</Text>
          <Text style={styles.email}>{candidate.email}</Text>
          {candidate.telefone && (
            <Text style={styles.phone}>{candidate.telefone}</Text>
          )}
          {candidate.linkedin_url && (
            <Text style={styles.linkedin}>{candidate.linkedin_url}</Text>
          )}
        </Card>

        {candidate.skills && candidate.skills.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {candidate.skills.map((candidateSkill, index) => (
                <SkillBadge
                  key={index}
                  skill={getSkillName(candidateSkill.skill_id)}
                  nivel={candidateSkill.nivel_proficiencia}
                />
              ))}
            </View>
          </Card>
        )}

        {appliedJobs.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>Candidaturas ({appliedJobs.length})</Text>
            {appliedJobs.map((job) => (
              <View key={job.id} style={styles.jobItem}>
                <Text style={styles.jobTitle}>{job.titulo}</Text>
                <Text style={styles.jobInfo}>{job.departamento}</Text>
              </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  linkedin: {
    fontSize: 16,
    color: '#2563EB',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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

export default RHCandidateDetailScreen;

