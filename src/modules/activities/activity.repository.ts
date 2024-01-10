import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/core/prisma/prisma.service'
import { Activity } from '@prisma/client'
import { CreateActivityDto } from '@/modules/activities/dto/create-activity.dto'

@Injectable()
export class ActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createActivity(body: CreateActivityDto): Promise<Activity> {
    return this.prisma.activity.create({
      data: {
        date: new Date(body.date),
        habit: {
          connect: {
            id: body.habitId,
          },
        },
      },
    })
  }
}
