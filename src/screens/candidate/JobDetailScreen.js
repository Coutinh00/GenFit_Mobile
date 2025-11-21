import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import Card from '../../components/common/Card';
import SkillBadge from '../../components/common/SkillBadge';
import Button from '../../components/common/Button';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const JobDetailScreen = ({ route, navigation }) => {
  const { jobId } = route.params;
  const { getJobById, skills, createApplication, hasApplied } = useData();
  const { currentUser } = useAuth();

  const job = getJobById(jobId);

  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Vaga não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getSkillName = (skillId) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? skill.nome : `Skill ${skillId}`;
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(salary);
  };

  const alreadyApplied = currentUser && hasApplied(currentUser.id, job.id);

  const handleApply = async () => {
    if (!currentUser) {
      Alert.alert('Erro', 'Você precisa estar logado para se candidatar');
      return;
    }

    if (alreadyApplied) {
      Alert.alert('Aviso', 'Você já se candidatou para esta vaga');
      return;
    }

    const result = await createApplication(currentUser.id, job.id);
    if (result) {
      Alert.alert('Sucesso', 'Candidatura realizada com sucesso!');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Não foi possível realizar a candidatura');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.title}>{job.titulo}</Text>
          <Text style={styles.department}>{job.departamento}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Salário:</Text>
              <Text style={styles.infoValue}>{formatSalary(job.salario)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Localização:</Text>
              <Text style={styles.infoValue}>{job.localizacao}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Modelo:</Text>
              <Text style={styles.infoValue}>{job.modelo_trabalho}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nível:</Text>
              <Text style={styles.infoValue}>{job.nivel}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Contrato:</Text>
              <Text style={styles.infoValue}>{job.tipo_contrato}</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{job.descricao}</Text>
        </Card>

        {job.skills && job.skills.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>Skills Requeridas</Text>
            <View style={styles.skillsContainer}>
              {job.skills.map((jobSkill, index) => (
                <SkillBadge
                  key={index}
                  skill={getSkillName(jobSkill.skill_id)}
                  obrigatoria={jobSkill.obrigatoria}
                />
              ))}
            </View>
          </Card>
        )}

        {currentUser && (
          <View style={styles.applyContainer}>
            {alreadyApplied ? (
              <View style={styles.appliedContainer}>
                <Text style={styles.appliedText}>✓ Você já se candidatou para esta vaga</Text>
              </View>
            ) : (
              <Button
                title="Candidatar-se"
                variant="success"
                onPress={handleApply}
                style={styles.applyButton}
              />
            )}
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  department: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  infoSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  applyContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  applyButton: {
    width: '100%',
  },
  appliedContainer: {
    padding: 16,
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    alignItems: 'center',
  },
  appliedText: {
    fontSize: 16,
    color: '#065F46',
    fontWeight: '600',
  },
});

export default JobDetailScreen;

