/**
 * StackNavigationScreen.tsx
 * 
 * Navigational stack of screens for app
 */
import { createStackNavigator } from "@react-navigation/stack";
import route_names, { IStackParamList } from "../../routes";
import CameraScreen from "../../screens/CameraScreen";
import ImageEditorScreen from "../../screens/ImageEditor";

const HomeStack = createStackNavigator<IStackParamList>();

/**
 * Starts at CameraScreen.
 * 
 * @returns Navigational Stack of Screens.
 */
export default function StackNavigationScreen() {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name={route_names.CAMERA_SCREEN} component={CameraScreen} />
            <HomeStack.Screen name={route_names.IMAGE_EDITOR_SCREEN} component={ImageEditorScreen} />
        </HomeStack.Navigator>
    );
}