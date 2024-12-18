import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(Permission)
    private permissionModel: typeof Permission,
    @InjectModel(RolePermission)
    private rolePermissionModel: typeof RolePermission,
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

   // Public signup (for students only)
   async signup(signupDto: SignupDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      where: { email: signupDto.email }
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Get the student role (role_id: 3)
    const studentRole = await this.roleModel.findOne({
      where: { name: 'student' }
    });

    if (!studentRole) {
      throw new Error('Student role not found in the system');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create new user with student role
    const newUser = await this.userModel.create({
      ...signupDto,
      password: hashedPassword,
      role_id: studentRole.id
    });

    // Remove password from response
    const { password, ...result } = newUser.toJSON();
    return result as User;
  }

//   SignIn function
  async login(loginDto: LoginDto): Promise<{access_token: string}> {
    try {
        const isEmailExists = await this.userModel.findOne({
            where: { email: loginDto.email }
        });
        const isPasswordValid = await bcrypt.compare(loginDto.password, isEmailExists.password);

        if (!isEmailExists || !isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const payload = {
          sub : isEmailExists.user_id,
          email: isEmailExists.email,
          role: isEmailExists.role_id,
          name: isEmailExists.name
        };

        return {
          access_token: this.jwtService.sign(payload)
        };

    } catch (error) {
        console.error('Error in login: ', error);
        return;
    }
  }

  // Check if user has required permission for a resource and action
  async checkPermission(userId: string, resource: string, action: string): Promise<boolean> {
    try {
      // Get user with role
      const user = await this.userModel.findOne({
        where: { user_id: userId },
        include: [{ model: Role }],
      });

      if (!user || !user.role_id) {
        return false;
      }

      // Get permission ID for the requested resource and action
      const permission = await this.permissionModel.findOne({
        where: {
          resource,
          action,
        },
      });

      if (!permission) {
        return false;
      }

      // Check if role has the required permission
      const rolePermission = await this.rolePermissionModel.findOne({
        where: {
          roleId: user.role_id,
          permissionId: permission.id,
        },
      });

      return !!rolePermission;
    } catch (error) {
      console.error('Permission check failed:', error);
      return false;
    }
  }

  // Helper method to validate user actions
  async validateAction(userId: string, resource: string, action: string): Promise<void> {
    const hasPermission = await this.checkPermission(userId, resource, action);
    if (!hasPermission) {
      throw new UnauthorizedException(
        `User does not have permission to ${action} ${resource}`
      );
    }
  }

  // Get all permissions for a role
  async getRolePermissions(roleId: number): Promise<Permission[]> {
    const role = await this.roleModel.findByPk(roleId, {
      include: [{
        model: Permission,
        through: { attributes: [] }, // Exclude junction table attributes
      }],
    });
    return role?.permissions || [];
  }

  // Assign permissions to a role
  async assignPermissionsToRole(roleId: number, permissionIds: number[]): Promise<void> {
    await this.rolePermissionModel.destroy({
      where: { roleId },
    });

    const rolePermissions = permissionIds.map(permissionId => ({
      roleId,
      permissionId,
    }));

    await this.rolePermissionModel.bulkCreate(rolePermissions);
  }

}

