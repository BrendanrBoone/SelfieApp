import { StyleSheet } from "react-native"
import { 
    useCameraDevice,
    Camera
 } from "react-native-vision-camera"
import NoCameraErrorView from "./NoCameraErrorView"

export default function CameraScreen() {
    const device = useCameraDevice('front')

    if (device == null) return <NoCameraErrorView />
    return (
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
        />
    )
}