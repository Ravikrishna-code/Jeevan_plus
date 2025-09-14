import { Tabs } from 'expo-router';
import { Stethoscope, User, Pill, Chrome as Home, Settings } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const getTabsForRole = () => {
    switch (user.role) {
      case 'patient':
        return (
          <>
            <Tabs.Screen
              name="home"
              options={{
                title: 'Home',
                tabBarIcon: ({ size, color }) => (
                  <Home size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="symptom-checker"
              options={{
                title: 'Symptoms',
                tabBarIcon: ({ size, color }) => (
                  <Stethoscope size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="doctors"
              options={{
                title: 'Doctors',
                tabBarIcon: ({ size, color }) => (
                  <User size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="pharmacy"
              options={{
                title: 'Pharmacy',
                tabBarIcon: ({ size, color }) => (
                  <Pill size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="records"
              options={{
                title: 'Records',
                tabBarIcon: ({ size, color }) => (
                  <Settings size={size} color={color} />
                ),
              }}
            />
          </>
        );
      case 'doctor':
        return (
          <>
            <Tabs.Screen
              name="home"
              options={{
                title: 'Dashboard',
                tabBarIcon: ({ size, color }) => (
                  <Home size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="patients"
              options={{
                title: 'Patients',
                tabBarIcon: ({ size, color }) => (
                  <User size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="consultations"
              options={{
                title: 'Consultations',
                tabBarIcon: ({ size, color }) => (
                  <Stethoscope size={size} color={color} />
                ),
              }}
            />
          </>
        );
      case 'pharmacy':
        return (
          <>
            <Tabs.Screen
              name="home"
              options={{
                title: 'Dashboard',
                tabBarIcon: ({ size, color }) => (
                  <Home size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="inventory"
              options={{
                title: 'Inventory',
                tabBarIcon: ({ size, color }) => (
                  <Pill size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="prescriptions"
              options={{
                title: 'Prescriptions',
                tabBarIcon: ({ size, color }) => (
                  <Settings size={size} color={color} />
                ),
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      {getTabsForRole()}
    </Tabs>
  );
}