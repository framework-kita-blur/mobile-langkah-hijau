import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';

import { brand, fonts } from '@/constants/brand';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: brand.primary,
        tabBarInactiveTintColor: brand.gray,
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        tabBarStyle: { backgroundColor: brand.white, borderTopColor: brand.border, borderTopWidth: 1 },
        sceneStyle: { backgroundColor: brand.cream },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vehicle"
        options={{
          title: 'Vehicle',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="motorbike" size={size + 4} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trip"
        options={{
          title: 'Trip',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'map' : 'map-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
