import { 
  Container, 
  Title, 
  Paper, 
  TextInput, 
  PasswordInput, 
  Button, 
  Text, 
  Anchor, 
  Center, 
  Stack,
  Group,
  Box,
  rem
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IconAt, IconLock } from '@tabler/icons-react';
import { ApiResponse } from '../types';

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginPageProps {
  toggleColorScheme?: (value?: 'light' | 'dark') => void;
}

export default function LoginPage({ toggleColorScheme }: LoginPageProps) {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/i.test(value) ? null : 'Email tidak valid'),
      password: (value) => (value.length >= 6 ? null : 'Minimal 6 karaker'),
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

      if (res.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
        } else if (data.data?.token) {
          localStorage.setItem('token', data.data.token);
        } else {
          setError('Token tidak ditemukan');
          return;
        }

        router.push('/');
      } else {
        setError(data.msg || data.message || 'Login gagal');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <Container size="xs" my={40}>
      <Center>
        <Box w="100%" p="md">
          <Title ta="left">Selamat Datang Kembali</Title>
          <Text c="dimmed" ta="left" mt="md" mb="xl">
            Masuk ke akun admin Anda untuk melanjutkan
          </Text>
          
          <Paper withBorder shadow="md" p={30} mt="xl" radius="lg">
            {error && (
              <Text c="red" mb="md">
                {error}
              </Text>
            )}
            
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  required
                  leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                  {...form.getInputProps('email')}
                />
                
                <PasswordInput
                  label="Password"
                  placeholder="Password Anda"
                  required
                  leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
                  {...form.getInputProps('password')}
                />
              </Stack>

              <Group justify="space-between" mt="lg">
                <Anchor component="button" type="button" c="dimmed" size="sm">
                  Lupa password?
                </Anchor>
              </Group>

              <Button fullWidth mt="xl" size="lg" type="submit">
                Masuk
              </Button>
            </form>

            <Group justify="center" mt="lg">
              <Text size="sm" c="dimmed">
                Belum punya akun?{' '}
                <Anchor href="/register" fw={500}>
                  Daftar
                </Anchor>
              </Text>
            </Group>
          </Paper>
        </Box>
      </Center>
    </Container>
  );
}