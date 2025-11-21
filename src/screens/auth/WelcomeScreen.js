import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Button from '../../components/common/Button';

const WelcomeScreen = ({ navigation }) => {
  const handleCandidatePress = () => {
    navigation.navigate('CandidateLogin');
  };

  const handleRHPress = () => {
    navigation.navigate('RHLogin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>GenFit RH</Text>
        <Text style={styles.subtitle}>Sistema de Gestão de Recursos Humanos</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Quero me candidatar"
            onPress={handleCandidatePress}
            variant="primary"
            style={styles.button}
          />
          
          <Button
            title="Sou do RH"
            onPress={handleRHPress}
            variant="secondary"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 48,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  button: {
    marginBottom: 16,
  },
});

export default WelcomeScreen;

