import React from 'react';
import LoginPage from './LoginPage';

import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('LoginPage', () => {
	it('Should render login form inputs', () => {
		const { getByText, getByRole } = render(<BrowserRouter><LoginPage
			
			submitLogin={jest.fn()}
		/></BrowserRouter>)

		const button = getByRole('button');
		const emailLabel = getByText('Email:')
		const passwordLabel = getByText('Password:')

		expect(button).toBeInTheDocument();
		expect(emailLabel).toBeInTheDocument();
		expect(passwordLabel).toBeInTheDocument();
	})

	it('Should run submitLogin fn on click of submit button', () => {
		const mockSubmitLogin = jest.fn();

		const { getByText, getByRole } = render(<BrowserRouter><LoginPage
			changeUserId={mockSubmitLogin}
			getUsersRatings={jest.fn()}
		/></BrowserRouter>)
		// const mockSubmitLogin = LoginPage.submitLogin();

		const button = getByRole('button');

		fireEvent.click(button);

		expect(mockSubmitLogin).toBeCalledTimes(1);
		// expect(mocwkSubmitLogin).toBeCalledWith(e);
		//TODO: toBeCalledWith() not accepting event
	})
})