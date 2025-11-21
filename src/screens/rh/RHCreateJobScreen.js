import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Modal, TouchableOpacity, Alert } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import SkillBadge from '../../components/common/SkillBadge';
import Card from '../../components/common/Card';
import { useData } from '../../context/DataContext';

const RHCreateJobScreen = ({ navigation, route }) => {
  const { createJob, editJob, skills } = useData();
  const editingJob = route.params?.job;

  const [titulo, setTitulo] = useState(editingJob?.titulo || '');
  const [descricao, setDescricao] = useState(editingJob?.descricao || '');
  const [salario, setSalario] = useState(editingJob?.salario?.toString() || '');
  const [localizacao, setLocalizacao] = useState(editingJob?.localizacao || '');
  const [tipoContrato, setTipoContrato] = useState(editingJob?.tipo_contrato || 'CLT');
  const [nivel, setNivel] = useState(editingJob?.nivel || 'Pleno');
  const [modeloTrabalho, setModeloTrabalho] = useState(editingJob?.modelo_trabalho || 'Remoto');
  const [departamento, setDepartamento] = useState(editingJob?.departamento || '');
  const [jobSkills, setJobSkills] = useState(editingJob?.skills || []);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillObrigatoria, setSkillObrigatoria] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAddSkill = () => {
    setShowSkillModal(true);
  };

  const handleSelectSkill = (skill) => {
    setSelectedSkill(skill);
  };

  const handleConfirmSkill = () => {
    if (selectedSkill) {
      const exists = jobSkills.some(js => js.skill_id === selectedSkill.id);
      if (!exists) {
        setJobSkills([...jobSkills, {
          skill_id: selectedSkill.id,
          obrigatoria: skillObrigatoria,
        }]);
      }
      setShowSkillModal(false);
      setSelectedSkill(null);
      setSkillObrigatoria(true);
    }
  };

  const handleRemoveSkill = (skillId) => {
    setJobSkills(jobSkills.filter(js => js.skill_id !== skillId));
  };

  const handleSave = async () => {
    if (!titulo.trim() || !descricao.trim() || !salario.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const salaryValue = parseFloat(salario.replace(/[^\d,.-]/g, '').replace(',', '.'));
    if (isNaN(salaryValue) || salaryValue <= 0) {
      Alert.alert('Erro', 'Salário inválido');
      return;
    }

    setLoading(true);
    try {
      const jobData = {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        salario: salaryValue,
        localizacao: localizacao.trim() || 'Remoto',
        tipo_contrato: tipoContrato,
        nivel: nivel,
        modelo_trabalho: modeloTrabalho,
        departamento: departamento.trim() || 'Tecnologia',
        skills: jobSkills,
      };

      if (editingJob) {
        await editJob(editingJob.id, jobData);
        Alert.alert('Sucesso', 'Vaga atualizada com sucesso!');
      } else {
        await createJob(jobData);
        Alert.alert('Sucesso', 'Vaga criada com sucesso!');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a vaga');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSkillName = (skillId) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? skill.nome : `Skill ${skillId}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.sectionTitle}>Informações da Vaga</Text>
          
          <Input
            label="Título *"
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: Desenvolvedor Python Sênior"
          />

          <Input
            label="Descrição *"
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descreva a vaga..."
            multiline
            numberOfLines={4}
          />

          <Input
            label="Salário *"
            value={salario}
            onChangeText={setSalario}
            placeholder="Ex: 12000"
            keyboardType="numeric"
          />

          <Input
            label="Localização"
            value={localizacao}
            onChangeText={setLocalizacao}
            placeholder="Ex: São Paulo - SP"
          />

          <Input
            label="Departamento"
            value={departamento}
            onChangeText={setDepartamento}
            placeholder="Ex: Tecnologia"
          />
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <View style={styles.optionGroup}>
            <Text style={styles.optionLabel}>Tipo de Contrato</Text>
            <View style={styles.options}>
              {['CLT', 'PJ', 'Estágio'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    tipoContrato === option && styles.optionSelected,
                  ]}
                  onPress={() => setTipoContrato(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      tipoContrato === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.optionGroup}>
            <Text style={styles.optionLabel}>Nível</Text>
            <View style={styles.options}>
              {['Junior', 'Pleno', 'Senior'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    nivel === option && styles.optionSelected,
                  ]}
                  onPress={() => setNivel(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      nivel === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.optionGroup}>
            <Text style={styles.optionLabel}>Modelo de Trabalho</Text>
            <View style={styles.options}>
              {['Remoto', 'Hibrido', 'Presencial'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    modeloTrabalho === option && styles.optionSelected,
                  ]}
                  onPress={() => setModeloTrabalho(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      modeloTrabalho === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        <Card>
          <View style={styles.skillsHeader}>
            <Text style={styles.sectionTitle}>Skills Requeridas</Text>
            <Button
              title="+ Adicionar"
              variant="secondary"
              onPress={handleAddSkill}
              style={styles.addButton}
            />
          </View>

          <View style={styles.skillsContainer}>
            {jobSkills.map((jobSkill, index) => (
              <SkillBadge
                key={index}
                skill={getSkillName(jobSkill.skill_id)}
                obrigatoria={jobSkill.obrigatoria}
                onRemove={() => handleRemoveSkill(jobSkill.skill_id)}
              />
            ))}
            {jobSkills.length === 0 && (
              <Text style={styles.emptyText}>Nenhuma skill adicionada</Text>
            )}
          </View>
        </Card>

        <Button
          title={editingJob ? 'Atualizar Vaga' : 'Criar Vaga'}
          onPress={handleSave}
          variant="primary"
          loading={loading}
          style={styles.saveButton}
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
              <View style={styles.obrigatoriaContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setSkillObrigatoria(!skillObrigatoria)}
                >
                  <Text style={styles.checkboxText}>
                    {skillObrigatoria ? '✓' : '○'} Obrigatória
                  </Text>
                </TouchableOpacity>
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
  optionGroup: {
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  options: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#DBEAFE',
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  optionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#2563EB',
    fontWeight: '600',
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
  obrigatoriaContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  checkbox: {
    padding: 8,
  },
  checkboxText: {
    fontSize: 16,
    color: '#111827',
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

export default RHCreateJobScreen;

