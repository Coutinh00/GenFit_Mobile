import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert, Modal, TouchableOpacity } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import SkillBadge from '../../components/common/SkillBadge';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { updateCandidate } from '../../services/storage';

const CandidateProfileScreen = ({ navigation }) => {
  const { currentUser, updateUser, logout } = useAuth();
  const { skills, editCandidate, refreshData } = useData();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [userSkills, setUserSkills] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillLevel, setSkillLevel] = useState(0.5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setNome(currentUser.nome || '');
      setEmail(currentUser.email || '');
      setTelefone(currentUser.telefone || '');
      setLinkedin(currentUser.linkedin_url || '');
      setUserSkills(currentUser.skills || []);
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const updatedCandidate = {
        ...currentUser,
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim() || null,
        linkedin_url: linkedin.trim() || null,
        skills: userSkills,
      };

      await editCandidate(currentUser.id, updatedCandidate);
      await updateUser(updatedCandidate);
      await refreshData();

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = () => {
    setShowSkillModal(true);
  };

  const handleSelectSkill = (skill) => {
    setSelectedSkill(skill);
  };

  const handleConfirmSkill = () => {
    if (selectedSkill) {
      const exists = userSkills.some(us => us.skill_id === selectedSkill.id);
      if (!exists) {
        setUserSkills([...userSkills, {
          skill_id: selectedSkill.id,
          nivel_proficiencia: skillLevel,
        }]);
      }
      setShowSkillModal(false);
      setSelectedSkill(null);
      setSkillLevel(0.5);
    }
  };

  const handleRemoveSkill = (skillId) => {
    setUserSkills(userSkills.filter(us => us.skill_id !== skillId));
  };

  const getSkillName = (skillId) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? skill.nome : `Skill ${skillId}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <Input
            label="Nome Completo *"
            value={nome}
            onChangeText={setNome}
            placeholder="Seu nome completo"
          />

          <Input
            label="Email *"
            value={email}
            onChangeText={setEmail}
            placeholder="seu.email@exemplo.com"
            keyboardType="email-address"
          />

          <Input
            label="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            placeholder="(11) 98765-4321"
            keyboardType="phone-pad"
          />

          <Input
            label="LinkedIn"
            value={linkedin}
            onChangeText={setLinkedin}
            placeholder="https://linkedin.com/in/seu-perfil"
            keyboardType="url"
          />
        </Card>

        <Card>
          <View style={styles.skillsHeader}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Button
              title="+ Adicionar"
              variant="secondary"
              onPress={handleAddSkill}
              style={styles.addButton}
            />
          </View>

          <View style={styles.skillsContainer}>
            {userSkills.map((userSkill, index) => (
              <SkillBadge
                key={index}
                skill={getSkillName(userSkill.skill_id)}
                nivel={userSkill.nivel_proficiencia}
                onRemove={() => handleRemoveSkill(userSkill.skill_id)}
              />
            ))}
            {userSkills.length === 0 && (
              <Text style={styles.emptyText}>Nenhuma skill adicionada</Text>
            )}
          </View>
        </Card>

        <Button
          title="Salvar Perfil"
          onPress={handleSave}
          variant="primary"
          loading={loading}
          style={styles.saveButton}
        />

        <Button
          title="Sair do Aplicativo"
          onPress={async () => {
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
                      const success = await logout();
                      if (success) {
                        console.log('Logout concluído, redirecionando para tela de login...');
                      } else {
                        Alert.alert('Erro', 'Não foi possível fazer logout');
                      }
                    } catch (error) {
                      console.error('Erro ao fazer logout:', error);
                      Alert.alert('Erro', 'Não foi possível fazer logout');
                    }
                  },
                },
              ]
            );
          }}
          variant="danger"
          style={styles.logoutButton}
        />
      </ScrollView>

      {/* Modal de Seleção de Skill */}
      <Modal
        visible={showSkillModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSkillModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Skill</Text>
            
            <ScrollView style={styles.skillsList}>
              {skills.map((skill) => (
                <TouchableOpacity
                  key={skill.id}
                  style={[
                    styles.skillOption,
                    selectedSkill?.id === skill.id && styles.skillOptionSelected,
                  ]}
                  onPress={() => handleSelectSkill(skill)}
                >
                  <Text style={styles.skillOptionText}>{skill.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {selectedSkill && (
              <View style={styles.levelContainer}>
                <Text style={styles.levelLabel}>
                  Nível: {Math.round(skillLevel * 100)}%
                </Text>
                <View style={styles.levelSlider}>
                  <TouchableOpacity
                    style={styles.levelButton}
                    onPress={() => setSkillLevel(Math.max(0, skillLevel - 0.1))}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <View style={styles.levelBar}>
                    <View
                      style={[styles.levelFill, { width: `${skillLevel * 100}%` }]}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.levelButton}
                    onPress={() => setSkillLevel(Math.min(1, skillLevel + 0.1))}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={styles.modalActions}>
              <Button
                title="Cancelar"
                variant="secondary"
                onPress={() => setShowSkillModal(false)}
                style={styles.modalButton}
              />
              <Button
                title="Adicionar"
                variant="primary"
                onPress={handleConfirmSkill}
                disabled={!selectedSkill}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  skillsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  saveButton: {
    marginTop: 16,
  },
  logoutButton: {
    marginTop: 12,
    marginBottom: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  skillsList: {
    maxHeight: 200,
    marginBottom: 16,
  },
  skillOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginBottom: 8,
  },
  skillOptionSelected: {
    backgroundColor: '#DBEAFE',
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  skillOptionText: {
    fontSize: 16,
    color: '#111827',
  },
  levelContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  levelLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  levelSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  levelFill: {
    height: '100%',
    backgroundColor: '#2563EB',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
  },
});

export default CandidateProfileScreen;

