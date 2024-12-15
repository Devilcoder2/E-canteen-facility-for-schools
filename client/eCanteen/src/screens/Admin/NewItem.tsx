import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Modal,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormValues {
    name: string;
    price: string;
    image: string;
    ratings: string;
    category: string;
    description: string;
    label: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number()
        .required('Price is required')
        .positive('Price must be positive'),
    image: Yup.string().url('Invalid URL').required('Image URL is required'),
    ratings: Yup.number().required('Ratings are required').min(0).max(5),
    category: Yup.string()
        .oneOf(['veg', 'non-veg'], 'Category must be either veg or non-veg')
        .transform((value) => value.toLowerCase())
        .required('Category is required'),
    description: Yup.string().required('Description is required'),
    label: Yup.string().required('Label is required'),
});

const NewItem: React.FC = () => {
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalColor, setModalColor] = useState<string>('#2e7d32'); // Success by default

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const showModal = (message: string, color: string) => {
        setFeedbackMessage(message);
        setModalColor(color);
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false); // Hide the modal after 3 seconds
            setFeedbackMessage(null);
        }, 3000);
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <LinearGradient
                colors={['#F8CB46', '#FFFFFF']}
                style={styles.gradient}
            >
                <SafeAreaView style={styles.container}>
                    <Formik
                        initialValues={{
                            name: '',
                            price: '',
                            image: '',
                            ratings: '',
                            category: '',
                            description: '',
                            label: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values: FormValues, { resetForm }) => {
                            try {
                                const token = await AsyncStorage.getItem(
                                    'adminToken'
                                );
                                if (!token) {
                                    throw new Error(
                                        'Unauthorized: No token found'
                                    );
                                }

                                const response = await axios.post(
                                    `${BASE_URL}admin/menu`,
                                    values,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                );

                                showModal(
                                    'Item added successfully!',
                                    '#2e7d32'
                                ); // Green for success
                                resetForm(); // Reset the form on success
                            } catch (error: any) {
                                showModal(
                                    'Something went wrong. Please try again.',
                                    '#d93025' // Red for failure
                                );
                            }
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            isValid,
                        }) => (
                            <ScrollView
                                contentContainerStyle={styles.scrollContainer}
                                keyboardShouldPersistTaps='handled'
                            >
                                <Text style={styles.header}>Add New Item</Text>

                                {/** Render Input Fields Dynamically */}
                                {[
                                    {
                                        key: 'name',
                                        placeholder: 'Name',
                                        icon: 'pencil',
                                    },
                                    {
                                        key: 'price',
                                        placeholder: 'Price',
                                        icon: 'dollar',
                                        keyboardType: 'numeric',
                                    },
                                    {
                                        key: 'image',
                                        placeholder: 'Image URL',
                                        icon: 'image',
                                    },
                                    {
                                        key: 'ratings',
                                        placeholder: 'Ratings',
                                        icon: 'star',
                                        keyboardType: 'numeric',
                                    },
                                    {
                                        key: 'category',
                                        placeholder: 'Category',
                                        icon: 'tags',
                                    },
                                    {
                                        key: 'description',
                                        placeholder: 'Description',
                                        icon: 'align-left',
                                    },
                                    {
                                        key: 'label',
                                        placeholder: 'Label',
                                        icon: 'tag',
                                    },
                                ].map((field) => {
                                    const hasError =
                                        touched[
                                            field.key as keyof FormValues
                                        ] &&
                                        errors[field.key as keyof FormValues];
                                    const isFilled =
                                        values[field.key as keyof FormValues]
                                            ?.length > 0;
                                    return (
                                        <View key={field.key}>
                                            <View style={styles.inputContainer}>
                                                <FontAwesome
                                                    name={field.icon}
                                                    size={20}
                                                    color={
                                                        hasError
                                                            ? '#d93025'
                                                            : isFilled
                                                            ? '#000'
                                                            : '#9e9e9e'
                                                    }
                                                    style={styles.icon}
                                                />
                                                <TextInput
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    placeholderTextColor='#9e9e9e'
                                                    style={styles.input}
                                                    value={
                                                        values[
                                                            field.key as keyof FormValues
                                                        ]
                                                    }
                                                    onChangeText={handleChange(
                                                        field.key as keyof FormValues
                                                    )}
                                                    onBlur={handleBlur(
                                                        field.key as keyof FormValues
                                                    )}
                                                    keyboardType={
                                                        field.keyboardType
                                                    }
                                                />
                                            </View>
                                            {hasError && (
                                                <Text
                                                    style={styles.errorMessage}
                                                >
                                                    {
                                                        errors[
                                                            field.key as keyof FormValues
                                                        ]
                                                    }
                                                </Text>
                                            )}
                                        </View>
                                    );
                                })}

                                <TouchableOpacity
                                    style={[
                                        styles.submitButton,
                                        !isValid && styles.disabledButton,
                                    ]}
                                    onPress={() => handleSubmit()}
                                    disabled={!isValid}
                                >
                                    <Text style={styles.submitButtonText}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                    </Formik>

                    {/** Modal for feedback */}
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => setModalVisible(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <TouchableWithoutFeedback>
                                    <View
                                        style={[
                                            styles.modalContent,
                                            { backgroundColor: '#F8CB46' }, // Submit button color
                                        ]}
                                    >
                                        <FontAwesome
                                            name='check-circle'
                                            size={40}
                                            color='#fff'
                                            style={styles.modalIcon}
                                        />
                                        <Text style={styles.modalText}>
                                            {feedbackMessage}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    // Styles are the same as provided earlier.
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: '#000',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5E5',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 12,
    },
    icon: {
        position: 'absolute',
        left: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingLeft: 25,
    },
    errorMessage: {
        color: '#d93025',
        marginBottom: 8,
    },
    submitButton: {
        backgroundColor: '#F8CB46',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 16,
    },
    disabledButton: {
        backgroundColor: '#F8CB46',
        opacity: 0.4,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black
    },
    modalContent: {
        width: '80%',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#F8CB46', // Matches the submit button
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5, // For Android shadow
    },
    modalIcon: {
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff', // White text
    },
});

export default NewItem;
