
import { StyleSheet, Text, View } from "react-native";

export default function Task({ title = 'Undefined', children }) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.taskContainer}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        height: 'auto',
    },
    title: {
        color: '#EBEBEB',
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        marginBottom: 10,
    },
    taskContainer: {
        gap: 10,
        flex: 1,
        minHeight: 100
    }
})