import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { User, Stethoscope, Pill, Globe, Volume2 } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useVoice } from '@/hooks/useVoice';
import { router } from 'expo-router';
import VoiceButton from '@/components/VoiceButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LoginScreen() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const { speak } = useVoice();

  const handleRoleSelection = async (role: 'patient' | 'doctor' | 'pharmacy') => {
    try {
      await login(role);
      speak(t('loginSuccess'));
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert(t('error'), t('loginError'));
    }
  };

  const roles = [
    {
      id: 'patient',
      title: t('patient'),
      subtitle: t('patientSubtitle'),
      icon: User,
      color: '#2563EB',
    },
    {
      id: 'doctor',
      title: t('doctor'),
      subtitle: t('doctorSubtitle'),
      icon: Stethoscope,
      color: '#059669',
    },
    {
      id: 'pharmacy',
      title: t('pharmacy'),
      subtitle: t('pharmacySubtitle'),
      icon: Pill,
      color: '#EA580C',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LanguageSwitcher />
        <VoiceButton 
          text={t('welcomeMessage')}
          style={styles.voiceButton}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{t('welcomeTitle')}</Text>
        <Text style={styles.subtitle}>{t('selectRole')}</Text>

        <View style={styles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[styles.roleButton, { borderColor: role.color }]}
              onPress={() => handleRoleSelection(role.id as any)}
              activeOpacity={0.8}
            >
              <role.icon size={48} color={role.color} />
              <Text style={[styles.roleTitle, { color: role.color }]}>
                {role.title}
              </Text>
              <Text style={styles.roleSubtitle}>{role.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Volume2 size={20} color="#6b7280" />
          <Text style={styles.footerText}>{t('voiceInstructions')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  voiceButton: {
    backgroundColor: '#2563EB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  rolesContainer: {
    width: '100%',
    gap: 20,
  },
  roleButton: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  roleSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});