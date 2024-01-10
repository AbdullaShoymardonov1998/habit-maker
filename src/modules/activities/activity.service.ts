import { Injectable } from '@nestjs/common'
import { CreateActivityDto } from '@/modules/activities/dto/create-activity.dto'
import { ActivityRepository } from '@/modules/activities/activity.repository'
import { HabitsService } from '@/modules/habits/habits.service'

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly habitService: HabitsService,
  ) {}

  async createActivity(body: CreateActivityDto, userId: string) {
    await this.habitService.ensureHabitExistsAndBelongsToUser(
      body.habitId,
      userId,
    )
    const activity = await this.activityRepository.createActivity(body)
    return activity
  }
}
