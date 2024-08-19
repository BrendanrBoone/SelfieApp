import { Pressable, StyleSheet, Text } from "react-native"

interface Props {
    onPress: () => void;
}

type PermissionScreenProps<P = unknown> = P &  {
    color?: string | undefined;
    color_pressed?: string | undefined;
    children?: React.ReactNode | undefined;
}

export default function PermissionScreen({onPress, color, color_pressed, children}: PermissionScreenProps<Props>) {
    return (
        <Pressable
        onPress={onPress}
        style={({pressed}) => [
            {backgroundColor: pressed ? color_pressed : color},
            styles.container
        ]}>
            <Text style={styles.text}>
                TAP THE SCREEN{'\n'} I NEED PERMISSION FOR YOUR CAMERA
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 30
    }
});
