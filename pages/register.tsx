import { Container, Title, Paper, TextInput, PasswordInput, Button, Text, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ApiResponse } from '../types';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const form = useForm<RegisterFormValues>({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length >= 3 ? null : 'Minimal 3 karakter'),
      email: (value) => (/^\S+@\S+$/i.test(value) ? null : 'Email tidak valid'),
      password: (value) => (value.length >= 6 ? null : 'Minimal 6 karakter'),
    },
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const  data = await res.json();

      if (res.ok) {
        router.push('/login');
      } else {
        setError(data.msg || 'Gagal daftar');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Daftar Admin</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && <Text c="red">{error}</Text>}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="username"
            required
            {...form.getInputProps('username')}
          />
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            mt="md"
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
            Daftar
          </Button>
        </form>
        <Text ta="center" mt="md">
          Sudah punya akun?{' '}
          <Anchor href="/login" fw={700}>
            Login
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}