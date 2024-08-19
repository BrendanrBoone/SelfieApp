import { SafeAreaView, StyleSheet } from "react-native"

export default function NoCameraErrorView() {
    return (
        <SafeAreaView style={styles.container}>
                NO CAMERA FOUND L ...try again or not
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})