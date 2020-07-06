import React from 'react';
import LoginPage from './LoginPage';
import { verifyLogin } from '../apiCalls/apiCalls';

import '@testing-library/jest-dom';
import { render, waitFor, fireEvent, getByPlaceholderText } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
jest.mock('../apiCalls/apiCalls');

verifyLogin.mockImplementationOnce(() => {
	return Promise.resolve({
		"user": {
				"id": 60,
				"name": "Charlie",
				"email": "charlie@turing.io"
		}
	})
})

describe('LoginPage', () => {
	it.skip('Should render login form inputs', () => {
		const { getByText, getByRole } = render(<BrowserRouter><LoginPage
			
			submitLogin={jest.fn()}
		/></BrowserRouter>)

		const button = getByRole('button');
		const emailLabel = getByText('Email:')
		const passwordLabel = getByText('Password:')

		expect(button).toBeInTheDocument();
		expect(emailLabel).toBeInTheDocument();
		expect(passwordLabel).toBeInTheDocument();
	});

	it.skip('Should fetch users information upon login', async () => {
		const {getByText, getByRole} = render(<BrowserRouter><LoginPage
			submitLogin={jest.fn()}
		/></BrowserRouter>)
		const button = getByRole('button');
		
		fireEvent.click(button);

		const mockUsername = await waitFor( () => );

		expect(verifyLogin).toBeCalledTimes(1);
	}) //TODO: help
})