import { runOnJS } from 'react-native-reanimated';
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    Dimensions,
    Image
} from "react-native"

import {
    Camera,
    useCameraPermission,
    useCameraDevice,
    PhotoFile
} from "react-native-vision-camera";

import NoCameraErrorView from "./NoCameraErrorView";
import PermissionScreen from "./PermissionScreen";

//import { scanFaces, Face } from "vision-camera-face-detector";
import { useEffect, useState, useRef } from "react";

const { height, width } = Dimensions.get("window");
const captureButtonDimensions = 100;

export default function CameraScreen() {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('front');
    const camera = useRef<Camera>(null);
    const [image, setImage] = useState<PhotoFile | null>(null);

    //const [faces, setfaces] = useState<Face[]>();
    /* 
        useEffect(() => {
            console.log(faces);
        }, [faces]);
     */

    const takePhoto = async () => {
        if (camera.current) {
            try {
                const photo = await camera.current.takePhoto();
                setImage(photo);
            } catch (error) {
                console.error(`Error: ${error}`);
            }

        }
    }

    if (device == null) return <NoCameraErrorView />
    if (!hasPermission) {
        return <PermissionScreen onPress={requestPermission} />
    } else {
        return (
            <SafeAreaView>
                <Camera
                    ref={camera}
                    style={{ height: "100%", width: "100%" }}
                    device={device}
                    isActive={true}
                    photo={true}
                />
                <Pressable
                    style={({ pressed }) => [
                        { borderColor: pressed ? 'grey' : 'white' },
                        styles.buttonContainer
                    ]}
                    onPress={takePhoto}>
                    <Text>
                        Take a Photo
                    </Text>
                </Pressable>
                {image && (
                    <Pressable
                        onPress={() => setImage(null)}
                        style={styles.image}>
                        <Image
                            source={{ uri: `file://${image.path}` }}
                            style={{ flex: 1, borderRadius: 10 }} />
                    </Pressable>
                )}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        height: captureButtonDimensions,
        width: captureButtonDimensions,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        opacity: 0.8,
        backgroundColor: 'transparent',
        marginTop: height - (captureButtonDimensions + captureButtonDimensions / 2),
        borderWidth: 7,
        borderRadius: 60
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 30
    },
    image: {
        position: "absolute",
        height: height / 4,
        width: width / 4,
        justifyContent: 'center',
        marginLeft: width - (width / 4 + 10),
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "green"
    }
});
