import {
  Controller,
  Get,
  Post,
  // Patch,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@libs/common/src/users/users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { UserObject } from './entity/UserObject.entity';
// import { UpdateUserDto } from './dto/UpdateUserDto';
// import { CreateUserDto } from './dto/CreateUserDto';
import { JwtGuard } from '@libs/common/src/auth/guard/jwt.guard';
import { LocalAuthSignupDto } from '@libs/common/src/auth/dto/customers/local-startegy/user-signup.dto';
import { checkAbilities } from '@libs/common/src/ability/decorators/cehckAbility.decorator';
import { AbilitiesGuard } from '@libs/common/src/ability/guard/abilities.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   *
   * Create a new user in the system with the given data. The user is created with the default role of Customer.
   * The user is also assigned a wallet with 0 `balance`.
   *
   */
  @Post()
  @UseGuards(AbilitiesGuard)
  @checkAbilities({ action: 'create', subject: 'User' })
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'User was created successfully.',
  })
  create(@Body() userData: LocalAuthSignupDto) {
    return this.usersService.createAdminAccount(userData);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns the user with the given id.',
    type: UserObject,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * Update user record. Currently only `First Name` & `Last Name` can be updated.
   *
   */
  // @Patch()
  // @apiExceptionResponse()
  // @ApiOkResponse({
  //   description: 'User was updated successfully.',
  // })
  // update(@Body() userData: UpdateUserDto) {
  //   return this.usersService.update(userData);
  // }

  /**
   * Remove user record from the system.
   *
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
