import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './common/Card';
import SkillBadge from './common/SkillBadge';
import { useData } from '../context/DataContext';

const CandidateCard = ({ candidate, onPress }) => {
  const { skills } = useData();

  const getSkillName = (skillId) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? skill.nome : `Skill ${skillId}`;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card>
        <Text style={styles.name}>{candidate.nome}</Text>
        <Text style={styles.email}>{candidate.email}</Text>
        
        {candidate.telefone && (
          <Text style={styles.phone}>{candidate.telefone}</Text>
        )}

        {candidate.skills && candidate.skills.length > 0 && (
          <View style={styles.skillsContainer}>
            {candidate.skills.map((candidateSkill, index) => (
              <SkillBadge
                key={index}
                skill={getSkillName(candidateSkill.skill_id)}
                nivel={candidateSkill.nivel_proficiencia}
              />
            ))}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});

export default CandidateCard;

