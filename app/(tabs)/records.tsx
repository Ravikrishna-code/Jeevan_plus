import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, Calendar, Pill, Download } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import VoiceButton from '@/components/VoiceButton';

const mockRecords = [
  {
    id: '1',
    type: 'consultation',
    title: 'General Checkup',
    doctor: 'Dr. Rajesh Kumar',
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: '2', 
    type: 'prescription',
    title: 'Fever Treatment',
    doctor: 'Dr. Priya Singh', 
    date: '2024-01-10',
    medicines: ['Paracetamol 500mg', 'Crocin 650mg'],
  },
  {
    id: '3',
    type: 'test_report',
    title: 'Blood Test Results',
    lab: 'Punjab Diagnostics',
    date: '2024-01-05',
    status: 'normal',
  },
];

export default function RecordsScreen() {
  const { t } = useLanguage();

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return FileText;
      case 'prescription':
        return Pill;
      case 'test_report':
        return Calendar;
      default:
        return FileText;
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return '#2563EB';
      case 'prescription':
        return '#059669';
      case 'test_report':
        return '#EA580C';
      default:
        return '#6b7280';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('healthRecords')}</Text>
        <VoiceButton 
          text={t('recordsInstructions')}
          style={styles.voiceButton}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.summaryCards}>
          <View style={[styles.summaryCard, { backgroundColor: '#dbeafe' }]}>
            <Text style={styles.summaryNumber}>12</Text>
            <Text style={styles.summaryLabel}>{t('totalConsultations')}</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#dcfce7' }]}>
            <Text style={styles.summaryNumber}>8</Text>
            <Text style={styles.summaryLabel}>{t('prescriptions')}</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#fed7aa' }]}>
            <Text style={styles.summaryNumber}>5</Text>
            <Text style={styles.summaryLabel}>{t('testReports')}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('recentRecords')}</Text>
        
        {mockRecords.map((record) => {
          const IconComponent = getRecordIcon(record.type);
          const color = getRecordColor(record.type);
          
          return (
            <TouchableOpacity key={record.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <View style={[styles.recordIcon, { backgroundColor: `${color}20` }]}>
                  <IconComponent size={20} color={color} />
                </View>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordTitle}>{record.title}</Text>
                  <Text style={styles.recordSubtitle}>
                    {'doctor' in record ? record.doctor : record.lab}
                  </Text>
                  <Text style={styles.recordDate}>{record.date}</Text>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <Download size={16} color="#6b7280" />
                </TouchableOpacity>
              </View>
              
              {'medicines' in record && record.medicines && (
                <View style={styles.medicinesList}>
                  {record.medicines.map((medicine, index) => (
                    <Text key={index} style={styles.medicineItem}>• {medicine}</Text>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  voiceButton: {
    backgroundColor: '#2563EB',
  },
  content: {
    padding: 20,
  },
  summaryCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  recordCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  recordSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  recordDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  downloadButton: {
    padding: 8,
  },
  medicinesList: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  medicineItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
});