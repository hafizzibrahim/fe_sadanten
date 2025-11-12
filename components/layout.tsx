import {
  AppShell,
  Text,
  Burger,
  Group,
  ActionIcon,
  Button,
  Avatar,
  Menu,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  IconHome,
  IconDatabase,
  IconUser,
  IconSettings,
  IconLogout,
  IconPlus,
  IconSearch,
  IconBell,
  IconChevronDown,
  IconSun,
  IconMoon,
} from '@tabler/icons-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md">
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              size="sm"
              mr="xl"
            />
            <Text fw={700} fz="xl" c="white">
              Admin Dashboard
            </Text>
          </Group>

          <Group>
            <ActionIcon
              variant="light"
              color="white"
              size="lg"
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {colorScheme === 'dark' ? (
                <IconSun size={18} />
              ) : (
                <IconMoon size={18} />
              )}
            </ActionIcon>

            <ActionIcon variant="light" color="white" size="lg">
              <IconSearch stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="light" color="white" size="lg">
              <IconBell stroke={1.5} />
            </ActionIcon>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  variant="transparent"
                  rightSection={<IconChevronDown size={14} />}
                  px={0}
                  style={{ color: 'white' }}
                >
                  <Group gap="xs">
                    <Avatar color="blue" radius="xl">
                      A
                    </Avatar>
                    <Text c="white">Admin</Text>
                  </Group>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={14} />}>
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  leftSection={<IconLogout size={14} />}
                  color="red"
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <nav>
          <Link href="/" passHref legacyBehavior>
            <Button
              variant={router.pathname === '/' ? 'light' : 'subtle'}
              fullWidth
              mb="sm"
              leftSection={<IconHome size={16} />}
            >
              Dashboard
            </Button>
          </Link>

          <Link href="/ensiklopedia" passHref legacyBehavior>
            <Button
              variant={
                router.pathname.startsWith('/ensiklopedia') ? 'light' : 'subtle'
              }
              fullWidth
              mb="sm"
              leftSection={<IconDatabase size={16} />}
            >
              Data Ensiklopedia
            </Button>
          </Link>

          <Link href="/ensiklopedia/add" passHref legacyBehavior>
            <Button
              variant="outline"
              color="blue"
              fullWidth
              mt="xl"
              leftSection={<IconPlus size={16} />}
            >
              Tambah Data
            </Button>
          </Link>

          <Button
            onClick={handleLogout}
            color="red"
            fullWidth
            mt="xl"
            leftSection={<IconLogout size={16} />}
          >
            Logout
          </Button>
        </nav>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}