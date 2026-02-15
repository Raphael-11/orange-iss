import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../common/enums';

/**
 * Database seed script
 * Creates default users for HR, Department Chief, and Supervisor roles
 * Password: changeme123 (should be changed after first login)
 */

const defaultPassword = 'changeme123';

const defaultUsers: Array<{
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}> = [
  {
    email: 'hr@orange.tn',
    firstName: 'HR',
    lastName: 'Manager',
    role: UserRole.HR,
  },
  {
    email: 'chief@orange.tn',
    firstName: 'Department',
    lastName: 'Chief',
    role: UserRole.DEPARTMENT_CHIEF,
  },
  {
    email: 'supervisor@orange.tn',
    firstName: 'Supervisor',
    lastName: 'Account',
    role: UserRole.SUPERVISOR,
  },
];

async function seed() {
  // Create database connection
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USER || 'iss_user',
    password: process.env.DATABASE_PASSWORD || 'changeme',
    database: process.env.DATABASE_NAME || 'iss_orange',
    entities: [User],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('✓ Database connection established');

    const userRepository = dataSource.getRepository(User);

    // Hash the default password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create default users
    for (const userData of defaultUsers) {
      // Check if user already exists
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`⚠ User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Create new user
      const user = userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      await userRepository.save(user);
      console.log(`✓ Created user: ${userData.email} (${userData.role})`);
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('\nDefault accounts:');
    console.log('-------------------');
    defaultUsers.forEach((user) => {
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${defaultPassword}`);
      console.log(`Role: ${user.role}\n`);
    });
    console.log('⚠️  Change passwords after first login!\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

// Run seed
seed();
