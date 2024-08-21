
import { useEffect, useState, useRef } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    View
} from "react-native"
import {
    Camera,
    useCameraPermission,
    useCameraDevice,
    PhotoFile
} from "react-native-vision-camera";
import NoCameraErrorView from "./NoCameraErrorView";
import PermissionScreen from "./PermissionScreen";
import { VideoPlayer } from "../components/ui/VideoPlayer";


const { height, width } = Dimensions.get("window");
const captureButtonDimensions = 100;

export default function CameraScreen() {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('front');
    const camera = useRef<Camera>(null);
    const [image, setImage] = useState<PhotoFile | null>(null);
    const [buttonToggle, setButtonToggle] = useState(true);
    const [videoSource, setVideoSource] = useState<NodeRequire | null>(null);

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

    const clearAbsoluteButtons = () => {
        setButtonToggle(false);
        setImage(null);
    }

    const returnAbsoluteButtons = () => {
        setButtonToggle(true);
        setVideoSource(null);
    }

    const challenge_one = () => {
        clearAbsoluteButtons();
        setVideoSource(require("../assets/baseballJumpscare.mp4"));
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
                {buttonToggle && (
                    <View style={styles.buttonsViewContainer}>
                        <Pressable
                            style={({ pressed }) => [
                                { borderColor: pressed ? 'navy' : 'blue' },
                                styles.leftButtonContainer
                            ]}
                            onPress={challenge_one}>
                            <Text>
                                BASEBALL
                            </Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                { borderColor: pressed ? 'grey' : 'white' },
                                styles.buttonContainer,
                                { alignSelf: 'center' }
                            ]}
                            onPress={takePhoto}>
                            <Text>
                                Take a Photo
                            </Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                { borderColor: pressed ? 'maroon' : 'red' },
                                styles.rightButtonContainer,
                                { alignSelf: 'flex-end' }
                            ]}
                            onPress={takePhoto}>
                            <Text>
                                Take a Photo
                            </Text>
                        </Pressable>
                    </View>
                )}

                {image && (
                    <Pressable
                        onPress={() => setImage(null)}
                        style={styles.image}>
                        <Image
                            source={{ uri: `file://${image.path}` }}
                            style={{ flex: 1, borderRadius: 10 }} />
                    </Pressable>
                )}
                {videoSource && (
                    <View style={{position: "absolute", height: "100%", width: "100%"}}>
                        <VideoPlayer
                            onEnd={returnAbsoluteButtons}
                            source_location={videoSource}
                        />
                    </View>
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
        alignItems: 'center',
        opacity: 0.8,
        backgroundColor: 'transparent',
        borderWidth: 7,
        borderRadius: 60
    },
    leftButtonContainer: {
        position: "absolute",
        height: captureButtonDimensions * 0.9,
        width: captureButtonDimensions * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        backgroundColor: 'transparent',
        borderWidth: 7,
        borderRadius: 30
    },
    rightButtonContainer: {
        position: "absolute",
        height: captureButtonDimensions * 0.9,
        width: captureButtonDimensions * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        backgroundColor: 'transparent',
        borderWidth: 7,
        borderRadius: 30
    },
    buttonsViewContainer: {
        position: "absolute",
        height: captureButtonDimensions,
        width: "100%",
        marginTop: height - (captureButtonDimensions + captureButtonDimensions / 2),
        backgroundColor: 'transparent'
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
