import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/core/prisma/prisma.service'
import { Habit } from '@prisma/client'
import {
  CreateHabitDto,
  UpdateHabitDto,
} from '@/modules/habits/dto/create-habit.dto'

@Injectable()
export class HabitsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createHabit(body: CreateHabitDto, userId: string): Promise<Habit> {
    return this.prisma.habit.create({
      data: {
        title: body.title,
        color: body.color,
        user: {
          connect: {
            id: userId,
          },
        },
        repetition: {
          create: {
            numberOfDays: body.repetition.numberOfDays,
            notifyTime: body.repetition.notifyTime,
            showNotification: body.repetition.showNotification,
            weekdays: {
              create: body.repetition.weekdays.map((weekday) => {
                return {
                  weekday: weekday.weekday,
                  isSelected: weekday.isSelected,
                }
              }),
            },
          },
        },
      },
    })
  }

  async findHabitsByUser(userId: string) {
    return this.prisma.habit.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        color: true,
        repetition: {
          select: {
            numberOfDays: true,
            notifyTime: true,
            showNotification: true,
            weekdays: {
              select: {
                weekday: true,
                isSelected: true,
              },
            },
          },
        },
        createdAt: true,
        activities: {
          select: {
            date: true,
          },
        },
      },
    })
  }

  async findHabitById(habitId: string) {
    return this.prisma.habit.findUnique({
      where: { id: habitId },
    })
  }

  async findHabitByIdWithActivies(habitId: string) {
    return this.prisma.habit.findUnique({
      where: { id: habitId },
      select: {
        id: true,
        title: true,
        color: true,
        userId: true,
        repetition: {
          select: {
            numberOfDays: true,
            notifyTime: true,
            showNotification: true,
            weekdays: {
              select: {
                weekday: true,
                isSelected: true,
              },
            },
          },
        },
        createdAt: true,
        activities: {
          select: {
            date: true,
          },
        },
      },
    })
  }

  async updateHabit(habitId: string, body: UpdateHabitDto) {
    const repetitionIds = await this.prisma.repetition.findMany({
      where: { habitId },
      select: {
        id: true,
      },
    })

    const deleteWeekDays = this.prisma.weekdays.deleteMany({
      where: { repetitionId: { in: repetitionIds.map((rp) => rp.id) } },
    })
    const deleteRepetition = this.prisma.repetition.deleteMany({
      where: { habitId },
    })
    const updateHabit = this.prisma.habit.update({
      where: { id: habitId },
      data: {
        title: body.title,
        color: body.color,
        repetition: {
          create: {
            numberOfDays: body.repetition.numberOfDays,
            notifyTime: body.repetition.notifyTime,
            showNotification: body.repetition.showNotification,
            weekdays: {
              create: body.repetition.weekdays.map((weekday) => {
                return {
                  weekday: weekday.weekday,
                  isSelected: weekday.isSelected,
                }
              }),
            },
          },
        },
      },
    })
    return this.prisma.$transaction([
      deleteWeekDays,
      deleteRepetition,
      updateHabit,
    ])
  }

  async deleteHabit(habitId: string) {
    const repetitionIds = await this.prisma.repetition.findMany({
      where: { habitId },
      select: {
        id: true,
      },
    })

    return this.prisma.$transaction([
      this.prisma.weekdays.deleteMany({
        where: { repetitionId: { in: repetitionIds.map((rp) => rp.id) } },
      }),
      this.prisma.repetition.deleteMany({ where: { habitId } }),
      this.prisma.activity.deleteMany({ where: { habitId } }),
      this.prisma.habit.delete({ where: { id: habitId } }),
    ])
  }
}
