import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { HabitsService } from '@/modules/habits/habits.service'
import { HabitResponseDto } from '@/modules/habits/dto/habit-response.dto'
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard'
import {
  CreateHabitDto,
  UpdateHabitDto,
} from '@/modules/habits/dto/create-habit.dto'
import { User } from '@/decorators/user.decorator'
import { IUser } from '@/modules/users/dto/user.interface'

@ApiTags('Habits')
@ApiBearerAuth()
@Controller({ path: 'habits', version: '1' })
export class HabitController {
  constructor(private readonly service: HabitsService) {}

  @Post()
  @ApiOperation({ summary: 'Create habit' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @UseGuards(JwtAuthGuard)
  createHabit(@User() user: IUser, @Body() body: CreateHabitDto) {
    return this.service.createHabit(body, user.id)
  }

  @Get()
  @ApiOperation({ summary: 'Get habits' })
  @ApiResponse({ status: HttpStatus.OK, type: HabitResponseDto })
  @UseGuards(JwtAuthGuard)
  getHabits(@User() user: IUser) {
    return this.service.getHabits(user.id)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get habit' })
  @ApiResponse({ status: HttpStatus.OK, type: HabitResponseDto })
  @UseGuards(JwtAuthGuard)
  getHabit(@User() user: IUser, @Param('id') id: string) {
    return this.service.getHabit(id, user.id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update habit' })
  @ApiResponse({ status: HttpStatus.OK, type: HabitResponseDto })
  @UseGuards(JwtAuthGuard)
  updateHabit(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() body: UpdateHabitDto,
  ): Promise<HabitResponseDto> {
    return this.service.updateHabit(id, body, user.id)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete habit' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @UseGuards(JwtAuthGuard)
  deleteHabit(@Param('id') habitId: string, @User() user: IUser) {
    return this.service.deleteHabit(habitId, user.id)
  }
}
