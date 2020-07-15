import React from 'react';
import LoginPage from './LoginPage';
import { verifyLogin } from '../apiCalls/apiCalls';
// import App from '../App/App';

import '@testing-library/jest-dom';
import { render, waitFor, fireEvent, getByPlaceholderText } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
jest.mock('../apiCalls/apiCalls');

verifyLogin.mockResolvedValue(() => {
  return Promise.resolve({
    "user": {
        "id": 60,
        "name": "Charlie",
        "email": "charlie@turing.io"
    }
  })
});

describe('LoginPage', () => {
  it('should render page', async () => {
    const { getByRole, getByPlaceholderText } = render(<MemoryRouter><LoginPage /></MemoryRouter>);

    const emailInput = await waitFor(() => getByPlaceholderText('email'));
    const passwordInput = await waitFor(() => getByPlaceholderText('password'));
    const loginButton = await waitFor(() => getByRole('button'));
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

  });

  it('should render login form inputs', () => {
    const changeUserId = jest.fn();
    const { getByLabelText, getByRole, debug } = render(
    <MemoryRouter>
      <LoginPage changeUserId={changeUserId} />
    </MemoryRouter>
      );

    const button = getByRole("button", { name: "submit-button" });
    const emailInput = getByLabelText('email-input')
    const passwordInput = getByLabelText('password-input')

    fireEvent.change(emailInput, {target: {value: 'charlie@turing.io'}})
    fireEvent.change(passwordInput, {target: {value: 'qwerty'}})

    fireEvent.click(button)
    debug()
    expect(changeUserId).toBeCalledTimes(1);
    // expect(button).toBeInTheDocument();
    // expect(emailInput).toBeInTheDocument();
    // expect(passwordInput).toBeInTheDocument();
  });

  it.skip('should be able to login', () => {
    const changeUserId = jest.fn();
    const { getByRole } = render(
      <MemoryRouter>
        <LoginPage changeUserId={changeUserId} />
      </MemoryRouter>
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(changeUserId).toBeCalledTimes(1);
  });

  // it.skip('Should fetch users information upon login', async () => {
  // 	const {getByText, getByRole} = render(<BrowserRouter><LoginPage
  // 		submitLogin={jest.fn()}
  // 	/></BrowserRouter>)
  // 	const button = getByRole('button');
    
  // 	fireEvent.click(button);

  // 	const mockUsername = await waitFor( () => );

  // 	expect(verifyLogin).toBeCalledTimes(1);

  // it('should direct to home after log in submitted', async () => {
  // 	const mockLogIn = jest.fn();
  // 	const { getByRole } = render(
  // 		<BrowserRouter>
  // 				<LoginPage 
  // 						handleSubmit={mockLogIn}
  // 				/>
  // 		</BrowserRouter>
  // 	);

  // 	const button = getByRole('button');
  // 	fireEvent.click(button);

  // 	const { getByText } = render( 
  // 		<BrowserRouter>
  // 			<App />
  // 		</BrowserRouter>);
    
  // 	const title = await waitFor(() => getByText('Fresh Tomatoes'));

  // 	expect(mockLogIn).toBeCalledTimes(1);
  // 	expect(title).toBeInTheDocument();
  // });
})