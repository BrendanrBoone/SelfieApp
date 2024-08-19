import { StyleSheet } from "react-native"
import { 
    useCameraDevice,
    Camera,
    useCameraPermission
 } from "react-native-vision-camera"
import NoCameraErrorView from "./NoCameraErrorView"
import PermissionScreen from "./PermissionScreen";

export default function CameraScreen() {
    const {hasPermission, requestPermission} = useCameraPermission();
    const device = useCameraDevice('front')

    if (device == null) return <NoCameraErrorView />
    if (!hasPermission) {
        return <PermissionScreen 
            onPress={requestPermission} 
            color="grey" 
            color_pressed="black"/>
    } else {
        return (
            <Camera
                style={{height: "100%", width: "100%"}}
                device={device}
                isActive={true}
            />
        )
    }
}
