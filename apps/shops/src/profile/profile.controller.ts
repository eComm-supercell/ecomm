import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CustomersJWTAuthGuard } from '@libs/common/src/auth/guard/customers/customers-jwt-native.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  SystemUser,
  getSystemUser,
} from '@libs/common/src/users/decorators/getuser.decorator';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';

@ApiBearerAuth()
@UseGuards(CustomersJWTAuthGuard)
@Controller('profile')
@ApiTags('Customer Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Get the profile of the current user
   * @param user
   * @returns
   */
  @Get()
  findOne(@getSystemUser() user: SystemUser) {
    return this.profileService.findOne(user);
  }

  /**
   * Update the profile of the current user
   * @param user
   * @param updateProfileDto
   * @returns
   */
  @Patch()
  @ApiBody({ type: UpdateProfileDto })
  @apiExceptionResponse()
  update(
    @getSystemUser() user: SystemUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(user, updateProfileDto);
  }
}
