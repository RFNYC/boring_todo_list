import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }} initialRouteName='login'>
      <Tabs.Screen
        name="login"
        options={{
          title: 'login',
          animation: "shift",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerShown: false,
          href: null,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />

      <Tabs.Screen
        name="signup"
        options={{
          title: 'signup',
          animation: "shift",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerShown: false,
          href: null,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Create Tasks',
          animation:"shift",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />

      <Tabs.Screen
        name="taskcomponent"
        options={{
          animation:"shift",
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}
