import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUerDto } from '../user/dtos/new-uer.dto';
import { UserDetails } from '../user/user-details.interface';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	createUser(@Body() user: NewUerDto): Promise<UserDetails | null> {
		return this.authService.register(user);
	}
}
