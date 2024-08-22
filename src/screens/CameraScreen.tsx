
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
import route_names, { ICameraScreenProps } from "../routes";


const { height, width } = Dimensions.get("window");
const captureButtonDimensions = 100;

export default function CameraScreen(props: ICameraScreenProps) {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('front');
    const camera = useRef<Camera>(null);
    const [image, setImage] = useState<PhotoFile | null>(null);
    const [buttonToggle, setButtonToggle] = useState(true);
    const [videoSource, setVideoSource] = useState<NodeRequire | null>(null);
    const [startTimer, setStartTimer] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (startTimer) {
            intervalId = setInterval(() => {
                setTime(time => time + 0.2);
            }, 200);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                setTime(0);
            }
        };
    }, [startTimer]);

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

    const handleTimePress = () => {
        console.log(`Time: ${time} seconds`);
    }

    const clearAbsoluteButtons = () => {
        setButtonToggle(false);
        setImage(null);
        setStartTimer(true);
    }

    const returnAbsoluteButtons = () => {
        setButtonToggle(true);
        setVideoSource(null);
        setStartTimer(false);
    }

    const challenge_one = () => {
        clearAbsoluteButtons();
        setVideoSource(require("../assets/baseballJumpscare.mp4"));
        setTimeout(() => {
            console.log("photo taken");
            takePhoto();
        }, 5000);
    }

    const challenge_two = () => {
        clearAbsoluteButtons();
        setVideoSource(require("../assets/scaryJumpscare.mp4"));
    }

    const handleBlueButton = () => {
        challenge_one();
    }

    const handleWhiteButton = () => {
        takePhoto();
    }

    const handleRedButton = () => {
        challenge_two();
    }

    const handleFrameButton = () => {
        if (image) {
            const image_to_send: PhotoFile = image;
            setImage(null);
            props.navigation.navigate(route_names.IMAGE_EDITOR_SCREEN, {image_photo_file: image_to_send});
        }
    }

    if (device == null) return <NoCameraErrorView />
    if (!hasPermission) {
        return <PermissionScreen onPress={requestPermission} />
    } else {
        return (
            <SafeAreaView style={{ height: height, width: width }}>
                {videoSource && (
                    <View style={styles.videoContainer}>
                        <VideoPlayer
                            onEnd={returnAbsoluteButtons}
                            source_location={videoSource}
                        />
                    </View>
                )}

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
                            onPress={handleBlueButton}>
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
                            onPress={handleWhiteButton}>
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
                            onPress={handleRedButton}>
                            <Text>
                                CHALLENGE
                            </Text>
                        </Pressable>
                    </View>
                )}

                {image && (
                    <Pressable
                        onPress={handleFrameButton}
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
    videoContainer: {
        position: "absolute",
        height: height,
        width: width,
        backgroundColor: 'black'
    },
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
