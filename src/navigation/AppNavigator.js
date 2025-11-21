import React, { useEffect, useRef } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { initializeStorage } from '../services/storage';

// Auth Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import CandidateLoginScreen from '../screens/auth/CandidateLoginScreen';
import RHLoginScreen from '../screens/auth/RHLoginScreen';

// Candidate Screens
import CandidateHomeScreen from '../screens/candidate/CandidateHomeScreen';
import CandidateProfileScreen from '../screens/candidate/CandidateProfileScreen';
import MyApplicationsScreen from '../screens/candidate/MyApplicationsScreen';
import JobDetailScreen from '../screens/candidate/JobDetailScreen';

// RH Screens
import RHDashboardScreen from '../screens/rh/RHDashboardScreen';
import RHJobsScreen from '../screens/rh/RHJobsScreen';
import RHCreateJobScreen from '../screens/rh/RHCreateJobScreen';
import RHTalentPoolScreen from '../screens/rh/RHTalentPoolScreen';
import RHCandidateDetailScreen from '../screens/rh/RHCandidateDetailScreen';
import RHJobApplicationsScreen from '../screens/rh/RHJobApplicationsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Candidate Stack Navigator
const CandidateStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#10B981',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="CandidateHome" 
        component={CandidateHomeScreen}
        options={{ title: 'Vagas Disponíveis' }}
      />
      <Stack.Screen 
        name="JobDetail" 
        component={JobDetailScreen}
        options={{ title: 'Detalhes da Vaga' }}
      />
      <Stack.Screen 
        name="CandidateProfile" 
        component={CandidateProfileScreen}
        options={{ title: 'Meu Perfil' }}
      />
      <Stack.Screen 
        name="MyApplications" 
        component={MyApplicationsScreen}
        options={{ title: 'Minhas Candidaturas' }}
      />
    </Stack.Navigator>
  );
};

// RH Tab Navigator
const RHTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tab.Screen 
        name="RHDashboard" 
        component={RHDashboardScreen}
        options={{ 
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="RHJobs" 
        component={RHJobsScreen}
        options={{ 
          title: 'Vagas',
          tabBarLabel: 'Vagas',
        }}
      />
      <Tab.Screen 
        name="RHTalentPool" 
        component={RHTalentPoolScreen}
        options={{ 
          title: 'Talentos',
          tabBarLabel: 'Talentos',
        }}
      />
    </Tab.Navigator>
  );
};

// RH Stack Navigator (wraps tabs and detail screens)
const RHStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="RHTabs" 
        component={RHTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="RHCreateJob" 
        component={RHCreateJobScreen}
        options={{ title: 'Nova Vaga' }}
      />
      <Stack.Screen 
        name="RHCandidateDetail" 
        component={RHCandidateDetailScreen}
        options={{ title: 'Perfil do Candidato' }}
      />
      <Stack.Screen 
        name="RHJobApplications" 
        component={RHJobApplicationsScreen}
        options={{ title: 'Candidaturas' }}
      />
    </Stack.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const { userRole, loading } = useAuth();
  const [initializing, setInitializing] = React.useState(true);
  const [navKey, setNavKey] = React.useState(0);
  const prevUserRoleRef = React.useRef(userRole); // Inicializar com o valor atual
  const navigationRef = React.useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const init = async () => {
      try {
        await initializeStorage();
        if (isMounted) {
          setInitializing(false);
        }
      } catch (error) {
        console.error('Erro ao inicializar storage:', error);
        if (isMounted) {
          setInitializing(false);
        }
      }
    };
    
    // Timeout de segurança
    const timeout = setTimeout(() => {
      if (isMounted) {
        console.warn('Timeout na inicialização, continuando...');
        setInitializing(false);
      }
    }, 5000);
    
    init();
    
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  // Atualizar ref quando userRole muda
  useEffect(() => {
    if (!initializing && !loading) {
      const prevRole = prevUserRoleRef.current;
      const currentRole = userRole;
      
      console.log('AppNavigator - userRole mudou. Atual:', currentRole, 'Anterior (ref):', prevRole);
      
      // Quando userRole muda de um valor (candidate/rh) para null (logout)
      if (prevRole && (prevRole === 'candidate' || prevRole === 'rh') && !currentRole) {
        console.log('AppNavigator - ✅✅✅ DETECTADO LOGOUT! userRole mudou de', prevRole, 'para', currentRole);
        console.log('AppNavigator - Forçando remontagem do NavigationContainer');
        
        // Incrementar navKey para forçar remontagem completa
        setNavKey(prev => {
          const newKey = prev + 1;
          console.log('AppNavigator - navKey incrementado de', prev, 'para', newKey);
          return newKey;
        });
      }
      
      // Atualizar ref APÓS verificar logout
      if (prevRole !== currentRole) {
        console.log('AppNavigator - Atualizando prevUserRoleRef de', prevRole, 'para', currentRole);
        prevUserRoleRef.current = currentRole;
      }
    }
  }, [userRole, initializing, loading]);

  if (initializing || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // Renderizar diferentes navegadores baseado no userRole
  if (!userRole) {
    // Auth Stack - Sempre mostra Welcome quando não há userRole
    // Usar navKey + timestamp para garantir remontagem completa quando muda
    const authKey = `auth-${navKey}`;
    console.log('AppNavigator - Renderizando Auth Stack com key:', authKey, 'userRole:', userRole, 'navKey:', navKey);
    return (
      <NavigationContainer key={authKey}>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName="Welcome"
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="CandidateLogin" component={CandidateLoginScreen} />
          <Stack.Screen name="RHLogin" component={RHLoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (userRole === 'candidate') {
    return (
      <NavigationContainer key={`candidate-${navKey}`}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="CandidateStack" component={CandidateStackNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // RH Stack
  return (
    <NavigationContainer key={`rh-${navKey}`}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RHStack" component={RHStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
});

export default AppNavigator;

