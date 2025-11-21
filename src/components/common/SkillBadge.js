import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SkillBadge = ({ skill, nivel, obrigatoria = false, onRemove }) => {
  const skillName = typeof skill === 'string' ? skill : skill?.nome || 'Skill';
  
  return (
    <View style={[styles.badge, obrigatoria && styles.badgeObrigatoria]}>
      <Text style={styles.badgeText}>
        {skillName}
        {nivel !== undefined && ` (${Math.round(nivel * 100)}%)`}
        {obrigatoria && ' *'}
      </Text>
      {onRemove && (
        <Text style={styles.removeButton} onPress={onRemove}>
          ×
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeObrigatoria: {
    backgroundColor: '#DBEAFE',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  badgeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  removeButton: {
    marginLeft: 6,
    fontSize: 18,
    color: '#EF4444',
    fontWeight: 'bold',
  },
});

export default SkillBadge;

