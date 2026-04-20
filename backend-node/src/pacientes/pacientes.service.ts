import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PacientesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
  try {
    await this.prisma.paciente.create({
      data: {
        ...data,
        dataNascimento: new Date(data.dataNascimento),
      },
    });

    return { message: 'PATIENT_CREATED' };
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestException('CPF_ALREADY_EXISTS');
    }
    throw error;
  }
}

  async findAll() {
    return this.prisma.paciente.findMany();
  }

  async findOne(id: number) {
    const paciente = await this.prisma.paciente.findUnique({
      where: { id },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    return paciente;
  }

  async update(id: number, data: any) {
  const pacienteExistente = await this.prisma.paciente.findUnique({
    where: { id },
  });

  if (!pacienteExistente) {
    throw new Error('NOT_FOUND');
  }

  // 🔥 verifica se CPF já pertence a outro usuário
  if (data.cpf) {
    const cpfExiste = await this.prisma.paciente.findFirst({
      where: {
        cpf: data.cpf,
        NOT: { id },
      },
    });

    if (cpfExiste) {
      throw new Error('CPF_ALREADY_EXISTS');
    }
  }

  return this.prisma.paciente.update({
    where: { id },
    data: {
      ...data,
      dataNascimento: data.dataNascimento
        ? new Date(data.dataNascimento)
        : undefined,
    },
  });
}

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.paciente.delete({
      where: { id },
    });

    return { message: 'PATIENT_DELETED' };
  }
}