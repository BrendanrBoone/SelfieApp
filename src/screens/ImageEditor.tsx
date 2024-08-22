
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    Text
} from "react-native"
import { IImageEditorScreenProps } from "../routes";
import { PhotoFile } from "react-native-vision-camera";

// npm i --save-dev @types/react-native-vector-icons
// https://github.com/oblador/react-native-vector-icons/blob/master/README.md#android-setup
import Feather from "react-native-vector-icons/Feather";


const { height, width } = Dimensions.get("window");
const exitButtonDimensions = 50;

export default function ImageEditorScreen(props: IImageEditorScreenProps) {

    const image: PhotoFile = props.route.params.image_photo_file;

    const handleXButton = () => {
        props.navigation.goBack();
    }

    return (
        <SafeAreaView style={{ height: height, width: width }}>
            <Image
                source={{ uri: `file://${image.path}` }}
                style={{ height: height, width: width }} />
            <Pressable
                onPress={handleXButton}
                style={styles.buttonContainer}>
                <Feather name="x" size={30} color="white"/>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        left: 10,
        top: 10,
        opacity: 0.9,
        height: exitButtonDimensions,
        width: exitButtonDimensions,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        backgroundColor: 'transparent'
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
