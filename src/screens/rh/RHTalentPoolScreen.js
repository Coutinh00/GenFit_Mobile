import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
import CandidateCard from '../../components/CandidateCard';
import { useData } from '../../context/DataContext';

const RHTalentPoolScreen = ({ navigation }) => {
  const { candidates } = useData();
  const [searchText, setSearchText] = useState('');

  const filteredCandidates = candidates.filter(candidate =>
    candidate.nome.toLowerCase().includes(searchText.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCandidatePress = (candidate) => {
    navigation.navigate('RHCandidateDetail', { candidateId: candidate.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Banco de Talentos</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar candidatos..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredCandidates}
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
            <Text style={styles.emptyText}>Nenhum candidato encontrado</Text>
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
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
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

export default RHTalentPoolScreen;

