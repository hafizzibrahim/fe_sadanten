import { 
  Container, 
  Title, 
  Button, 
  Table, 
  Text, 
  Group, 
  Card, 
  Pagination, 
  Select,
  TextInput,
  rem,
  Badge
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
import { Ensiklopedia } from '../../types';
import { IconSearch, IconPencil, IconTrash, IconPlus } from '@tabler/icons-react';

export default function EnsiklopediaIndex() {
  const router = useRouter();
  const [ensiklopedia, setEnsiklopedia] = useState<Ensiklopedia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [filteredEnsiklopedia, setFilteredEnsiklopedia] = useState<Ensiklopedia[]>([]);

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
          const data = await res.json();
          const ensiklopediaData: Ensiklopedia[] = data.data || [];
          setEnsiklopedia(ensiklopediaData);
          setFilteredEnsiklopedia(ensiklopediaData);
        } else {
          router.push('/login');
          return;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnsiklopedia();
  }, [router]);

  // Filter data berdasarkan pencarian
  useEffect(() => {
    const filtered = ensiklopedia.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEnsiklopedia(filtered);
    setCurrentPage(1);
  }, [searchTerm, ensiklopedia]);

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

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredEnsiklopedia.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredEnsiklopedia.length / itemsPerPage);

  const rows = currentItems.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Badge variant="light">{item.id}</Badge>
      </Table.Td>
      <Table.Td>
        <Text fw={500}>{item.name}</Text>
      </Table.Td>
      <Table.Td>
        <Text lineClamp={2} c="dimmed">{item.description}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          <Link href={`/ensiklopedia/edit/${item.id}`} passHref legacyBehavior>
            <Button size="sm" variant="light" leftSection={<IconPencil size={14} />}>
              Edit
            </Button>
          </Link>
          <Button 
            size="sm" 
            variant="light" 
            color="red" 
            leftSection={<IconTrash size={14} />}
            onClick={() => handleDelete(item.id)}
          >
            Hapus
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Layout>
      <Container fluid>
        <Group justify="space-between" mb="lg">
          <div>
            <Title order={2}>Data Ensiklopedia</Title>
            <Text c="dimmed">Kelola data budaya dan tradisi Indonesia</Text>
          </div>
          <Link href="/ensiklopedia/add" passHref legacyBehavior>
            <Button size="lg" leftSection={<IconPlus />}>
              Tambah Data
            </Button>
          </Link>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
          <Group justify="space-between" mb="md">
            <TextInput
              placeholder="Cari nama atau deskripsi..."
              leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              style={{ width: 300 }}
            />
            <Select
              label="Item per halaman"
              data={['5', '10', '20', '50']}
              value={itemsPerPage.toString()}
              onChange={(value) => setItemsPerPage(Number(value))}
              style={{ width: 150 }}
            />
          </Group>

          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Table striped highlightOnHover verticalSpacing="sm">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Nama</Table.Th>
                    <Table.Th>Deskripsi</Table.Th>
                    <Table.Th>Aksi</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {rows.length > 0 ? (
                    rows
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={4}>
                        <Text ta="center" c="dimmed">Tidak ada data ditemukan</Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>

              {totalPages > 1 && (
                <Group justify="center" mt="lg">
                  <Pagination
                    value={currentPage}
                    onChange={setCurrentPage}
                    total={totalPages}
                    size="sm"
                  />
                </Group>
              )}
            </>
          )}
        </Card>
      </Container>
    </Layout>
  );
}