import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto, LoginDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

/**
 * Authentication service
 * Handles user registration, login, and token generation
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * Hashes password and creates user in database
   */
  async register(registerDto: RegisterDto): Promise<{ user: User; accessToken: string }> {
    const { email, password, firstName, lastName, role } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    });

    await this.userRepository.save(user);

    // Generate JWT token
    const accessToken = this.generateToken(user);

    // Remove password from response using object destructuring
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword as User, accessToken };
  }

  /**
   * Login user
   * Validates credentials and generates JWT token
   */
  async login(loginDto: LoginDto): Promise<{ user: User; accessToken: string }> {
    const { email, password } = loginDto;

    // Find user with password included
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const accessToken = this.generateToken(user);

    // Remove password from response using object destructuring
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword as User, accessToken };
  }

  /**
   * Generate JWT access token
   */
  private generateToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  /**
   * Validate user by ID
   * Used by JWT strategy
   */
  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
