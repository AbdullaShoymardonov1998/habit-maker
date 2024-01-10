import { Controller, Get, UseGuards, HttpStatus, Delete } from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { UsersService } from '@/modules/users/users.service'
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard'
import { IUser } from '@/modules/users/dto/user.interface'
import { User } from '@/decorators/user.decorator'
import { GetUserResponseDto } from '@/modules/users/dto/get-user.dto'
import { MessageResponseDto } from '@/decorators/message-response.dto'

@ApiTags('User')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('account')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: HttpStatus.OK, type: GetUserResponseDto })
  @UseGuards(JwtAuthGuard)
  getUser(@User() user: IUser): Promise<GetUserResponseDto> {
    return this.userService.getUser(user.id)
  }

  @Delete('account')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.OK, type: MessageResponseDto })
  @UseGuards(JwtAuthGuard)
  deleteUser(@User() user: IUser): Promise<MessageResponseDto> {
    return this.userService.deleteUser(user.id)
  }
}
