// In app/_layout.js
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // This targets your app/index.js file
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}