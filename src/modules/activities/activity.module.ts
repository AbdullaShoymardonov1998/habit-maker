import { Module } from '@nestjs/common'
import { ActivityService } from '@/modules/activities/activity.service'
import { ActivityController } from '@/modules/activities/activity.controller'
import { CoreModule } from '@/core/core.module'
import { ActivityRepository } from '@/modules/activities/activity.repository'
import { HabitsModule } from '../habits/habits.module'

@Module({
  imports: [CoreModule, HabitsModule],
  providers: [ActivityService, ActivityRepository],
  controllers: [ActivityController],
})
export class ActivityModule {}
