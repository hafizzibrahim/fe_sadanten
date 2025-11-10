import { AppShell, Text, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !mobileOpened } }}
    >
      {/* ❗ Ganti Header jadi AppShell.Header */}
      <AppShell.Header>
        <Group h="100%" px="md">
          <Text fw={700}>Admin Ensiklopedia</Text>
        </Group>
      </AppShell.Header>

      {/* ❗ Ganti Navbar jadi AppShell.Navbar */}
      <AppShell.Navbar p="md">
        <Link href="/ensiklopedia" passHref legacyBehavior>
          <Button variant={router.pathname.startsWith('/ensiklopedia') ? 'filled' : 'light'} fullWidth mt="md">
            Data Ensiklopedia
          </Button>
        </Link>
        <Button onClick={handleLogout} color="red" fullWidth mt="md">
          Logout
        </Button>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}