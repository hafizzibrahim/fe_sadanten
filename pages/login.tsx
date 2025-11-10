import { Container, Title, Paper, TextInput, PasswordInput, Button, Text, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ApiResponse } from '../types';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/i.test(value) ? null : 'Email tidak valid'),
      password: (value) => (value.length >= 6 ? null : 'Minimal 6 karakter'),
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    console.log("Login response:", data); // 🔍 Debug

    if (res.ok) {
      console.log("Token:", data.token); // 🔍 Debug
      console.log("Data.token:", data.data?.token); // 🔍 Debug

      if (data.token) {
        localStorage.setItem('token', data.token);
      } else if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
      } else {
        setError('Token tidak ditemukan');
        return;
      }

      router.push('/ensiklopedia');
    } else {
      setError(data.msg || data.message || 'Login gagal');
    }
  } catch (err) {
    setError('Server error');
  }
};

  return (
    <Container size={420} my={40}>
      <Title ta="center">Login Admin</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && <Text c="red">{error}</Text>}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" type="submit">
            Login
          </Button>
        </form>
        <Text ta="center" mt="md">
          Belum punya akun?{' '}
          <Anchor href="/register" fw={700}>
            Daftar
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}