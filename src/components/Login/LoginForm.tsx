import React, { ReactElement, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { LoginRequestPayload } from '../../features/user/userSlice';

interface LoginComponentProps {
  onLogin: (data: LoginRequestPayload) => void;
}

export default function LoginForm({ onLogin }: LoginComponentProps): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="loginFormEmail">
        <Form.Label>
          <b>이메일</b>
        </Form.Label>
        <Form.Control required type="email" name="email" value={email} onChange={handleEmail} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="loginFormPassword">
        <Form.Label>
          <b>비밀번호</b>
        </Form.Label>
        <Form.Control required type="password" name="password" value={password} onChange={handlePassword} />
      </Form.Group>
      <Form.Group controlId="loginFormCheckbox">
        <Form.Check type="checkbox" className="mb-3" label="로그인 유지" />
      </Form.Group>
      <Button type="submit" variant="secondary" block>
        로그인
      </Button>
    </Form>
  );
}
