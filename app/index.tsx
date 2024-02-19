import { Redirect, router } from 'expo-router'
import { capitalize } from 'lodash'
import {
    Center,
    Fab,
    Heading,
    HStack,
    List,
    ScrollView,
    Spinner,
    Text,
    View,
    VStack
} from 'native-base'
import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import useAuth from '../hooks/useAuth'
import { getWorkouts, Workout } from '../service/workout'

export default function Index() {
    const [workoutList, setWorkoutList] = useState<Workout[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getWorkouts().then((workouts) => {
            setWorkoutList(workouts.items)
            console.log(workouts.items)
            setLoading(false)
        })
    }, [])

    const { user } = useAuth()

    if (!user) {
        return <Redirect href={'/login'} />
    }

    return (
        <>
            <Fab
                renderInPortal={false}
                shadow={2}
                size="sm"
                icon={<MaterialCommunityIcons name="plus" />}
                onPress={() => router.replace('/new')}
            />

            <ScrollView w="100%">
                {loading ? (
                    <Center h={'100%'} w="100%">
                        <Spinner size={'lg'} />
                    </Center>
                ) : (
                    <List>
                        {workoutList.map((workout) => (
                            <List.Item
                                key={workout.id}
                                w="100%"
                                onPress={() => {
                                    router.push(`/workout/${workout.id}`)
                                }}
                            >
                                <HStack pr="4">
                                    <MaterialCommunityIcons
                                        name="dumbbell"
                                        size={34}
                                        color={'#111'}
                                    />
                                </HStack>
                                <HStack
                                    w="80%"
                                    className="flex justify-between"
                                >
                                    <VStack className="flex flex-col gap-1">
                                        <Heading>
                                            {capitalize(workout.name)}
                                        </Heading>
                                        <Text
                                            color={'coolGray.400'}
                                            _dark={{
                                                color: 'warmGray.400'
                                            }}
                                        >
                                            {workout.reps} reps, {workout.set}{' '}
                                            sets
                                        </Text>
                                    </VStack>
                                    <Center>
                                        {workout.created ? (
                                            <Text
                                                color={'coolGray.400'}
                                                _dark={{
                                                    color: 'warmGray.400'
                                                }}
                                            >
                                                {new Date(
                                                    workout.created
                                                ).toLocaleDateString()}
                                            </Text>
                                        ) : null}
                                    </Center>
                                </HStack>
                            </List.Item>
                        ))}
                    </List>
                )}
            </ScrollView>
        </>
    )
}
