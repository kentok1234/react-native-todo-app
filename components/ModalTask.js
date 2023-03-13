import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons'

export default function ModalTask({ isVisible, onClose, title, children }) {
    return (
        <Modal animationType='fade' visible={isVisible}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={onClose} style={styles.button}>
                        <MaterialsIcon name="chevron-left" size={28} color='#fff' />
                    </Pressable>
                    <Text style={styles.title}>{title}</Text>
                </View>
                {children}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141419',
        height: '100%',
        paddingTop: 40,
        paddingHorizontal: 30,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter-Bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})