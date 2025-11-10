import {
  Container,
  Title,
  Paper,
  TextInput,
  Textarea,
  Button,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/layout";
import { ApiResponse } from "../../types";

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
      <Container size="sm">
        <Title mb="md">Tambah Data Ensiklopedia</Title>
        {error && <Text c="red">{error}</Text>}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Nama"
            placeholder="Nama budaya"
            required
            {...form.getInputProps("name")}
          />
          <Textarea
            label="Deskripsi"
            placeholder="Deskripsi budaya"
            mt="md"
            {...form.getInputProps("description")}
          />
          <Button type="submit" mt="md">
            Simpan
          </Button>
        </form>
      </Container>
    </Layout>
  );
}
