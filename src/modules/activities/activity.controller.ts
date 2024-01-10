import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ActivityService } from '@/modules/activities/activity.service'
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard'
import { User } from '@/decorators/user.decorator'
import { IUser } from '@/modules/users/dto/user.interface'
import { CreateActivityDto } from '@/modules/activities/dto/create-activity.dto'

@ApiTags('Activities')
@ApiBearerAuth()
@Controller({ path: 'activities', version: '1' })
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @ApiOperation({ summary: 'Create activity' })
  @UseGuards(JwtAuthGuard)
  createActivity(@Body() body: CreateActivityDto, @User() user: IUser) {
    return this.activityService.createActivity(body, user.id)
  }
}
