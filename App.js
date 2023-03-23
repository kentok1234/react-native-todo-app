import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list'
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import Header from './components/Header';
import Task from './components/Task';
import ModalTask from './components/ModalTask';
import CheckboxTask from './components/CheckboxTask';
import { ModalAddTask } from './components/ModalAddTask';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.otf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.otf')
  })

  const [modalVisible, setModalVisible] = useState(false)
  const [tasks, setTask] = useState([])
  const [selectedTask, setSelectedTask] = useState()

  useEffect(() => {

    if (!!selectedTask) {
      if (selectedTask.action === 'update') {
        updateData()
      } else {
        deleteData()
      }
    }
  }, [selectedTask])

  const lengthIncomplete = useMemo(() => {
    return tasks.filter(task => !task.isFinish).length
  }, [tasks])

  const lengthCompleted = useMemo(() => {
    return tasks.filter(task => task.isFinish).length
  }, [tasks])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [modalVisible])

  const openModal = useCallback(() => {
    setModalVisible(true)
  }, [modalVisible])

  const renderItemsIncomplete = useCallback(({ item }) => {

    return (
      <View>
        <CheckboxTask
          key={item.id}
          id={item.id}
          title={item.title}
          category={item.category}
          isFinish={item.isFinish}
          onSelect={setSelectedTask}
        />
      </View>
    )
  }, [tasks])
  const renderItemsCompleted = useCallback(({ item }) => {
    return (
      <View>
        <CheckboxTask
          key={item.id}
          id={item.id}
          title={item.title}
          category={item.category}
          isFinish={item.isFinish}
          onSelect={setSelectedTask}
        />
      </View>
    )
  }, [tasks])

  const getTask = async () => {
    try {
      let value = await AsyncStorage.getItem('task')
      if (value) {
        value = JSON.parse(value)
        setTask(value)
      }
    } catch (e) {
      alert(e)
    }
  }

  const updateData = async () => {
    try {
      const data = await AsyncStorage.getItem('task')
      const dataParse = JSON.parse(data)

      const updateData = dataParse.map(item => {
        if (item.title === selectedTask.title) {
          return {
            ...item,
            isFinish: !item.isFinish
          }
        }

        return item
      })

      setSelectedTask()

      await AsyncStorage.setItem('task', JSON.stringify(updateData))
      setTask(updateData)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteData = async () => {
    try {
      const data = await AsyncStorage.getItem('task')
      const dataParse = JSON.parse(data)

      const updateData = dataParse.filter(item => item.id !== selectedTask.id)
      setSelectedTask()
      await AsyncStorage.setItem('task', JSON.stringify(updateData))
      setTask(updateData)
    } catch (e) {
      console.error(e)
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
    getTask()
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView}>
      <View style={styles.container}>
        <Header lengthIncomplete={lengthIncomplete} lengthCompleted={lengthCompleted} />
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

          <Task title='Incomplete' setSelectedTask={setSelectedTask}>
            <FlashList
              data={tasks.filter(taskIncom => !taskIncom.isFinish)}
              renderItem={renderItemsIncomplete}
              ListEmptyComponent={() => (
                <Text style={{ color: '#DADADA', fontSize: 18, fontFamily: 'Inter-Medium' }}>There is no task.</Text>
              )}
              estimatedItemSize={5}
            />
          </Task>
          <Task title='Completed' setSelectedTask={setSelectedTask}>
            <FlashList
              data={tasks.filter(taskComp => taskComp.isFinish)}
              renderItem={renderItemsCompleted}
              ListEmptyComponent={() => (
                <Text style={{ color: '#DADADA', fontSize: 18, fontFamily: 'Inter-Medium' }}>There is no task.</Text>
              )}
              estimatedItemSize={5}
            />
          </Task>

        </ScrollView>
      </View>
      <Pressable style={styles.button} onPress={openModal}>
        <MaterialsIcon name='add' color='white' size={30} />
      </Pressable>
      <ModalTask isVisible={modalVisible} onClose={closeModal} title='Add Task'>
        <ModalAddTask tasks={tasks} onClose={setModalVisible} />
      </ModalTask>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141419',
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#473FA0',
    borderColor: '#515CC6',
    borderWidth: 2,
    borderRadius: 28,
    top: 60,
    height: 56,
    justifyContent: 'center',
    width: 56,
    position: 'absolute',
    right: 30,
  },
});
