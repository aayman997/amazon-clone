import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUerDto } from '../user/dtos/new-uer.dto';
import { UserDetails } from '../user/user-details.interface';

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 12);
	}

	async register(user: Readonly<NewUerDto>): Promise<UserDetails | any> {
		const { name, email, password } = user;
		const existingUser = await this.userService.findByEmail(email);
		if (existingUser) {
			return 'Email already exists';
		}
		const hashedPassword = await this.hashPassword(password);
		const newUser = await this.userService.create(name, email, hashedPassword);
		return this.userService._getUserDetails(newUser);
	}
}
