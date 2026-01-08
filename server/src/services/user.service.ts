import bcrypt from 'bcryptjs';
import userRepository from '../repositories/user.repository';
import { io } from '../config/socket';
import { Prisma } from '@prisma/client';

export class UserService {
    async getCurrentUser(userId: string) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async updateProfile(userId: string, organizationId: string, data: { name?: string; bio?: string }) {
        const updatedUser = await userRepository.update(userId, organizationId, data);
        io.to(organizationId).emit('user_updated', updatedUser);
        return updatedUser;
    }

    async updateAvatar(userId: string, organizationId: string, avatarUrl: string) {
        const updatedUser = await userRepository.update(userId, organizationId, { avatarUrl });
        io.to(organizationId).emit('user_updated', updatedUser);
        return updatedUser;
    }

    async getAllUsers(organizationId: string) {
        return userRepository.findByOrganizationId(organizationId);
    }

    async createUser(organizationId: string, email: string, name: string, roleId: string) {
        const hashedPassword = await bcrypt.hash('password123', 10);

        const data: Prisma.UserCreateInput = {
            email,
            name,
            password: hashedPassword,
            organization: { connect: { id: organizationId } },
            roles: {
                create: {
                    role: { connect: { id: roleId } }
                }
            }
        };

        const newUser = await userRepository.create(data);
        io.emit('user_updated', newUser);
        return newUser;
    }

    async updateUser(id: string, organizationId: string, email?: string, name?: string) {
        const updatedUser = await userRepository.update(id, organizationId, { email, name });
        io.emit('user_updated', updatedUser);
        return updatedUser;
    }

    async deleteUser(id: string, organizationId: string) {
        await userRepository.delete(id, organizationId);
        io.emit('employee_deleted', id);
    }
}

export default new UserService();
