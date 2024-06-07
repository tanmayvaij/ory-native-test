import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Sign In",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "log-in" : "log-in-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "Sign Up",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "log-in" : "log-in-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recovery"
        options={{
          title: "Recovery",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "log-in" : "log-in-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
