import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { PrismaService } from './prisma/prisma.service'
import { UtilsModule } from './utils/utils.module'
import { UtilsService } from './utils/utils.service'
import { EmailModule } from './email/email.module'
import { EmailService } from './email/email.service'

@Module({
  imports: [PrismaModule, UtilsModule, EmailModule],
  providers: [PrismaService, UtilsService, EmailService],
  exports: [PrismaService, UtilsService, EmailService],
})
export class CoreModule {}
