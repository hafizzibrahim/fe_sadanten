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
import { IconAt, IconLock, IconUser } from '@tabler/icons-react';
import { ApiResponse } from '../types';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

interface RegisterPageProps {
  toggleColorScheme?: (value?: 'light' | 'dark') => void;
}

export default function RegisterPage({ toggleColorScheme }: RegisterPageProps) {
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

      const data = await res.json();

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
    <Container size="xs" my={40}>
      <Center>
        <Box w="100%" p="md">
          <Title ta="left" mb="lg">Buat Akun Admin</Title>
          <Text c="dimmed" ta="left" mb="xl">
            Daftar untuk mengakses dashboard admin
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
                  label="Username"
                  placeholder="Nama pengguna"
                  required
                  leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
                  {...form.getInputProps('username')}
                />
                
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

              <Button fullWidth mt="xl" size="lg" type="submit">
                Daftar
              </Button>
            </form>

            <Group justify="center" mt="lg">
              <Text size="sm" c="dimmed">
                Sudah punya akun?{' '}
                <Anchor href="/login" fw={500}>
                  Masuk
                </Anchor>
              </Text>
            </Group>
          </Paper>
        </Box>
      </Center>
    </Container>
  );
}