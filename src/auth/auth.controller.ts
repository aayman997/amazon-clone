import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUerDto } from '../user/dtos/new-uer.dto';
import { UserDetails } from '../user/user-details.interface';
import { ExistingUerDto } from '../user/dtos/existing-uer.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	createUser(@Body() user: NewUerDto): Promise<UserDetails | null> {
		return this.authService.register(user);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	loginUser(@Body() user: ExistingUerDto): Promise<{ token: string } | null> {
		return this.authService.login(user);
	}
}
