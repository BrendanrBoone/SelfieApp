import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import {
    useCameraDevice,
    Camera,
    useCameraPermission
} from "react-native-vision-camera"
import NoCameraErrorView from "./NoCameraErrorView"
import PermissionScreen from "./PermissionScreen";

export default function CameraScreen() {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('front')

    if (device == null) return <NoCameraErrorView />
    if (!hasPermission) {
        return <PermissionScreen
            onPress={requestPermission}
            color="grey"
            color_pressed="black" />
    } else {
        return (
            <Camera
                style={{ height: "100%", width: "100%" }}
                device={device}
                isActive={true}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        opacity: 0.8
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 30
    },
    image: {
        flex: 1,
        justifyContent: 'center'
    }
});
