import { Container, Title, Button, Table, Text, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
import { Ensiklopedia } from '../../types';

export default function EnsiklopediaIndex() {
  const router = useRouter();
  const [ensiklopedia, setEnsiklopedia] = useState<Ensiklopedia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

const fetchEnsiklopedia = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ensiklopedia`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const  data = await res.json();

      // ❗ Ambil dari `data` karena BE return: { success: true, data: [...] }
      const ensiklopediaData: Ensiklopedia[] = data.data || [];
      setEnsiklopedia(ensiklopediaData);
    } else {
      router.push('/login');
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

    fetchEnsiklopedia();
  }, [router]);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!confirm('Yakin ingin menghapus data ini?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ensiklopedia/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setEnsiklopedia(ensiklopedia.filter((item) => item.id !== id));
      } else {
        alert('Gagal menghapus');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const rows = ensiklopedia.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.id}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.description}</Table.Td>
      <Table.Td>
        <Group gap="sm">
          <Link href={`/ensiklopedia/edit/${item.id}`} passHref legacyBehavior>
            <Button size="xs">Edit</Button>
          </Link>
          <Button size="xs" color="red" onClick={() => handleDelete(item.id)}>
            Hapus
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Layout>
      <Container>
        <Group justify="space-between" mb="md">
          <Title order={2}>Data Ensiklopedia</Title>
          <Link href="/ensiklopedia/add" passHref legacyBehavior>
            <Button>Tambah Data</Button>
          </Link>
        </Group>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Nama</Table.Th>
                <Table.Th>Deskripsi</Table.Th>
                <Table.Th>Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Container>
    </Layout>
  );
}