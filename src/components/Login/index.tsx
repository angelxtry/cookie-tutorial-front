import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FullSizeLayout } from '../layouts';
import LoginForm from './LoginForm';
import { loginActions, LoginRequestPayload, loginSelector } from '../../features/user/userSlice';
import { RootState } from '../../store';

const Wrapper = styled.div`
  width: 400px;
`;

export default function Login(): JSX.Element {
  const dispatch = useDispatch();
  const { message, token } = useSelector((state: RootState) => loginSelector.getLoginInfo(state));
  const { isLoggedIn } = useSelector((state: RootState) => loginSelector.getUserInfo(state));

  const { requestLogin } = loginActions;
  const onLogin = (loginRequestData: LoginRequestPayload) =>
    dispatch(requestLogin(loginRequestData.email, loginRequestData.password));

  console.log('Login: ', message, token, isLoggedIn);

  useEffect(() => {
    dispatch(loginActions.requestMe());
  }, []);

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <FullSizeLayout>
      <Wrapper className="mx-auto">
        <h3 className="p-4 text-center">고미 파트너센터</h3>
        <Card className="p-4">
          <LoginForm onLogin={onLogin} />
        </Card>
      </Wrapper>
    </FullSizeLayout>
  );
}
