import { Module } from '@nestjs/common'
import { HabitsService } from '@/modules/habits/habits.service'
import { HabitsRepository } from '@/modules/habits/habits.repository'
import { HabitController } from '@/modules/habits/habits.controller'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [CoreModule],
  providers: [HabitsRepository, HabitsService],
  controllers: [HabitController],
  exports: [HabitsService],
})
export class HabitsModule {}
