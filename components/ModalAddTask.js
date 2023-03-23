import 'react-native-get-random-values'

import { StyleSheet, TextInput, View, Text, Pressable } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

export function ModalAddTask({ tasks, onClose }) {
    const [category, setCategory] = useState(null)
    const [nameTask, setNameTask] = useState(null)
    const addTask = async () => {
        try {
            const task = {
                id: uuid.v4(),
                title: nameTask,
                category: category,
                isFinish: false,
            }
            if (tasks.length === 0) {
                await AsyncStorage.setItem('task', JSON.stringify([task]))
            } else {
                await AsyncStorage.setItem('task', JSON.stringify(tasks.concat(task)))
            }
        } catch (e) {
            alert('Error while add task: ' + e)
        }

        setCategory(null)
        setNameTask(null)
        onClose(false)
    }

    return (
        <View style={styles.modalContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Task'
                    keyboardType='ascii-capable'
                    style={styles.input}
                    value={nameTask}
                    onChangeText={setNameTask}
                    autoFocus
                />
                <View style={styles.inputPicker}>
                    <Picker placeholder='Category' selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
                        <Picker.Item label='Category' value='category' enabled={false} fontFamily='Inter-Bold' style={{ fontSize: 14, }} />
                        <Picker.Item label='Finance' value='finance' style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, }} />
                        <Picker.Item label='Wedding' value='wedding' style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, }} />
                        <Picker.Item label='Other' value='other' style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, }} />
                    </Picker>
                </View>
            </View>
            <Pressable style={[nameTask && category ? styles.buttonModalValid : styles.buttonModalNotValid]} onPress={addTask} disabled={(!nameTask || !category)}>
                <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold' }}>Add</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 20,
        marginBottom: 40,
        flex: 1,
    },
    input: {
        borderRadius: 6,
        backgroundColor: '#fff',
        padding: 6,
    },
    inputPicker: {
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    buttonModalValid: {
        backgroundColor: '#473FA0',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    buttonModalNotValid: {
        backgroundColor: '#6D68A1',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    inputContainer: {
        gap: 10,
        flex: 1,
    }
})