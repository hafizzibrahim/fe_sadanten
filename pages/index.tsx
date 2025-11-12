import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  SimpleGrid,
  Box,
  Grid,
  rem
} from '@mantine/core';
import { IconDatabase, IconUser, IconEye, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import Layout from '../components/layout';
import { GetServerSideProps } from 'next';

export default function Home() {
  // Data dummy untuk statistik - nantinya bisa diganti dengan data dari API
  const stats = [
    { title: 'Total Data', icon: IconDatabase, value: '128', description: 'Jumlah data ensiklopedia' },
    { title: 'User Akses', icon: IconUser, value: '24', description: 'Jumlah admin aktif' },
    { title: 'Dilihat', icon: IconEye, value: '3.2K', description: 'Dilihat bulan ini' },
  ];

  return (
    <Layout>
      <Container fluid>
        <Title order={2} mb="xl">Dashboard Admin</Title>

        {/* Statistik Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} mb="xl">
          {stats.map((stat, index) => (
            <Card key={index} shadow="md" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <Box>
                  <Text size="lg" fw={500}>
                    {stat.title}
                  </Text>
                  <Text size="xl" fw={700} mt="md">
                    {stat.value}
                  </Text>
                  <Text size="sm" c="dimmed" mt="sm">
                    {stat.description}
                  </Text>
                </Box>
                <Box>
                  <stat.icon style={{ width: rem(40), height: rem(40) }} stroke={1.5} />
                </Box>
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        {/* Quick Actions */}
        <Card shadow="md" padding="lg" radius="md" mb="xl" withBorder>
          <Title order={4} mb="md">Aksi Cepat</Title>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Link href="/ensiklopedia" passHref legacyBehavior>
                <Button variant="light" fullWidth size="lg" leftSection={<IconDatabase />}>
                  Lihat Data
                </Button>
              </Link>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Link href="/ensiklopedia/add" passHref legacyBehavior>
                <Button variant="filled" color="blue" fullWidth size="lg" leftSection={<IconPlus />}>
                  Tambah Data Baru
                </Button>
              </Link>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Button variant="outline" fullWidth size="lg">
                Laporan
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Button variant="outline" fullWidth size="lg">
                Pengaturan
              </Button>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Recent Activity - Placeholder */}
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">Aktivitas Terbaru</Title>
          <Text c="dimmed">Daftar aktivitas terbaru akan ditampilkan di sini</Text>
        </Card>
      </Container>
    </Layout>
  );
}