import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './common/Card';
import SkillBadge from './common/SkillBadge';
import Button from './common/Button';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const JobCard = ({ job, onPress, showApplyButton = false, onApply }) => {
  const { skills, hasApplied } = useData();
  const { currentUser } = useAuth();

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

  const handleCardPress = () => {
    if (onPress) {
      onPress(job);
    }
  };

  const handleApplyPress = (e) => {
    e.stopPropagation();
    if (onApply) {
      onApply(job);
    }
  };

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={0.7}>
      <Card>
        <Text style={styles.title}>{job.titulo}</Text>
        <Text style={styles.company}>{job.departamento}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.info}>{formatSalary(job.salario)}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.info}>{job.localizacao}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.info}>{job.modelo_trabalho}</Text>
        </View>

        <Text style={styles.level}>{job.nivel}</Text>

        {job.skills && job.skills.length > 0 && (
          <View style={styles.skillsContainer}>
            {job.skills.map((jobSkill, index) => (
              <SkillBadge
                key={index}
                skill={getSkillName(jobSkill.skill_id)}
                obrigatoria={jobSkill.obrigatoria}
              />
            ))}
          </View>
        )}

        {showApplyButton && currentUser && (
          <View style={styles.applyContainer}>
            {alreadyApplied ? (
              <Text style={styles.appliedText}>✓ Já se candidatou</Text>
            ) : (
              <Button
                title="Candidatar-se"
                variant="success"
                onPress={handleApplyPress}
                style={styles.applyButton}
              />
            )}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#374151',
  },
  separator: {
    fontSize: 14,
    color: '#9CA3AF',
    marginHorizontal: 8,
  },
  level: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  applyContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  applyButton: {
    width: '100%',
  },
  appliedText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default JobCard;

