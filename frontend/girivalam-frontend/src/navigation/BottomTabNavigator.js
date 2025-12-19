import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import ChatScreen from "../screens/ChatbotScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MusicScreen from "../screens/MusicScreen";
import FullMoonScreen from "../screens/FullMoonScreen";
import VideoGalleryScreen from "../screens/VideoGalleryScreen";
import FeedbackScreen from "../screens/FeedbackScreen"; // 👈 NEW

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Profile Stack with all sub-screens
function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FullMoonScreen"
                component={FullMoonScreen}
                options={{ title: "Full Moon Dates" }}
            />
            <Stack.Screen
                name="VideoGalleryScreen"
                component={VideoGalleryScreen}
                options={{ title: "Video Gallery" }}
            />
            <Stack.Screen
                name="FeedbackScreen"
                component={FeedbackScreen}
                options={{ title: "User Feedback" }} // 👈 NEW
            />
        </Stack.Navigator>
    );
}

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#4F6F52",
                tabBarInactiveTintColor: "#999",
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 5,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Girivalam"
                component={MapScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="walking" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Music"
                component={MusicScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="musical-notes-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubble-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack} // Updated to ProfileStack
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
