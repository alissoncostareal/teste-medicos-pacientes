import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PacientesService } from './pacientes/pacientes.service';
import { PacientesModule } from './pacientes/pacientes.module';

@Module({
  imports: [PrismaModule, PacientesModule],
  controllers: [AppController],
  providers: [AppService, PacientesService],
})
export class AppModule {}
