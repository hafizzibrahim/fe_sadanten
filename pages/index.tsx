import { Container, Title, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <Container size="sm" mt="xl">
      <Title ta="center">Admin Ensiklopedia Budaya</Title>
      <Text ta="center" mt="md">
        Kelola data ensiklopedia budaya Indonesia
      </Text>
      <Group justify="center" mt="xl">
        <Link href="/ensiklopedia" passHref legacyBehavior>
          <Button size="lg">Lihat Data</Button>
        </Link>
      </Group>
    </Container>
  );
}