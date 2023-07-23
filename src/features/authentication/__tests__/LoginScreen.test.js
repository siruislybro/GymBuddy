const React = require('react');
const { render, fireEvent, act } = require('@testing-library/react-native');
const firebase = require('firebase-mock');
const LoginScreen = require('../screens/LoginScreen'); // update this path to your actual LoginScreen file

const mockauth = new firebase.MockAuthentication();
const mockfirestore = new firebase.MockFirestore();
jest.mock('firebase/app', () => ({
    auth: mockauth,
    firestore: mockfirestore,
}));
require('firebase/firestore');

describe('LoginScreen', () => {
    const navigationMock = { navigate: jest.fn() };
    const setUserMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        React.useContext.mockImplementation(() => ({ setUser: setUserMock }));
    });

    it('should render correctly', () => {
        const { getByText } = render(
            <LoginScreen navigation={navigationMock} />
        );

        expect(getByText('EMAIL:')).toBeDefined();
        expect(getByText('PASSWORD:')).toBeDefined();
    });

    it('should call signInWithEmailAndPassword when button is pressed', async () => {
        const { getByText, getByPlaceholderText } = render(
            <LoginScreen navigation={navigationMock} />
        );

        const emailInput = getByPlaceholderText('Enter your email');
        const passwordInput = getByPlaceholderText('Enter your password');
        const button = getByText('Login');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');

        await act(async () => {
            fireEvent.press(button);
        });

        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    // You can write more tests depending on your requirements
});
