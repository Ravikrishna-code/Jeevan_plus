import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, Activity, Clock, Bell } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useVoice } from '@/hooks/useVoice';
import VoiceButton from '@/components/VoiceButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HomeScreen() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { speak } = useVoice();

  useEffect(() => {
    speak(t('welcomeHome', { role: user?.role }));
  }, []);

  const getHomeContent = () => {
    switch (user?.role) {
      case 'patient':
        return (
          <View style={styles.dashboardGrid}>
            <TouchableOpacity style={[styles.dashboardCard, { backgroundColor: '#dbeafe' }]}>
              <Heart size={32} color="#2563EB" />
              <Text style={styles.cardTitle}>{t('myHealth')}</Text>
              <Text style={styles.cardSubtitle}>{t('viewRecords')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.dashboardCard, { backgroundColor: '#dcfce7' }]}>
              <Activity size={32} color="#059669" />
              <Text style={styles.cardTitle}>{t('symptoms')}</Text>
              <Text style={styles.cardSubtitle}>{t('checkSymptoms')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.dashboardCard, { backgroundColor: '#fed7aa' }]}>
              <Clock size={32} color="#EA580C" />
              <Text style={styles.cardTitle}>{t('appointments')}</Text>
              <Text style={styles.cardSubtitle}>{t('bookDoctor')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.dashboardCard, { backgroundColor: '#fae8ff' }]}>
              <Bell size={32} color="#c026d3" />
              <Text style={styles.cardTitle}>{t('reminders')}</Text>
              <Text style={styles.cardSubtitle}>{t('medicineAlerts')}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'doctor':
        return (
          <View style={styles.dashboardGrid}>
            <View style={[styles.dashboardCard, { backgroundColor: '#dbeafe' }]}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.cardTitle}>{t('pendingConsultations')}</Text>
            </View>
            
            <View style={[styles.dashboardCard, { backgroundColor: '#dcfce7' }]}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.cardTitle}>{t('todayPatients')}</Text>
            </View>
          </View>
        );
      case 'pharmacy':
        return (
          <View style={styles.dashboardGrid}>
            <View style={[styles.dashboardCard, { backgroundColor: '#fed7aa' }]}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.cardTitle}>{t('medicinesInStock')}</Text>
            </View>
            
            <View style={[styles.dashboardCard, { backgroundColor: '#fae8ff' }]}>
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.cardTitle}>{t('pendingOrders')}</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{t('hello')}</Text>
          <Text style={styles.userRole}>{t(user?.role || 'user')}</Text>
        </View>
        <View style={styles.headerActions}>
          <LanguageSwitcher />
          <VoiceButton 
            text={t('homeScreenContent')}
            style={styles.voiceButton}
          />
        </View>
      </View>

      <View style={styles.content}>
        {getHomeContent()}
        
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          <VoiceButton 
            text={t('quickActionsInstructions')}
            style={[styles.voiceButton, { alignSelf: 'flex-start' }]}
          />
        </View>
      </View>
    </ScrollView>
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
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 16,
    color: '#6b7280',
  },
  userRole: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textTransform: 'capitalize',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  voiceButton: {
    backgroundColor: '#2563EB',
  },
  content: {
    padding: 20,
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  dashboardCard: {
    flex: 1,
    minWidth: '45%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  quickActions: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
});