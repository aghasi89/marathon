import React, { FC, useState, ReactElement } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { aliceBlue, formFieldGrey, primaryBlue, primaryWhite } from '../../assets/styles/colors.styles';
import styles from './Stepper.style';

export interface StepperProps {
    active: number;
    content: ReactElement[];
    setActive: (value: number) => void
}
const Stepper: FC<StepperProps> = (props) => {
    const {
        active,
        content,
        setActive
    } = props;

    return (
        <View style={styles.container} >
            <View
                style={styles.contentContainer}>
                {content.map((_, i) => {
                    return (
                        <React.Fragment key={i}>
                            <View
                                style={[
                                    styles.circle,
                                    {
                                        backgroundColor: active === i ? primaryBlue : aliceBlue,
                                    },
                                ]}>

                                <Text
                                    style={[
                                        styles.stepText,
                                        {
                                            color: active === i ? primaryWhite : formFieldGrey
                                        },
                                    ]}>
                                    {i + 1}
                                </Text>

                            </View>
                        </React.Fragment>
                    );
                })}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {content[active]}
            </ScrollView>

            <View
                style={styles.bottomContainer}>

                <TouchableOpacity
                    style={styles.button}
                    disabled={active == 0}
                    onPress={() => {
                        setActive(active - 1)
                    }}>
                    <Text style={styles.buttonText}> {"<"} Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setActive(active + 1)
                    }}
                    disabled={content.length - 1 == active}
                >
                    <Text style={styles.buttonText}>Next {">"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Stepper;
