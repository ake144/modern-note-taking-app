import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MainLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          paddingTop:10,
          height:70,
        },
      tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,   
        headerShown: false,
     tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="notes"
        options={{
          title: 'notes',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="house.fill" color={focused ? color : Colors[colorScheme ?? 'light'].tabIconDefault} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name={(focused ? "person" : "person.outline") as any} color={color} />,
        }}
      />
    </Tabs>
  );
}
