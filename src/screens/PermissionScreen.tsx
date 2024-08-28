/**
 * PermissionScreen.tsx
 * 
 * Screen to ask permission for camera
 */
import {
    Pressable,
    StyleSheet,
    Text,
    ImageBackground
} from "react-native";

type PermissionScreenProps<P = unknown> = P & {
    onPress: () => void;
}

export default function PermissionScreen({ onPress }: PermissionScreenProps) {
    return (
        <ImageBackground source={require("../assets/begging_stockImage.jpg")}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    { backgroundColor: pressed ? 'black' : 'grey' },
                    styles.container
                ]}>
                <Text style={styles.text}>
                    TAP THE SCREEN{'\n'} I NEED PERMISSION FOR YOUR CAMERA
                </Text>
            </Pressable>
        </ImageBackground>
    )
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
        backgroundColor: 'black',
        fontSize: 30,
        borderRadius: 20,
        borderWidth: 1
    },
    image: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: 'center'
    }
});
