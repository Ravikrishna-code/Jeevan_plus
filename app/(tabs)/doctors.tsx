import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Video, Phone, MessageCircle, Mic } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import VoiceButton from '@/components/VoiceButton';

const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    specialty: 'General Medicine',
    experience: '15 years',
    rating: 4.8,
    distance: '2.5 km',
    available: true,
  },
  {
    id: '2', 
    name: 'Dr. Priya Singh',
    specialty: 'Pediatrics',
    experience: '12 years',
    rating: 4.9,
    distance: '5.1 km',
    available: true,
  },
  {
    id: '3',
    name: 'Dr. Amarjit Kaur',
    specialty: 'Gynecology',
    experience: '20 years', 
    rating: 4.7,
    distance: '8.3 km',
    available: false,
  },
];

export default function DoctorsScreen() {
  const { t } = useLanguage();

  const consultationOptions = [
    { id: 'video', icon: Video, label: t('videoCall'), color: '#2563EB' },
    { id: 'audio', icon: Phone, label: t('audioCall'), color: '#059669' },
    { id: 'voice', icon: Mic, label: t('voiceMessage'), color: '#EA580C' },
    { id: 'chat', icon: MessageCircle, label: t('textChat'), color: '#c026d3' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('availableDoctors')}</Text>
        <VoiceButton 
          text={t('doctorListInstructions')}
          style={styles.voiceButton}
        />
      </View>

      <View style={styles.content}>
        {mockDoctors.map((doctor) => (
          <View key={doctor.id} style={styles.doctorCard}>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <Text style={styles.doctorDetails}>
                {doctor.experience} • {doctor.distance} • ⭐ {doctor.rating}
              </Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: doctor.available ? '#dcfce7' : '#fef2f2' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: doctor.available ? '#059669' : '#dc2626' }
                ]}>
                  {doctor.available ? t('available') : t('busy')}
                </Text>
              </View>
            </View>

            {doctor.available && (
              <View style={styles.consultationOptions}>
                <Text style={styles.optionsTitle}>{t('consultationOptions')}</Text>
                <View style={styles.optionsGrid}>
                  {consultationOptions.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={[styles.optionButton, { borderColor: option.color }]}
                    >
                      <option.icon size={20} color={option.color} />
                      <Text style={[styles.optionText, { color: option.color }]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        ))}
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
    gap: 16,
  },
  doctorCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorInfo: {
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#2563EB',
    marginBottom: 4,
  },
  doctorDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  consultationOptions: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    gap: 6,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});