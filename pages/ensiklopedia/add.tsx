import {
  Container,
  Title,
  Paper,
  TextInput,
  Textarea,
  Button,
  Text,
  Group,
  Card,
  rem
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/layout";
import { ApiResponse } from "../../types";
import { IconPlus, IconChevronLeft } from '@tabler/icons-react';
import Link from 'next/link';

interface AddEnsiklopediaFormValues {
  name: string;
  description: string;
}

export default function AddEnsiklopedia() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const form = useForm<AddEnsiklopediaFormValues>({
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Nama harus diisi"),
    },
  });

  const handleSubmit = async (values: AddEnsiklopediaFormValues) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ensiklopedia`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          router.push("/ensiklopedia");
        } else {
          setError(data.message || "Gagal menyimpan");
        }
      } else {
        const data = await res.json();
        setError(data.message || "Gagal menyimpan");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <Layout>
      <Container fluid>
        <Group justify="space-between" mb="lg">
          <div>
            <Title order={2}>Tambah Data Ensiklopedia</Title>
            <Text c="dimmed">Masukkan informasi data budaya baru</Text>
          </div>
          <Link href="/ensiklopedia" passHref legacyBehavior>
            <Button size="md" variant="outline" leftSection={<IconChevronLeft />}>
              Kembali
            </Button>
          </Link>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          {error && (
            <Text c="red" mb="md">
              {error}
            </Text>
          )}
          
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Nama"
              placeholder="Nama budaya/tradisi"
              required
              size="md"
              {...form.getInputProps("name")}
            />
            <Textarea
              label="Deskripsi"
              placeholder="Deskripsi budaya/tradisi"
              mt="md"
              size="md"
              minRows={4}
              {...form.getInputProps("description")}
            />
            
            <Group justify="flex-end" mt="xl">
              <Button 
                type="submit" 
                size="lg" 
                leftSection={<IconPlus />}
              >
                Simpan Data
              </Button>
            </Group>
          </form>
        </Card>
      </Container>
    </Layout>
  );
}
