import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Clock, Check, X } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import VoiceButton from '@/components/VoiceButton';

const mockPharmacies = [
  {
    id: '1',
    name: 'Sharma Medical Store',
    address: 'Main Market, Ludhiana',
    distance: '1.2 km',
    openHours: '8 AM - 10 PM',
    medicines: [
      { name: 'Paracetamol', available: true },
      { name: 'Crocin', available: true },
      { name: 'Amoxicillin', available: false },
    ],
  },
  {
    id: '2',
    name: 'Punjab Pharmacy',
    address: 'Civil Lines, Ludhiana',
    distance: '2.8 km',
    openHours: '9 AM - 9 PM',
    medicines: [
      { name: 'Paracetamol', available: true },
      { name: 'Crocin', available: false },
      { name: 'Amoxicillin', available: true },
    ],
  },
];

export default function PharmacyScreen() {
  const { t } = useLanguage();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('nearbyPharmacies')}</Text>
        <VoiceButton 
          text={t('pharmacyListInstructions')}
          style={styles.voiceButton}
        />
      </View>

      <View style={styles.content}>
        {mockPharmacies.map((pharmacy) => (
          <View key={pharmacy.id} style={styles.pharmacyCard}>
            <View style={styles.pharmacyInfo}>
              <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
              
              <View style={styles.infoRow}>
                <MapPin size={16} color="#6b7280" />
                <Text style={styles.infoText}>{pharmacy.address}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Clock size={16} color="#6b7280" />
                <Text style={styles.infoText}>{pharmacy.openHours}</Text>
              </View>
              
              <Text style={styles.distance}>{pharmacy.distance} {t('away')}</Text>
            </View>

            <View style={styles.medicinesList}>
              <Text style={styles.medicinesTitle}>{t('prescribedMedicines')}</Text>
              {pharmacy.medicines.map((medicine, index) => (
                <View key={index} style={styles.medicineRow}>
                  <Text style={styles.medicineName}>{medicine.name}</Text>
                  <View style={styles.availabilityIndicator}>
                    {medicine.available ? (
                      <>
                        <Check size={16} color="#059669" />
                        <Text style={[styles.availabilityText, { color: '#059669' }]}>
                          {t('available')}
                        </Text>
                      </>
                    ) : (
                      <>
                        <X size={16} color="#dc2626" />
                        <Text style={[styles.availabilityText, { color: '#dc2626' }]}>
                          {t('outOfStock')}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>{t('contactPharmacy')}</Text>
            </TouchableOpacity>
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
  pharmacyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pharmacyInfo: {
    marginBottom: 16,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
  },
  distance: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
    marginTop: 4,
  },
  medicinesList: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
    marginBottom: 16,
  },
  medicinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  medicineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  medicineName: {
    fontSize: 14,
    color: '#1f2937',
  },
  availabilityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  contactButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});